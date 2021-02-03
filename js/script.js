const achievements = [
    {
        "image" : "/assets/achievements/2020-wc-k1-1000.jpg",
        "title" : "World Cup 2020",
        "text" : "Ninth place in K1 1000m"
    },
    {
        "image" : "/assets/achievements/2019-wch-k1-1000.jpg",
        "title" : "World Championships 2019",
        "text" : "Eleventh place in K1 1000m"
    },
    {
        "image" : "/assets/achievements/2019-ech-u23-k1-1000.jpeg",
        "title" : "European U23 Championships 2019",
        "text" : "Gold medal in K1 1000m"
    },
    {
        "image" : "/assets/achievements/2019-ech-u23-k1-500.jpeg",
        "title" : "European U23 Championships 2019",
        "text" : "Silver medal in K1 500m"
    },
    {
        "image" : "/assets/achievements/2018-wch-jun-k1-500.png",
        "title" : "World Junior Championships 2018",
        "text" : "Bronze medal in K1 500m"
    },
    {
        "image" : "/assets/achievements/2018-ech-jun-k1-500.jpeg",
        "title" : "European Junior Championships 2018",
        "text" : "Silver medal in K1 500m"
    },
    {
        "image" : "/assets/achievements/2018-ech-jun-k1-500.jpeg",
        "title" : "Olympic Hopes 2017",
        "text" : "Gold medal in K1 500m",
    },
    {
        "image" : "/assets/achievements/2018-ech-jun-k1-500.jpeg",
        "title" : "Olympic Hopes 2017",
        "text" : "Gold medal in K1 200m",
    },
    {
        "image" : "/assets/achievements/2018-ech-jun-k1-500.jpeg",
        "title" : "Olympic Hopes 2017",
        "text" : "Gold medal in K2 200m",
    },
    {
        "image" : "/assets/achievements/2018-ech-jun-k1-500.jpeg",
        "title" : "World Junior Championships 2017",
        "text" : "Silver medal in K1 500m"
    },
    {
        "image" : "/assets/achievements/2018-ech-jun-k1-500.jpeg",
        "title" : "European Junior Championships 2017",
        "text" : "Bronze medal in K1 1000m"
    },
    {
        "image" : "/assets/achievements/2018-ech-jun-k1-500.jpeg",
        "title" : "European Junior Championships 2017",
        "text" : "Bronze medal in K1 5000m"
    },
    {
        "image" : "/assets/achievements/2018-ech-jun-k1-500.jpeg",
        "title" : "Olympic Hopes 2016",
        "text" : "Gold medal in K1 200m"
    },
    {
        "image" : "/assets/achievements/2018-ech-jun-k1-500.jpeg",
        "title" : "Olympic Hopes 2016",
        "text" : "Gold medal in K1 500m"
    },
    {
        "image" : "/assets/achievements/2018-ech-jun-k1-500.jpeg",
        "title" : "Olympic Hopes 2016",
        "text" : "Bronze medal in K1 1000m"
    },
    {
        "image" : "/assets/achievements/2018-ech-jun-k1-500.jpeg",
        "title" : "European Junior Championships 2016",
        "text" : "Bronze medal in K1 500m"
    }
]

/* Achievements display */

const pageSize = 6;
const achievements_content = document.querySelector("#achievements-content");

const generateAchievement = achievement => {
    return `<div class="card col-md-6 col-xl-4 mb-2">
				<img src="${achievement.image}" class="card-img-top" alt="${achievement.title}">
				<div class="card-body">
				<h4 class="card-title">${achievement.title}</h5>
				<p class="card-text">${achievement.text}</p>
			</div>`;
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

/* Form handling */

/* At the moment works as if there is only one form,
if you add more forms this function needs to be adapted */
(() => {
    let form = document.querySelector('.needs-validation');

    form.addEventListener('submit', event => {
        event.preventDefault();
        event.stopPropagation();

        if (!form.checkValidity()) {
            form.classList.add('was-validated')   
            return;
        }

        inputs = document.querySelectorAll("input, textarea");
        Array.prototype.slice.call(inputs).forEach(input => {
            input.value = "";
        });

        // Send mail
        // Notify user it was successful

        form.classList.remove('was-validated');

    }, false);
})();