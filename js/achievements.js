const achievementsContent = document.querySelector("#achievements-content");
const pageSize = 6;

const getAchievements = async () => {
  const response = await fetch("/assets/achievements.json");
  return await response.json();
};

const generateAchievement = (achievement) => {
  return `
    <article class="card col-md-6 col-xl-4 mb-2">
      <img src="${achievement.image}" class="card-img-top" alt="${achievement.title}">
      <div class="card-body">
      <h4 class="card-title">${achievement.title}</h5>
      <p class="fs-5 card-text">${achievement.text}</p>
	  </article>
  `;
};

const displayAchievements = async () => {
  const achievements = await getAchievements();
  achievementsContent.innerHTML = "";

  const currentPage = achievementsContent.getAttribute("actpage");
  for (let i = (currentPage - 1) * pageSize; i < currentPage * pageSize; i++) {
    if (i == achievements.length) {
      break;
    }
    achievementsContent.innerHTML += generateAchievement(achievements[i]);
  }
};
displayAchievements();

const totalPages = (achievements) => Math.ceil(achievements.length / pageSize);

const currentPage = () =>
  parseInt(achievementsContent.getAttribute("actpage"), 10);

const setPage = (pageNumber) => {
  if (pageNumber < 1 || pageNumber > totalPages(achievements)) {
    return;
  }
  achievementsContent.setAttribute("actpage", pageNumber);
  displayAchievements(achievements);
};

document
  .querySelector("#page-prev")
  .addEventListener("click", () => setPage(currentPage() - 1));
document
  .querySelector("#page-next")
  .addEventListener("click", () => setPage(currentPage() + 1));
