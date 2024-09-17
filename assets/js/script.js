const inputEndereco = document.getElementById('endereco');
const btnBuscar = document.getElementById('buscar');
const resultados = document.getElementById('resultados');
const main = document.querySelector('main');

function gerarPsicologos(num) {
  const nomes = ["Carlos Rodrigues", "Ana Silva", "Rodrigo Costa", "Ana Pereira", "Carlos jose", "Maria Oliveira", "Fernanda Souza", "Ana Suy", "Beatriz Nogueira", "Lucas Santos", "Juliana Lima", "Pedro Henrique", "Mariana Ferreira"];
  const crps = ["123456", "654321", "345678", "789012", "567890", "890123", "345679", "901234"];
  const telefones = ["(11) 98765-4321", "(21) 99876-5432", "(19) 98765-4321", "(31) 98765-4321", "(41) 92345-6789", "(51) 98765-1234", "(65) 99654-3210", "(62) 98123-4567"];
  const enderecos = ["São Paulo, SP", "Osasco, SP", "Salvador, BA", "Rio de Janeiro, RJ", "Mauá, SP", "Diadema, SP", "Belo Horizonte, MG", "Curitiba, PR", "Porto Alegre, RS", "Cuiabá, MT", "Goiânia, GO", "Boa Vista, RR", "Natal, RN", "Manaus, AM"];
  
  let psicologos = [];

  for (let i = 0; i < num; i++) {
    psicologos.push({
      imagem: `assets/img/avatar-${(i % 7) + 1}.jpg`,
      nome: nomes[i % nomes.length],
      crp: crps[i % crps.length],
      telefone: telefones[i % telefones.length],
      endereco: enderecos[i % enderecos.length]
    });
  }

  return psicologos;
}

const psicólogos = gerarPsicologos(14);

function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function buscarPsicologos(endereco) {
  if (endereco === '') {
    alert('Por favor, insira um endereço para realizar a busca.');
    main.classList.remove('show');
    return;
  }

  const regex = /^[a-zA-ZÀ-ÿ\s]+$/;

  if (!regex.test(endereco)) {
    resultados.innerHTML = alert('Por favor, insira um endereço válido sem números ou caracteres especiais.');
    main.classList.remove('show');
    return;
  }

  const enderecoNormalizado = removerAcentos(endereco.toLowerCase());

  const resultadosFiltrados = psicólogos.filter(psicologo => {
    const enderecoPsicologoNormalizado = removerAcentos(psicologo.endereco.toLowerCase());
    return enderecoPsicologoNormalizado.includes(enderecoNormalizado);
  });

  resultados.innerHTML = '';
  main.classList.add('show');

  if (resultadosFiltrados.length > 0) {
    resultadosFiltrados.forEach(psicologo => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
          <img class="image" src="${psicologo.imagem}" alt="Foto do psicólogo" />
          <h2>${psicologo.nome}</h2>
          <article>
            <p>CRP: ${psicologo.crp}</p>
            <p>Telefone: ${psicologo.telefone}</p>
            <p>Endereço: ${psicologo.endereco}</p>
          </article>
          <ion-icon name="chatbubbles-outline"></ion-icon>
      `;
      resultados.appendChild(card);
    });
  } else {
    resultados.innerHTML = '<p class="erro">Nenhum psicólogo encontrado para o endereço fornecido.</p>';
  }
}

btnBuscar.addEventListener('click', function () {
  const endereco = inputEndereco.value.trim();
  buscarPsicologos(endereco);
});
