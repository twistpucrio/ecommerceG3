// CARRINHO:

// Função para salvar no carrinho
function adicionarAoCarrinho(nome, id, preco, imagem) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  let produto = {
    id: id,
    nome: nome,
    imagem: imagem,
    preco: preco
  };

  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

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