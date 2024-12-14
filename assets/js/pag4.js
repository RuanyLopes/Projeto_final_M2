class Gamification {
    constructor() {
        this.points = 0;
        this.level = 1;
        this.achievements = [];
        this.updateUI();
    }

    // Adicionar pontos ao usuário
    addPoints(points) {
        this.points += points;
        this.checkLevelUp();
        this.updateUI();
    }

    // Checar se o usuário deve subir de nível
    checkLevelUp() {
        const levelThreshold = this.level * 100; // Por exemplo, 100 pontos por nível
        if (this.points >= levelThreshold) {
            this.level++;
            this.unlockAchievement(`Parabéns! Você alcançou o nível ${this.level}`);
        }
    }

    // Desbloquear uma nova conquista
    unlockAchievement(achievement) {
        this.achievements.push(achievement);
        this.updateUI();
    }

    // Atualizar a interface do usuário
    updateUI() {
        document.getElementById('points-count').textContent = this.points;
        document.getElementById('user-level').textContent = this.level;
        const achievementsList = document.getElementById('achievements-list');
        achievementsList.innerHTML = '';
        this.achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.textContent = achievement;
            achievementsList.appendChild(li);
        });
        if (this.achievements.length === 0) {
            achievementsList.innerHTML = '<li>Nenhuma conquista desbloqueada ainda</li>';
        }
    }

    // Feedback visual ao ganhar pontos
    showPointFeedback(points) {
        const feedbackElement = document.createElement('div');
        feedbackElement.className = 'point-feedback';
        feedbackElement.textContent = `+${points} pontos!`;
        document.body.appendChild(feedbackElement);

        setTimeout(() => {
            feedbackElement.remove();
        }, 2000); // Remove feedback após 2 segundos
    }
}

// Instanciar o sistema de gamificação
const gamification = new Gamification();

// Integrar gamificação com eventos da página
// 1. Enviar feedback
document.getElementById('feedback-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Ganhar pontos por enviar feedback
    const points = 50;
    gamification.addPoints(points);
    gamification.showPointFeedback(points);
    console.log('Feedback enviado e pontos adicionados!');
});

// 2. Visualizar depoimentos
setInterval(() => {
    const points = 10;
    gamification.addPoints(points); // Adiciona pontos passivamente ao navegar no carrossel
    gamification.showPointFeedback(points);
    console.log('Pontos ganhos por visualizar depoimentos');
}, 10000); // A cada 10 segundos

// 3. Atualização de estatísticas com pontos adicionais
setInterval(() => {
    const materials = Math.floor(Math.random() * 300);
    const activeUsers = Math.floor(Math.random() * 500);
    updateStatistics(materials, activeUsers);

    // Ganhar pontos com base no número de materiais
    const points = Math.floor(materials / 10);
    gamification.addPoints(points);
    gamification.showPointFeedback(points);
}, 5000);



