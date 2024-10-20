document.getElementById("cnpjForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Obtenha o valor do campo CNPJ
    let cnpj = document.getElementById("cnpj").value;
    cnpj = cnpj.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Valida CNPJ
    if (cnpj.length !== 14) {
        document.getElementById("result").innerText = "Por favor, insira um CNPJ válido com 14 dígitos.";
        return;
    }

    // Faz a requisição para a API Brasil com o CNPJ limpo
    fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
        .then(response => response.json())
        .then(data => {
            // Exibe os dados na forma de tabela
            if (data.cnpj) {
                document.getElementById("result").innerHTML = `
                    <table>
                        <tr><th>CNPJ</th><td>${data.cnpj}</td></tr>
                        <tr><th>Razão Social</th><td>${data.razao_social}</td></tr>
                        <tr><th>Nome Fantasia</th><td>${data.nome_fantasia || 'N/A'}</td></tr>
                        <tr><th>Natureza Jurídica</th><td>${data.natureza_juridica}</td></tr>
                        <tr><th>Data de Abertura</th><td>${data.data_inicio_atividade}</td></tr>
                        <tr><th>Atividade Principal</th><td>${data.cnae_fiscal_descricao}</td></tr>
                        <tr><th>Endereço</th><td>${data.logradouro}, ${data.numero} - ${data.bairro}, ${data.municipio} - ${data.uf}</td></tr>
                        <tr><th>CEP</th><td>${data.cep}</td></tr>
                        <tr><th>Telefone</th><td>${data.ddd_telefone_1 || 'N/A'}</td></tr>
                        <tr><th>Email</th><td>${data.email || 'N/A'}</td></tr>
                    </table>
                `;
            } else {
                document.getElementById("result").innerText = "CNPJ não encontrado.";
            }
        })
        .catch(error => {
            console.error("Erro ao consultar API:", error);
            document.getElementById("result").innerText = "Erro ao consultar o CNPJ. Tente novamente.";
        });
});
