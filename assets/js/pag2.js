// Inicializa o progresso, pontos e nível a partir do localStorage
window.userPoints = parseInt(localStorage.getItem("userPoints")) || 0;
window.progress = parseInt(localStorage.getItem("progress")) || 0;
window.level = parseInt(localStorage.getItem("level")) || 1;

// Função de adicionar evento ao calendário
function addToCalendar(eventName) {
    alert(`${eventName} adicionado ao seu calendário!`);
    userPoints += 10; // Ganho de pontos ao adicionar evento
    progress = Math.min(progress + 25, 100); // Atualiza o progresso
    updateUserProgress();
    checkBadges();
    checkChallenges();
}

// Atualiza o progresso e os pontos
function updateUserProgress() {
    document.getElementById("participationProgress").value = progress;
    document.getElementById("participationPoints").textContent = userPoints;

    // Salva no localStorage
    localStorage.setItem("userPoints", userPoints);
    localStorage.setItem("progress", progress);
    localStorage.setItem("level", level);

    // Atualizar nível
    const newLevel = Math.floor(userPoints / 50) + 1;
    if (newLevel > level) {
        level = newLevel;
        document.getElementById("userLevel").textContent = level;
        alert(`Parabéns! Você alcançou o nível ${level}!`);
    }
}

// Verifica se o usuário completou desafios
function checkChallenges() {
    if (userPoints >= 30 && !document.getElementById("challenge1").classList.contains("unlocked")) {
        unlockChallenge("challenge1");
    }
    if (selectedDate.textContent && !document.getElementById("challenge2").classList.contains("unlocked")) {
        unlockChallenge("challenge2");
    }
}

// Desbloqueia um desafio
function unlockChallenge(challengeId) {
    const challenge = document.getElementById(challengeId);
    challenge.classList.remove("locked");
    challenge.classList.add("unlocked");
    alert(`Desafio Concluído: ${challenge.textContent.trim()}!`);
}

// Verifica se o usuário desbloqueou badges
function checkBadges() {
    if (userPoints >= 40) {
        unlockBadge("badge1");
    }
    if (userPoints >= 50) {
        unlockBadge("badge2");
    }
}

// Desbloqueia uma badge
function unlockBadge(badgeId) {
    const badge = document.getElementById(badgeId);
    badge.style.display = "block";
    badge.classList.add("unlocked");
    alert(`Parabéns! Você desbloqueou a conquista: ${badge.textContent.trim()}`);
}

// Inicializar progresso ao carregar a página
window.onload = function () {
    updateUserProgress();
    // Chamar a função de ranking se necessário (se tiver ranking)
    updateRanking();
};

// Atualiza ranking
function updateRanking() {
    const currentUser = document.getElementById("currentUser");
    currentUser.textContent = `Você: ${userPoints} pontos`;

    const rankingList = document.getElementById("rankingList");
    const users = [
        { name: "Ana", points: 120 },
        { name: "Carlos", points: 100 },
        { name: "Você", points: userPoints }
    ];
    users.sort((a, b) => b.points - a.points);

    rankingList.innerHTML = ""; // Limpar ranking
    users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name}: ${user.points} pontos`;
        rankingList.appendChild(li);
    });
}

