const pageSize = 6;
const achievements_content = document.querySelector("#achievements-content");

const generateAchievement = achievement => {
    return `<article class="card col-md-6 col-xl-4 mb-2">
				<img src="${achievement.image}" class="card-img-top" alt="${achievement.title}">
				<div class="card-body">
				<h4 class="card-title">${achievement.title}</h5>
				<p class="card-text">${achievement.text}</p>
			</article>`;
}

const displayAchievements = achievements => {
	achievements_content.innerHTML = "";
	
	const currentPage = achievements_content.getAttribute("actpage")
	for (let i = (currentPage - 1) * pageSize; i < currentPage * pageSize; i++) {
		if (i == achievements.length) {
			break;
		}
		achievements_content.innerHTML += generateAchievement(achievements[i])
	}
};
displayAchievements(achievements);

const totalPages = achievements => Math.ceil(achievements.length / pageSize);

const currentPage = () => parseInt(achievements_content.getAttribute("actpage"), 10);

const setPage = pageNumber => {
	if (pageNumber < 1 || pageNumber > totalPages(achievements)) {
		return;
	}
	achievements_content.setAttribute("actpage", pageNumber);
	displayAchievements(achievements);
};

document.querySelector("#page-prev").addEventListener("click", () => setPage(currentPage() - 1));
document.querySelector("#page-next").addEventListener("click", () => setPage(currentPage() + 1));