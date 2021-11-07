const pageSize = 6;

const totalPages = (achievements) => 
  Math.ceil(achievements.length / pageSize);

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
