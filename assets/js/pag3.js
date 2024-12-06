// Dados de materiais (exemplo simples)
const materials = [
    { title: "Álgebra Básica - Guia Completo", category: "Matemática", level: "Fundamental", date: "2024-11-01", link: "https://example.com/material1" },
    { title: "Física Quântica: Introdução", category: "Ciências", level: "Médio", date: "2024-12-01", link: "https://example.com/material2" },
    { title: "Gramatica Avançada - Linguagens", category: "Linguagens", level: "Superior", date: "2024-10-15", link: "https://example.com/material3" },
    { title: "Revolução Industrial - História", category: "História", level: "Médio", date: "2024-11-10", link: "https://example.com/material4" },
    // Adicione mais materiais conforme necessário
];

let uploadedFiles = []; // Simula uma lista de arquivos enviados

// Função de pesquisa
function searchMaterials() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const levelFilter = document.getElementById('levelFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;

    const filteredMaterials = materials.filter(material => {
        return (material.title.toLowerCase().includes(searchInput) || searchInput === '') &&
               (categoryFilter === 'all' || material.category === categoryFilter) &&
               (levelFilter === 'all' || material.level === levelFilter) &&
               (dateFilter === '' || material.date === dateFilter);
    });

    displayMaterials(filteredMaterials);
}

// Exibe os materiais na lista
function displayMaterials(filteredMaterials) {
    const materialsList = document.getElementById('materialsList');
    materialsList.innerHTML = ''; // Limpa a lista de resultados

    if (filteredMaterials.length === 0) {
        materialsList.innerHTML = '<li>Nenhum material encontrado.</li>';
    } else {
        filteredMaterials.forEach(material => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${material.link}" target="_blank">${material.title}</a> - Categoria: ${material.category} - Nível: ${material.level}`;
            materialsList.appendChild(li);
        });
    }
}

// Filtros dinâmicos
function applyFilters() {
    searchMaterials();
}

// Validação do arquivo de upload
function validateUpload() {
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];

    if (file) {
        const validExtensions = ['pdf', 'ppt', 'docx'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        
        if (!validExtensions.includes(fileExtension)) {
            alert('Por favor, envie um arquivo PDF, PPT ou DOCX.');
            fileInput.value = ''; // Limpa o campo de upload
        }
    }
}

// Função de upload de arquivos
function uploadFile() {
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];

    if (!file) {
        alert('Selecione um arquivo para enviar.');
        return;
    }

    // Simula o envio do arquivo
    uploadedFiles.push(file);
    document.getElementById('upload-status').innerText = `Arquivo "${file.name}" enviado com sucesso!`;
    fileInput.value = ''; // Limpa o campo de upload

    updateDownloadList();
}

// Atualiza a lista de arquivos para download
function updateDownloadList() {
    const downloadList = document.getElementById('downloadList');
    downloadList.innerHTML = ''; // Limpa a lista atual

    uploadedFiles.forEach(file => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="previewFile('${file.name}')">Baixar ${file.name}</a>`;
        downloadList.appendChild(li);
    });
}

// Visualizar arquivo antes de baixar (simulação)
function previewFile(fileName) {
    const previewContainer = document.getElementById('preview-container');
    previewContainer.innerHTML = `<p>Visualizando: ${fileName}.<br> (Aqui seria a visualização real do arquivo)</p>`;
}

// Inicializa a exibição de materiais ao carregar
window.onload = function() {
    displayMaterials(materials);
};

