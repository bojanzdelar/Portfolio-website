const achievementsContent = document.querySelector("#achievements-content");
const previousButton = document.querySelector("#page-prev");
const nextButton = document.querySelector("#page-next");
const pageIndicator = document.querySelector("#page-indicator");
const resultsCount = document.querySelector("#results-count");
const pageSize = 6;
let achievements = [];
let currentPage = 1;

// Resolve data from the site root inferred from this script, so root domains,
// GitHub Pages project sites, and locally served project folders use the same paths.
const scriptElement = document.querySelector('script[src*="achievements.js"]');
const siteBase = scriptElement ? new URL("../", scriptElement.src) : new URL("./", document.baseURI);

const getAchievements = async () => {
  const response = await fetch(new URL("assets/achievements.json", siteBase), {
    cache: "no-cache"
  });
  if (!response.ok) throw new Error(`Could not load results (HTTP ${response.status}).`);
  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("The international results archive is empty or invalid.");
  }
  return data;
};

const getEventType = (achievement) => {
  const title = achievement.title || "";
  if (/Olympic Games/i.test(title)) return "Olympic Games";
  if (/Olympic Qualifier/i.test(title)) return "Olympic qualification";
  if (/World Championships/i.test(title)) return "World Championships";
  if (/European Championships/i.test(title)) return "European Championships";
  if (/World Cup/i.test(title)) return "World Cup";
  if (/Olympic Hopes/i.test(title)) return "Olympic Hopes";
  return "International racing";
};

const renderAchievement = (achievement) => {
  const article = document.createElement("article");
  article.className = "achievement-card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "achievement-image-wrap";

  const image = document.createElement("img");
  image.className = "achievement-image";
  const imagePath = String(achievement.image || "").split("/").filter(Boolean).join("/");
  image.src = new URL(imagePath, siteBase).href;
  image.alt = achievement.title ? `Competition photo: ${achievement.title}` : "Competition photograph";
  image.loading = "lazy";
  image.decoding = "async";
  image.addEventListener("error", () => {
    imageWrap.classList.add("image-unavailable");
    image.remove();
  }, { once: true });
  imageWrap.append(image);

  const info = document.createElement("div");
  info.className = "achievement-info";

  const tag = document.createElement("span");
  tag.className = "achievement-tag";
  tag.textContent = getEventType(achievement);

  const title = document.createElement("h3");
  title.textContent = achievement.title || "International competition";

  const description = document.createElement("p");
  description.textContent = achievement.text || "Competition result";

  info.append(tag, title, description);
  article.append(imageWrap, info);
  return article;
};

const renderResults = () => {
  const totalPages = Math.ceil(achievements.length / pageSize);
  currentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = achievements.slice(start, start + pageSize);

  achievementsContent.replaceChildren();
  pageItems.forEach((achievement) => achievementsContent.append(renderAchievement(achievement)));

  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  resultsCount.textContent = `Showing ${start + 1}–${start + pageItems.length} of ${achievements.length} results`;
};

const showArchiveError = (error) => {
  console.error("Unable to render international results:", error);
  achievementsContent.replaceChildren();
  const message = document.createElement("p");
  message.className = "archive-status archive-error";
  message.textContent = "Results could not be loaded. Refresh the page or try again shortly.";
  achievementsContent.append(message);
  previousButton.disabled = true;
  nextButton.disabled = true;
  pageIndicator.textContent = "Results unavailable";
  resultsCount.textContent = "ARCHIVE UNAVAILABLE";
};

previousButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
    renderResults();
  }
});
nextButton.addEventListener("click", () => {
  const totalPages = Math.ceil(achievements.length / pageSize);
  if (currentPage < totalPages) {
    currentPage += 1;
    renderResults();
  }
});

getAchievements()
  .then((data) => {
    achievements = data;
    renderResults();
  })
  .catch(showArchiveError);
