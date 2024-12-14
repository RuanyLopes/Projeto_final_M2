class CalendarApp {
    constructor() {
        this.calendarModal = document.getElementById("calendarModal");
        this.calendar = document.getElementById("calendar");
        this.selectedDate = document.getElementById("selectedDate");
        this.openModalBtn = document.getElementById("openModalBtn");
        this.closeModalBtn = document.getElementById("closeModalBtn");
        this.addToCalendarBtn = document.getElementById("addToCalendar");

        this.initEventListeners();
    }

    initEventListeners() {
        this.openModalBtn.addEventListener("click", () => this.openModal());
        this.closeModalBtn.addEventListener("click", () => this.closeModal());
        this.addToCalendarBtn.addEventListener("click", () => this.addToCalendar());
        window.addEventListener("click", (e) => {
            if (e.target === this.calendarModal) this.closeModal();
        });
    }

    openModal() {
        this.calendarModal.style.display = "block";
        const today = new Date();
        this.generateCalendar(today.getFullYear(), today.getMonth());
    }

    closeModal() {
        this.calendarModal.style.display = "none";
        this.selectedDate.textContent = "Data Selecionada: "; // Reset selection
    }

    generateCalendar(year, month) {
        this.calendar.innerHTML = ""; // Clear calendar
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Blank days
        for (let i = 0; i < firstDay; i++) {
            const blankDay = document.createElement("div");
            blankDay.className = "blank-day";
            this.calendar.appendChild(blankDay);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = day;
            dayDiv.className = "day";
            dayDiv.addEventListener("click", () => this.selectDate(year, month, day));
            this.calendar.appendChild(dayDiv);
        }
    }

    selectDate(year, month, day) {
        const formattedDate = new Date(year, month, day).toLocaleDateString("pt-BR");
        this.selectedDate.textContent = `Data Selecionada: ${formattedDate}`;
    }

    addToCalendar() {
        if (this.selectedDate.textContent !== "Data Selecionada: ") {
            alert(`${this.selectedDate.textContent} adicionada ao seu calendário.`);
            GamificationApp.updateGamification(10, "Evento adicionado com sucesso!");
            const savedDates = JSON.parse(localStorage.getItem("userDates")) || [];
            savedDates.push(this.selectedDate.textContent);
            localStorage.setItem("userDates", JSON.stringify(savedDates));
            this.closeModal();
        } else {
            alert("Por favor, selecione uma data.");
        }
    }
}

// Initialize CalendarApp
new CalendarApp();




