class GamificationApp {
    constructor() {
        // Load the user state from localStorage, or set defaults if not present
        this.userPoints = parseInt(localStorage.getItem("userPoints")) || 0;
        this.progress = parseInt(localStorage.getItem("progress")) || 0;
        this.level = parseInt(localStorage.getItem("level")) || 1;

        // Cache DOM elements
        this.progressBar = document.getElementById("participationProgress");
        this.pointsDisplay = document.getElementById("participationPoints");
        this.levelDisplay = document.getElementById("userLevel");

        // Initialize gamification
        this.initGamification();
    }

    // Singleton pattern to ensure only one instance of GamificationApp is used
    static getInstance() {
        if (!GamificationApp.instance) {
            GamificationApp.instance = new GamificationApp();
        }
        return GamificationApp.instance;
    }

    // Method to update gamification state (add points and update progress)
    static updateGamification(points, message = "") {
        const instance = GamificationApp.getInstance();
        instance.userPoints += points;
        instance.progress = Math.min(instance.progress + 10, 100); // Cap progress at 100
        instance.updateUserInterface();
        if (message) alert(message);
    }

    // Initialize gamification by updating the UI and checking challenges
    initGamification() {
        this.updateUserInterface();
        this.checkChallenges();
        this.updateRanking();
    }

    // Update the user interface with the latest state
    updateUserInterface() {
        this.progressBar.value = this.progress;
        this.pointsDisplay.textContent = this.userPoints;
        this.levelDisplay.textContent = this.calculateLevel();
        this.saveState();

        if (this.progress === 100) {
            this.showProgressCompletionEffect();
        }
    }

    // Show an effect when the progress reaches 100
    showProgressCompletionEffect() {
        this.progressBar.classList.add("completed");
        setTimeout(() => this.progressBar.classList.remove("completed"), 1000);
    }

    // Save the current user state to localStorage
    saveState() {
        localStorage.setItem("userPoints", this.userPoints);
        localStorage.setItem("progress", this.progress);
        localStorage.setItem("level", this.level);
    }

    // Calculate the user's level based on points
    calculateLevel() {
        const newLevel = Math.floor(this.userPoints / 50) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.showLevelUpAlert();
        }
        return this.level;
    }

    // Show an alert when the user levels up
    showLevelUpAlert() {
        alert(`Parabéns! Você alcançou o nível ${this.level}!`);
    }

    // Check if challenges should be unlocked based on points and other criteria
    checkChallenges() {
        if (this.userPoints >= 30) this.unlockChallenge("challenge1");

        // Ensure userDates is initialized in localStorage
        const calendarDates = JSON.parse(localStorage.getItem("userDates")) || [];
        if (calendarDates.length > 0) this.unlockChallenge("challenge2");
    }

    // Unlock a specific challenge and show a reward effect
    unlockChallenge(challengeId) {
        const challenge = document.getElementById(challengeId);
        if (challenge && challenge.classList.contains("locked")) {
            challenge.classList.remove("locked");
            challenge.classList.add("unlocked");

            this.showRewardEffect();
            alert(`Desafio Concluído: ${challenge.textContent.trim()}!`);
        }
    }

    // Show a reward effect when a challenge is unlocked
    showRewardEffect() {
        const effect = document.createElement("div");
        effect.className = "reward-effect";
        effect.textContent = "🎉";
        document.body.appendChild(effect);
        setTimeout(() => document.body.removeChild(effect), 2000);
    }

    // Update the ranking list based on user points
    updateRanking() {
        const rankingList = document.getElementById("rankingList");
        if (!rankingList) return;  // Ensure rankingList exists

        const users = [
            { name: "Ana", points: 120 },
            { name: "Carlos", points: 100 },
            { name: "Você", points: this.userPoints }
        ];

        users.sort((a, b) => b.points - a.points); // Sort users by points (descending)
        rankingList.innerHTML = ""; // Clear existing ranking

        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name}: ${user.points} pontos`;
            if (user.name === "Você") li.classList.add("current-user");
            rankingList.appendChild(li);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Event delegation for handling dynamic event items
    document.body.addEventListener('mouseenter', function(event) {
        if (event.target.classList.contains('event')) {
            const tooltip = document.createElement("div");
            tooltip.className = "event-tooltip";
            tooltip.textContent = event.target.textContent;
            event.target.appendChild(tooltip);
        }
    }, true);

    document.body.addEventListener('mouseleave', function(event) {
        if (event.target.classList.contains('event')) {
            const tooltip = event.target.querySelector(".event-tooltip");
            if (tooltip) event.target.removeChild(tooltip);
        }
    }, true);

    // Handle event click and show event details
    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('event')) {
            const title = event.target.getAttribute('data-title');
            const time = event.target.getAttribute('data-time');
            const speaker = event.target.getAttribute('data-speaker');
            const link = event.target.getAttribute('data-link');
            showEventDetails(title, time, speaker, link);
        }
    }, true);

    // Initialize the gamification app
    GamificationApp.getInstance();
});

function showEventDetails(title, time, speaker, link) {
    alert(`Detalhes do Evento:\n\nTítulo: ${title}\nHora: ${time}\nPalestrante: ${speaker}\nLink para Transmissão: ${link}`);
}







