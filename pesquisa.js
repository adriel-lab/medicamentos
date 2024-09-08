function populateFilters() {
    const genericos = new Set();
    const comerciais = new Set();
    const principios = new Set();

    medicamentos.forEach(medicamento => {
        genericos.add(medicamento.nome_generico);
        comerciais.add(medicamento.nome_comercial);
        principios.add(medicamento.principio_ativo);
    });

    const filtroNomeGenerico = document.getElementById('filtro-nome-generico');
    const filtroNomeComercial = document.getElementById('filtro-nome-comercial');
    const filtroPrincipioAtivo = document.getElementById('filtro-principio-ativo');

    genericos.forEach(nome => {
        const option = document.createElement('option');
        option.value = nome;
        option.textContent = nome;
        filtroNomeGenerico.appendChild(option);
    });

    comerciais.forEach(nome => {
        const option = document.createElement('option');
        option.value = nome;
        option.textContent = nome;
        filtroNomeComercial.appendChild(option);
    });

    principios.forEach(nome => {
        const option = document.createElement('option');
        option.value = nome;
        option.textContent = nome;
        filtroPrincipioAtivo.appendChild(option);
    });
}

function searchMedicamento() {
    const query = document.getElementById('pesquisa').value.toLowerCase();
    const filtroNomeGenerico = document.getElementById('filtro-nome-generico').value.toLowerCase();
    const filtroNomeComercial = document.getElementById('filtro-nome-comercial').value.toLowerCase();
    const filtroPrincipioAtivo = document.getElementById('filtro-principio-ativo').value.toLowerCase();
    const resultadoDiv = document.getElementById('resultado');
    const erroDiv = document.getElementById('erro');
    resultadoDiv.innerHTML = '';
    erroDiv.innerHTML = '';

    // Verificar se o campo de pesquisa está vazio
    if (!query && !filtroNomeGenerico && !filtroNomeComercial && !filtroPrincipioAtivo) {
        erroDiv.innerHTML = 'Por favor, insira um termo de pesquisa.';
        return;
    }

    const resultados = medicamentos.filter(medicamento =>
        (query &&
            (medicamento.nome_generico.toLowerCase().includes(query) ||
                medicamento.nome_comercial.toLowerCase().includes(query) ||
                medicamento.principio_ativo.toLowerCase().includes(query) ||
                medicamento.indicacoes.toLowerCase().includes(query) ||
                medicamento.forma_farmaceutica.toLowerCase().includes(query) ||
                medicamento.apresentacao.toLowerCase().includes(query) ||
                medicamento.fabricante.toLowerCase().includes(query) ||
                medicamento.posologia.toLowerCase().includes(query) ||
                medicamento.concentracao.toLowerCase().includes(query))) &&
        (filtroNomeGenerico === '' || medicamento.nome_generico.toLowerCase() === filtroNomeGenerico) &&
        (filtroNomeComercial === '' || medicamento.nome_comercial.toLowerCase() === filtroNomeComercial) &&
        (filtroPrincipioAtivo === '' || medicamento.principio_ativo.toLowerCase() === filtroPrincipioAtivo)
    );

    if (resultados.length > 0) {
        resultados.forEach(medicamento => {
            resultadoDiv.innerHTML += `
                <div class="medicamento">
                    <img src="${medicamento.imagem}" alt="${medicamento.nome_comercial}">
                    <h2>${medicamento.nome_comercial} (${medicamento.nome_generico})</h2>
                    <p><strong>Forma farmacêutica:</strong> ${medicamento.forma_farmaceutica}</p>
                    <p><strong>Apresentação:</strong> ${medicamento.apresentacao}</p>
                    <p><strong>Princípio ativo:</strong> ${medicamento.principio_ativo}</p>
                    <p><strong>Concentração:</strong> ${medicamento.concentracao}</p>
                    <p><strong>Fabricante:</strong> ${medicamento.fabricante}</p>
                    <p><strong>Indicações:</strong> ${medicamento.indicacoes}</p>
                    <p><strong>Posologia:</strong> ${medicamento.posologia}</p>
                    <p><strong>Preço:</strong> R$${medicamento.preco.toFixed(2)}</p>
                </div>
            `;
        });
    } else {
        erroDiv.innerHTML = 'Nenhum medicamento encontrado para a pesquisa.';
    }
}



document.addEventListener('DOMContentLoaded', () => {
    populateFilters();
});