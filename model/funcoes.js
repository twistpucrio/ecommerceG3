// CARRINHO:

//Renderiza o carrinho
function renderCarrinho() {
      const div = document.getElementById('listaCarrinho');
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

      if (carrinho.length === 0) {
        div.innerHTML = `
    <div class="msg-vazio">
      <p>Oops... parece que seu carrinho está vazio!</p>
      <a href="index.html" class="btn-voltar">Ver produtos</a>
    </div>
  `;
      return;
    }

    // Cada item vem com um botão Remover
    div.innerHTML = carrinho.map((item, i) => ` 
      <div class="item-carrinho">
        <img class="img-carrinho" src="${item.imagem}" width="100" alt="${item.nome}">
        <p>${item.nome} - R$ ${item.preco}</p>
        <button class="btn-remover" data-index="${i}" aria-label="Remover ${item.nome}">
          Remover
        </button>
      </div>
    `).join('');
  }
  window.addEventListener('load', renderCarrinho);

// Salvar produtos no carrinho
function adicionarAoCarrinho(nome, id, preco, imagem) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Procura se o produto já está no carrinho
  let produtoExistente = carrinho.find(item => item.id === id);

  if (produtoExistente) {
    // Se já existe, aumenta a quantidade
    produtoExistente.quantidade = (produtoExistente.quantidade || 1) + 1;
  } else {
    // Se não existe, adiciona novo item com quantidade 1
    let produto = {
      id: id,
      nome: nome,
      imagem: imagem,
      preco: preco,
      quantidade: 1
    };
    carrinho.push(produto);
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderCarrinho();
  alert(nome + " foi adicionado ao carrinho!");
}

// FAVORITOS:

// Salvar produtos nos favoritos
function adicionarAFavoritos(nome, id, preco, imagem) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  let produto = {
    id: id,
    nome: nome,
    imagem: imagem,
    preco: preco
  };

  favoritos.push(produto);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  alert(nome + " foi adicionado à lista de favoritos!");
}