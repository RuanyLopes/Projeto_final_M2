let currentUser = null;
let chosenCharacter = "";

// Função para ir para a página de login
function goToLoginPage() {
    document.getElementById("initialPage").style.display = 'none';
    document.getElementById("loginPage").style.display = 'block';
}

// Função para ir para a página de cadastro
function goToRegistrationPage() {
    document.getElementById("initialPage").style.display = 'none';  // Esconde a página inicial
    document.getElementById("registrationPage").style.display = 'block';  // Mostra a página de cadastro
}


// Função para cadastrar o usuário
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Verificar se o nome de usuário já existe no localStorage
    if (localStorage.getItem(username)) {
        document.getElementById("errorMessage").textContent = "Usuário já cadastrado!";
    } else {
        // Salvar no localStorage
        const user = { username: username, password: password };
        localStorage.setItem(username, JSON.stringify(user));

        // Limpar a mensagem de erro e mostrar que o cadastro foi bem-sucedido
        document.getElementById("errorMessage").textContent = "";
        alert("Cadastro realizado com sucesso! Você pode agora fazer login.");

        // Redirecionar para a página de login
        document.getElementById("registrationPage").style.display = "none";
        document.getElementById("loginPage").style.display = "block";
    }
});

// Função de Login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;

    // Recuperar o usuário armazenado no localStorage
    const storedUser = JSON.parse(localStorage.getItem(loginUsername));

    if (storedUser && storedUser.password === loginPassword) {
        currentUser = loginUsername;
        alert("Login bem-sucedido!");
        document.getElementById("loginPage").style.display = 'none';
        document.getElementById("characterContainer").style.display = 'block';
    } else {
        document.getElementById("loginErrorMessage").textContent = "Nome de usuário ou senha incorretos!";
    }
});

// Função para escolher personagem
function chooseCharacter(character) {
    chosenCharacter = character;
    document.getElementById("chosenCharacter").textContent = chosenCharacter;
}

// Função para confirmar personagem e ir para a página principal
function goToMainPage() {
    if (chosenCharacter) {
        document.getElementById("characterContainer").style.display = 'none';
        document.getElementById("mainPage").style.display = 'block';
        document.getElementById("chosenCharacter").textContent = chosenCharacter;
    } else {
        alert("Por favor, escolha um personagem!");
    }
}

// Função de Logout
function logout() {
    currentUser = null;
    chosenCharacter = "";

    document.getElementById("mainPage").style.display = 'none';
    document.getElementById("initialPage").style.display = 'block';
}


