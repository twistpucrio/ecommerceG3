// CARRINHO:

// ------------------- Renderiza o carrinho ------------------- 

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
    document.getElementById('total').textContent = "Total: R$ 0,00";

    const btn = document.getElementById('finalizar');
    if (btn) btn.style.display = 'none';
    const tc = document.querySelector('.total-container');
    if (tc) tc.style.display = 'none';
    const btnR= document.getElementById('removerTodos');
    if(btnR) btnR.style.display='none';
    return;
  }

  div.innerHTML = carrinho.map((item, i) => `
    <div class="item-carrinho">
      <img class="img-carrinho" src="${item.imagem}" width="100" alt="${item.nome}">
      <p class="tit-carrinho">${item.nome} - R$ ${item.preco} x ${item.quantidade || 1}</p>
      <button class="btn-diminuir" data-index="${i}">-</button>
      <button class="btn-aumentar" data-index="${i}">+</button>
      <button class="btn-remover" data-index="${i}" aria-label="Remover ${item.nome}">
        Remover
      </button>
    </div>
  `).join('');

  const total = carrinho.reduce((soma, item) => soma + Number(item.preco || 0) * (item.quantidade || 1), 0);
  document.getElementById('total').textContent = "Total: R$ " + total.toFixed(2);
}

window.addEventListener('load', () => {
  if (document.getElementById("carrinho-container")) {
    renderCarrinho();
  }
});

// ------------------- Salvar produtos no carrinho ------------------- 

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

// --------------- Atualizar valor total do carrinho ---------------- 

function atualizarTotal() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let total = carrinho.reduce((soma, item) => soma + Number(item.preco || 0), 0);
    document.getElementById('total').textContent = "Total: R$ " + total.toFixed(2);
  }

  // Chama ao carregar
  window.addEventListener('load', atualizarTotal);

// FAVORITOS:

// ------------------- Salvar produtos nos favoritos ------------------- 

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
