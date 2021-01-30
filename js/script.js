const achievements = document.querySelector("#achievements");

const displayAchievements = (achievementsArray) => {
	for (achievement of achievementsArray) {
		achievements.innerHTML += `
			<div class="card col-lg-6 col-xl-4 mb-2">
				<img src="${achievement.image}" class="card-img-top" alt="${achievement.title}">
				<div class="card-body">
				<h5 class="card-title">${achievement.title}</h5>
				<p class="card-text">${achievement.text}</p>
			</div>
		`;
	}
};