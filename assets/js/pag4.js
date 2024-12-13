document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Feedback enviado com sucesso!');
});

document.getElementById('testemunho-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const exp = document.getElementById('exp').value;
    const depoimento = document.createElement('p');
    depoimento.textContent = exp;
    document.getElementById('carrossel-testemunhos').appendChild(depoimento);
    alert('Testemunho enviado com sucesso!');
});

// Simulação de dados para o gráfico
const estatisticas = {
    materiaisCompartilhados: 50,
    participantesAtivos: 120
};

// Atualização do gráfico em tempo real
function atualizarGrafico() {
    const graficoDiv = document.getElementById('grafico-estatisticas');
    graficoDiv.innerHTML = `
        <p>Materiais Compartilhados: ${estatisticas.materiaisCompartilhados}</p>
        <p>Participantes Ativos: ${estatisticas.participantesAtivos}</p>
    `;
}

// Chamada para atualizar o gráfico inicialmente
atualizarGrafico();

// Simulação de atualização dos dados a cada 5 segundos
setInterval(() => {
    estatisticas.materiaisCompartilhados += Math.floor(Math.random() * 5);
    estatisticas.participantesAtivos += Math.floor(Math.random() * 10);
    atualizarGrafico();
}, 5000);