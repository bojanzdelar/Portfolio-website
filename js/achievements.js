let achievements;
const achievementsContent = document.querySelector("#achievements-content");

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

const displayAchievements = () => {
  achievementsContent.innerHTML = "";

  const currentPage = achievementsContent.getAttribute("actpage");
  for (let i = (currentPage - 1) * pageSize; i < currentPage * pageSize; i++) {
    if (i == achievements.length) {
      break;
    }
    achievementsContent.innerHTML += generateAchievement(achievements[i]);
  }
};

getAchievements().then(data => {
  achievements = data;
  displayAchievements(achievements);
});