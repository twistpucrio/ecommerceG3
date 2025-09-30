// BARRA DE PESQUISA:

/*document.getElementById("search-button").addEventListener("click", function() {
  const query = document.getElementById("search-input").value.trim();
  if (query) {
    // Exemplo: redirecionar para uma página de resultados
    window.location.href = "resultados.html?q=" + encodeURIComponent(query);
  } else {
    alert("Digite algo para pesquisar!");
  }
});*/

// CARRINHO:

//Adicionar ao carrinho
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-carrinho');
  if (!btn) return;

  const nome   = btn.dataset.nome;
  const id     = Number(btn.dataset.id);
  const preco  = Number(btn.dataset.preco);
  const imagem = btn.dataset.imagem;

  adicionarAoCarrinho(nome, id, preco, imagem);
});

// FAVORITOS:

document.addEventListener('click', (e) => {

  
  const btn = e.target.closest('.btn-favoritos');
  if (!btn) return;

  const nome   = btn.dataset.nome;
  const id     = Number(btn.dataset.id);
  const preco  = Number(btn.dataset.preco);
  const imagem = btn.dataset.imagem;

  adicionarAFavoritos(nome, id, preco, imagem);
});


document.getElementById('search-input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // evitar comportamento padrão (ex: submit)
    document.getElementById('search-button').click(); // dispara o clique no botão
  }
});





document.getElementById('search-button').addEventListener('click', buscarProduto);

async function buscarProduto() {
  document.getElementById('cate').style.display = 'none';
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.style.display = 'block';
  resultadoDiv.innerHTML = '<p>Carregando...</p>';
  const termo = document.getElementById('search-input').value.toLowerCase();

  try {
    const response = await fetch('../model/produtos.json');
    const dados = await response.json(); // dados = { produtos: [...] }

    const produtos = dados.produtos;

    const resultados = produtos.filter(produto =>
      produto.nome.toLowerCase().includes(termo)
    );

    resultadoDiv.innerHTML = '';

    if (resultados.length === 0) {
      resultadoDiv.innerHTML = '<p class="nenhumproduto">Nenhum produto encontrado.</p>';
      return;
    }

    resultados.forEach(produto => {
      const div = document.createElement('div');
      div.classList.add('item');
      div.innerHTML = `
  <img src="${produto.imagem}" alt="${produto.nome}" style="width: 150px;">
  <h3>${produto.nome}</h3>
  <p>${produto.descricao}</p>
  <p>Preço: R$ ${produto.preco.toFixed(2)}</p>

  <button 
    class="btn-carrinho" 
    data-nome="${produto.nome}" 
    data-id="${produto.id}" 
    data-preco="${produto.preco}" 
    data-imagem="${produto.imagem}">
    Adicionar ao Carrinho
  </button>

  <button 
    class="btn-favoritos" 
    data-nome="${produto.nome}" 
    data-id="${produto.id}" 
    data-preco="${produto.preco}" 
    data-imagem="${produto.imagem}">
    Adicionar aos Favoritos
  </button>

  <hr>
`;
      resultadoDiv.appendChild(div);
    });
  } catch (error) {
    resultadoDiv.innerHTML = '<p class="erro">Erro ao carregar botões.</p>';
    console.error('Erro ao buscar produtos:', error);
  }
}
