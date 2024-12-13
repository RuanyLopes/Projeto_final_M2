class App {
    constructor() {
        this.currentUser = null;
        this.chosenCharacter = "";

        // Inicializar eventos
        document.getElementById("registrationForm").addEventListener("submit", this.registerUser.bind(this));
        document.getElementById("loginForm").addEventListener("submit", this.loginUser.bind(this));
    }

    goToLoginPage() {
        this.showPage("loginPage");
    }

    goToRegistrationPage() {
        this.showPage("registrationPage");
    }

    registerUser(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (localStorage.getItem(username)) {
            document.getElementById("errorMessage").textContent = "Usuário já cadastrado!";
        } else {
            localStorage.setItem(username, JSON.stringify({ username, password }));
            alert("Cadastro realizado com sucesso! Você pode agora fazer login.");
            this.goToLoginPage();
        }
    }

    loginUser(event) {
        event.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        const user = JSON.parse(localStorage.getItem(username));

        if (user && user.password === password) {
            this.currentUser = username;
            alert("Login bem-sucedido!");
            this.showPage("characterContainer");
        } else {
            document.getElementById("loginErrorMessage").textContent = "Nome de usuário ou senha incorretos!";
        }
    }

    chooseCharacter(character) {
        this.chosenCharacter = character;
        document.getElementById("chosenCharacter").textContent = this.chosenCharacter;
    }

    goToMainPage() {
        if (this.chosenCharacter) {
            this.showPage("mainPage");
            document.getElementById("chosenCharacter").textContent = this.chosenCharacter;
        } else {
            alert("Por favor, escolha um personagem!");
        }
    }

    logout() {
        this.currentUser = null;
        this.chosenCharacter = "";
        this.showPage("initialPage");
    }

    showPage(pageId) {
        const pages = ["initialPage", "loginPage", "registrationPage", "characterContainer", "mainPage"];
        pages.forEach(page => {
            document.getElementById(page).style.display = page === pageId ? "block" : "none";
        });
    }
}

const app = new App();


