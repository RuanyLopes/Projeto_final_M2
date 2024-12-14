class Material {
    constructor(title, category, level, date, link) {
        this.title = title;
        this.category = category;
        this.level = level;
        this.date = date;
        this.link = link;
    }

    matchesFilters(searchInput, categoryFilter, levelFilter, dateFilter) {
        return (
            (this.title.toLowerCase().includes(searchInput) || searchInput === '') &&
            (categoryFilter === 'all' || this.category === categoryFilter) &&
            (levelFilter === 'all' || this.level === levelFilter) &&
            (dateFilter === '' || this.date === dateFilter)
        );
    }

    toHTML() {
        return `<a href="${this.link}" target="_blank">${this.title}</a> - Categoria: ${this.category} - Nível: ${this.level}`;
    }
}

class FileUploader {
    constructor() {
        this.uploadedFiles = [];
        this.validExtensions = ['pdf', 'ppt', 'docx'];
    }

    validateFile(file) {
        if (!file) return false;
        const fileExtension = file.name.split('.').pop().toLowerCase();
        return this.validExtensions.includes(fileExtension);
    }

    uploadFile(file) {
        if (!file) {
            alert('Selecione um arquivo para enviar.');
            return;
        }

        if (!this.validateFile(file)) {
            alert('Por favor, envie um arquivo PDF, PPT ou DOCX.');
            return;
        }

        this.uploadedFiles.push(file);
        document.getElementById('upload-status').innerText = `Arquivo "${file.name}" enviado com sucesso!`;
        this.updateDownloadList();
    }

    updateDownloadList() {
        const downloadList = document.getElementById('downloadList');
        downloadList.innerHTML = ''; // Limpa a lista atual

        this.uploadedFiles.forEach(file => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#" onclick="fileUploader.previewFile('${file.name}')">Baixar ${file.name}</a>`;
            downloadList.appendChild(li);
        });
    }

    previewFile(fileName) {
        const previewContainer = document.getElementById('preview-container');
        previewContainer.innerHTML = `<p>Visualizando: ${fileName}.<br> (Aqui seria a visualização real do arquivo)</p>`;
    }
}

class MaterialLibrary {
    constructor(materials) {
        this.materials = materials.map(
            material => new Material(material.title, material.category, material.level, material.date, material.link)
        );
    }

    filterMaterials(searchInput, categoryFilter, levelFilter, dateFilter) {
        return this.materials.filter(material =>
            material.matchesFilters(searchInput, categoryFilter, levelFilter, dateFilter)
        );
    }

    displayMaterials(filteredMaterials) {
        const materialsList = document.getElementById('materialsList');
        materialsList.innerHTML = ''; // Limpa a lista de resultados

        if (filteredMaterials.length === 0) {
            materialsList.innerHTML = '<li>Nenhum material encontrado.</li>';
        } else {
            filteredMaterials.forEach(material => {
                const li = document.createElement('li');
                li.innerHTML = material.toHTML();
                materialsList.appendChild(li);
            });
        }
    }

    searchMaterials() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const levelFilter = document.getElementById('levelFilter').value;
        const dateFilter = document.getElementById('dateFilter').value;

        const filteredMaterials = this.filterMaterials(searchInput, categoryFilter, levelFilter, dateFilter);
        this.displayMaterials(filteredMaterials);
    }
}

// Inicialização dos materiais e uploader
const materialsData = [
    { title: "Álgebra Básica - Guia Completo", category: "Matemática", level: "Fundamental", date: "2024-11-01", link: "https://example.com/material1" },
    { title: "Física Quântica: Introdução", category: "Ciências", level: "Médio", date: "2024-12-01", link: "https://example.com/material2" },
    { title: "Gramatica Avançada - Linguagens", category: "Linguagens", level: "Superior", date: "2024-10-15", link: "https://example.com/material3" },
    { title: "Revolução Industrial - História", category: "História", level: "Médio", date: "2024-11-10", link: "https://example.com/material4" },
];

const materialLibrary = new MaterialLibrary(materialsData);
const fileUploader = new FileUploader();

// Eventos iniciais
window.onload = function () {
    materialLibrary.displayMaterials(materialLibrary.materials); // Exibir materiais iniciais
};

// Funções globais para interação
function applyFilters() {
    materialLibrary.searchMaterials();
}

function searchMaterials() {
    materialLibrary.searchMaterials();
}

function validateUpload() {
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];

    if (!fileUploader.validateFile(file)) {
        alert('Por favor, envie um arquivo PDF, PPT ou DOCX.');
        fileInput.value = ''; // Limpa o campo de upload
    }
}

function uploadFile() {
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];
    fileUploader.uploadFile(file);
}


