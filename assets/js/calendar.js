// Referências aos elementos do DOM
const openModalBtn = document.getElementById("openModalBtn");
const calendarModal = document.getElementById("calendarModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const calendar = document.getElementById("calendar");
const selectedDate = document.getElementById("selectedDate");
const addToCalendarBtn = document.getElementById("addToCalendar");

// Abrir o modal
openModalBtn.addEventListener("click", () => {
    calendarModal.style.display = "block";
    generateCalendar(new Date().getFullYear(), new Date().getMonth());
});

// Fechar o modal
closeModalBtn.addEventListener("click", () => {
    calendarModal.style.display = "none";
    selectedDate.textContent = ""; // Limpar a data selecionada
});

// Gerar calendário dinamicamente
function generateCalendar(year, month) {
    calendar.innerHTML = ""; // Limpar calendário anterior
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Adicionar dias em branco para alinhar o primeiro dia
    for (let i = 0; i < firstDay; i++) {
        const blankDay = document.createElement("div");
        blankDay.className = "blank-day";
        calendar.appendChild(blankDay);
    }

    // Adicionar os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.textContent = day;
        dayDiv.className = "day";
        dayDiv.addEventListener("click", () => {
            selectDate(year, month, day);
        });
        calendar.appendChild(dayDiv);
    }
}

// Selecionar uma data
function selectDate(year, month, day) {
    const formattedDate = new Date(year, month, day).toLocaleDateString("pt-BR");
    selectedDate.textContent = `Data Selecionada: ${formattedDate}`;
}

// Adicionar ao calendário
addToCalendarBtn.addEventListener("click", () => {
    if (selectedDate.textContent) {
        alert(`${selectedDate.textContent} adicionada ao seu calendário.`);
        updateGamification(); // Atualiza gamificação ao adicionar data
        // Salvar no localStorage (opcional)
        const savedDates = JSON.parse(localStorage.getItem("userDates")) || [];
        savedDates.push(selectedDate.textContent);
        localStorage.setItem("userDates", JSON.stringify(savedDates));
        calendarModal.style.display = "none";
    } else {
        alert("Por favor, selecione uma data.");
    }
});

// Fechar modal clicando fora dele
window.addEventListener("click", (e) => {
    if (e.target === calendarModal) {
        calendarModal.style.display = "none";
    }
});

// Atualizar a gamificação (pontos e progresso)
function updateGamification() {
    let userPoints = parseInt(localStorage.getItem("userPoints")) || 0;
    let progress = parseInt(localStorage.getItem("progress")) || 0;

    userPoints += 10; // Incrementar pontos ao adicionar evento
    progress = Math.min(progress + 10, 100); // Atualizar progresso global

    // Atualizar no localStorage
    localStorage.setItem("userPoints", userPoints);
    localStorage.setItem("progress", progress);

    // Exibir progresso e pontos atualizados
    alert(`Progresso atualizado! Você tem ${userPoints} pontos.`);
}

