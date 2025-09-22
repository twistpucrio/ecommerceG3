// CARRINHO:

// Função para salvar no carrinho
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

// Função para salvar nos favoritos
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