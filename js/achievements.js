let achievements = [];
const achievementsContent = document.querySelector("#achievements-content");
const previousButton = document.querySelector("#page-prev");
const nextButton = document.querySelector("#page-next");
const pageIndicator = document.querySelector("#page-indicator");
const resultsCount = document.querySelector("#results-count");
const pageSize = 6;
let currentPage = 1;

const getAchievements = async () => {
  const response = await fetch(new URL("assets/achievements.json", document.baseURI));
  if (!response.ok) throw new Error("Could not load achievements.");
  return response.json();
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

const generateAchievement = (achievement) => {
  const article = document.createElement("article");
  article.className = "achievement-card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "achievement-image-wrap";

  const image = document.createElement("img");
  image.className = "achievement-image";
  const imagePath = String(achievement.image || "").split("/").filter(Boolean).join("/");
  image.src = new URL(imagePath, document.baseURI).href;
  image.alt = achievement.title || "Competition photograph";
  image.loading = "lazy";
  image.decoding = "async";

  imageWrap.append(image);

  const info = document.createElement("div");
  info.className = "achievement-info";

  const tag = document.createElement("span");
  tag.className = "achievement-tag";
  tag.textContent = getEventType(achievement);

  const title = document.createElement("h3");
  title.textContent = achievement.title;

  const description = document.createElement("p");
  description.textContent = achievement.text;

  info.append(tag, title, description);
  article.append(imageWrap, info);
  return article;
};

const displayAchievements = () => {
  achievementsContent.replaceChildren();
  const start = (currentPage - 1) * pageSize;
  achievements.slice(start, start + pageSize).forEach((achievement) => {
    achievementsContent.append(generateAchievement(achievement));
  });

  const totalPages = Math.max(1, Math.ceil(achievements.length / pageSize));
  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  resultsCount.textContent = `Showing ${start + 1}–${Math.min(start + pageSize, achievements.length)} of ${achievements.length} results`;
};

previousButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
    displayAchievements();
  }
});
nextButton.addEventListener("click", () => {
  const totalPages = Math.ceil(achievements.length / pageSize);
  if (currentPage < totalPages) {
    currentPage += 1;
    displayAchievements();
  }
});

getAchievements()
  .then((data) => {
    if (!Array.isArray(data) || data.length === 0) throw new Error("Achievement archive is empty or invalid.");
    achievements = data;
    displayAchievements();
  })
  .catch((error) => {
    console.error(error);
    achievementsContent.textContent = "Results are temporarily unavailable. Please try again later.";
    previousButton.disabled = true;
    nextButton.disabled = true;
    pageIndicator.textContent = "—";
    resultsCount.textContent = "ARCHIVE UNAVAILABLE";
  });
