class GamificationApp {
    constructor() {
        this.userPoints = parseInt(localStorage.getItem("userPoints")) || 0;
        this.progress = parseInt(localStorage.getItem("progress")) || 0;
        this.level = parseInt(localStorage.getItem("level")) || 1;

        this.progressBar = document.getElementById("participationProgress");
        this.pointsDisplay = document.getElementById("participationPoints");
        this.levelDisplay = document.getElementById("userLevel");

        // Atualiza a interface do usuário assim que a classe for inicializada
        this.initGamification();
    }

    static updateGamification(points, message = "") {
        const instance = new GamificationApp();
        instance.userPoints += points;
        instance.progress = Math.min(instance.progress + 10, 100);
        instance.updateUserInterface();
        if (message) alert(message);
    }

    initGamification() {
        this.updateUserInterface();
        this.checkChallenges();
        this.updateRanking();
    }

    updateUserInterface() {
        this.progressBar.value = this.progress;
        this.pointsDisplay.textContent = this.userPoints;
        this.levelDisplay.textContent = this.calculateLevel();
        this.saveState();
    }

    saveState() {
        localStorage.setItem("userPoints", this.userPoints);
        localStorage.setItem("progress", this.progress);
        localStorage.setItem("level", this.level);
    }

    calculateLevel() {
        const newLevel = Math.floor(this.userPoints / 50) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            alert(`Parabéns! Você alcançou o nível ${this.level}!`);
        }
        return this.level;
    }

    checkChallenges() {
        if (this.userPoints >= 30) this.unlockChallenge("challenge1");
        const calendarDates = JSON.parse(localStorage.getItem("userDates")) || [];
        if (calendarDates.length > 0) this.unlockChallenge("challenge2");
    }

    unlockChallenge(challengeId) {
        const challenge = document.getElementById(challengeId);
        if (challenge && challenge.classList.contains("locked")) {
            challenge.classList.remove("locked");
            challenge.classList.add("unlocked");
            alert(`Desafio Concluído: ${challenge.textContent.trim()}!`);
        }
    }

    updateRanking() {
        // Espera até que o DOM tenha carregado completamente para acessar 'currentUser'
        const currentUser = document.getElementById("currentUser");
        if (currentUser) {
            currentUser.textContent = `Você: ${this.userPoints} pontos`;
        }

        const rankingList = document.getElementById("rankingList");
        const users = [
            { name: "Ana", points: 120 },
            { name: "Carlos", points: 100 },
            { name: "Você", points: this.userPoints }
        ];
        users.sort((a, b) => b.points - a.points);

        rankingList.innerHTML = "";
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name}: ${user.points} pontos`;
            rankingList.appendChild(li);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const eventItems = document.querySelectorAll('.event');
    
    // Verifica se há itens de evento
    if (eventItems.length > 0) {
        eventItems.forEach(function(item) {
            item.addEventListener('click', function() {
                const title = item.getAttribute('data-title');
                const time = item.getAttribute('data-time');
                const speaker = item.getAttribute('data-speaker');
                const link = item.getAttribute('data-link');
                
                // Chama a função de mostrar detalhes do evento
                showEventDetails(title, time, speaker, link);
            });
        });
    }
    const gamificationApp = new GamificationApp();
});


function showEventDetails(title, time, speaker, link) {
    // Exibe os detalhes do evento
    alert(`Detalhes do Evento:\n\nTítulo: ${title}\nHora: ${time}\nPalestrante: ${speaker}\nLink para Transmissão: ${link}`);
}

