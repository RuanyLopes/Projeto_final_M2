// Abre o modal de calendário quando o botão é clicado
document.getElementById('openModalBtn').addEventListener('click', function() {
    document.getElementById('calendarModal').style.display = 'flex';
    renderCalendar(); // Renderiza o calendário assim que o modal for aberto
});

// Fecha o modal quando o botão de fechar é clicado
document.getElementById('closeModalBtn').addEventListener('click', function() {
    document.getElementById('calendarModal').style.display = 'none';
});

// Função para renderizar o calendário no modal
function renderCalendar() {
    const calendarDiv = document.getElementById('calendar');
    const selectedDateParagraph = document.getElementById('selectedDate');

    // Limpa o conteúdo do calendário antes de re-renderizar
    calendarDiv.innerHTML = '';

    const date = new Date();
    const currentMonth = date.getMonth();  // Mês atual
    const currentYear = date.getFullYear(); // Ano atual

    // Definir o primeiro dia do mês
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const lastDayOfMonth = lastDateOfMonth.getDay(); // Último dia do mês

    // Definir quantos dias o mês tem
    const totalDaysInMonth = lastDateOfMonth.getDate();

    // Renderizar os dias da semana
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    daysOfWeek.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        calendarDiv.appendChild(dayDiv);
    });

    // Preencher os espaços vazios antes do primeiro dia do mês
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        const emptyDiv = document.createElement('div');
        calendarDiv.appendChild(emptyDiv);
    }

    // Renderizar os dias do mês
    for (let day = 1; day <= totalDaysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        dayDiv.classList.add('day');
        
        // Adicionar evento de clique para selecionar a data
        dayDiv.addEventListener('click', function() {
            selectedDateParagraph.textContent = `Você selecionou: ${day}/${currentMonth + 1}/${currentYear}`;
            selectedDateParagraph.dataset.selectedDay = day;
        });

        calendarDiv.appendChild(dayDiv);
    }
}

// Adicionar a data selecionada ao calendário do usuário (simulação)
document.getElementById('addToCalendar').addEventListener('click', function() {
    const selectedDate = document.getElementById('selectedDate').textContent;
    if (selectedDate) {
        alert(`Data "${selectedDate}" adicionada ao seu calendário!`);
    } else {
        alert("Selecione uma data antes de adicionar.");
    }
});
