const inputEndereco = document.getElementById('endereco');
const btnBuscar = document.getElementById('buscar');
const resultados = document.getElementById('resultados');

const psicólogos = [
  {
    imagem: "assets/img/avatar-1.png",
    nome: "Ana Silva",
    crp: "123456",
    telefone: "(11) 98765-4321",
    endereco: "São Paulo, SP"
  },
  {
    imagem: "assets/img/avatar-2.png",
    nome: "Carlos rodrigues",
    crp: "123456",
    telefone: "(11) 98765-4321",
    endereco: "Santos, SP"
  },
  {
    imagem: "assets/img/avatar-3.png",
    nome: "Ana Suy",
    crp: "123456",
    telefone: "(11) 98765-4321",
    endereco: "Salvador, BA"
  },
  {
    imagem: "assets/img/avatar-4.png",
    nome: "Pedro Santos",
    crp: "789012",
    telefone: "(21) 91234-5678",
    endereco: "Rio de Janeiro, RJ"
  },
  {
    imagem: "assets/img/avatar-.png",
    nome: "Maria Oliveira",
    crp: "345678",
    telefone: "(19) 98765-4321",
    endereco: "Campinas, SP"
  }
];

function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function buscarPsicologos(endereco) {

  if (endereco === '') {
    alert('Por favor, insira um endereço para realizar a busca.');
    return;
  }

  const regex = /^[a-zA-ZÀ-ÿ\s]+$/;

  if (!regex.test(endereco)) {
    resultados.innerHTML = '<p class="erro">Por favor, insira um endereço válido sem números ou caracteres especiais.</p>';
    return;
  }

  const enderecoNormalizado = removerAcentos(endereco.toLowerCase());

  const resultadosFiltrados = psicólogos.filter(psicologo => {
    const enderecoPsicologoNormalizado = removerAcentos(psicologo.endereco.toLowerCase());
    return enderecoPsicologoNormalizado.includes(enderecoNormalizado);
  });

  resultados.innerHTML = '';

  if (resultadosFiltrados.length > 0) {
    resultadosFiltrados.forEach(psicologo => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
          <img src="${psicologo.imagem}" alt="Foto do psicólogo" />
          <h2>${psicologo.nome}</h2>
          <p>CRP: ${psicologo.crp}</p>
          <p>Telefone: ${psicologo.telefone}</p>
          <p>Endereço: ${psicologo.endereco}</p>
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
