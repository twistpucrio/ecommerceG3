// produto.js — preenche a página de produto e injeta data-* nos botões
// para o listener delegado global (logica-botoes-produtos.js)

(function () {
  const DATA_URL = "../model/produtos.json"; // ajuste se o seu caminho for outro

  function getIdFromURL() {
    const sp = new URLSearchParams(window.location.search);
    return sp.get("id");
  }

  async function carregarProdutos() {
    const resp = await fetch(DATA_URL);
    if (!resp.ok) throw new Error("Não foi possível carregar os produtos.");
    return resp.json();
  }

  function formatarPreco(preco) {
    if (typeof preco === "number") {
      return `R$ ${preco.toLocaleString("pt-BR")}`;
    }
    return preco || "";
  }

  function preencherCampos(produto) {
    const imgEl = document.getElementById("produto-imagem");
    const nomeEl = document.getElementById("produto-nome");
    const precoEl = document.getElementById("produto-preco");
    const descEl = document.getElementById("produto-descricao");
    const medidasEl = document.getElementById("produto-medidas");

    if (imgEl) {
      imgEl.src = produto.imagem;
      imgEl.alt = produto.nome;
    }
    if (nomeEl) nomeEl.textContent = produto.nome;
    if (precoEl) precoEl.textContent = formatarPreco(produto.preco);
    if (descEl) descEl.textContent = produto.descricao || "";
    
    if (medidasEl) {
      // mostra medidas se existirem
      const medidas = [];
      if (produto.largura) medidas.push(`Largura: ${produto.largura} cm`);
      if (produto.altura) medidas.push(`Altura: ${produto.altura} cm`);
      if (produto.profundidade) medidas.push(`Profundidade: ${produto.profundidade} cm`);
      if (produto.peso) medidas.push(`Peso: ${produto.peso} kg`);
      medidasEl.textContent = medidas.join(" | ");
    }
  }

  // injeta data-* para o listener delegado (.btn-carrinho / .btn-favoritos)
  function prepararBotoes(produto) {
    const btnCarrinho = document.getElementById("btn-add-carrinho");
    if (btnCarrinho) {
      btnCarrinho.classList.add("btn-carrinho");
      btnCarrinho.dataset.id = String(produto.id);
      btnCarrinho.dataset.nome = produto.nome;
      btnCarrinho.dataset.preco = String(produto.preco);
      btnCarrinho.dataset.imagem = produto.imagem;
      btnCarrinho.dataset.descricao = produto.descricao || "";
      btnCarrinho.dataset.largura = produto.largura || "";
      btnCarrinho.dataset.altura = produto.altura || "";
      btnCarrinho.dataset.profundidade = produto.profundidade || "";
      btnCarrinho.dataset.peso = produto.peso || "";
    }

    const btnFav = document.getElementById("btn-add-fav");
    if (btnFav) {
      btnFav.classList.add("btn-favoritos");
      btnFav.dataset.id = String(produto.id);
      btnFav.dataset.nome = produto.nome;
      btnFav.dataset.preco = String(produto.preco);
      btnFav.dataset.imagem = produto.imagem;
      btnFav.dataset.descricao = produto.descricao || "";
      btnFav.dataset.largura = produto.largura || "";
      btnFav.dataset.altura = produto.altura || "";
      btnFav.dataset.profundidade = produto.profundidade || "";
      btnFav.dataset.peso = produto.peso || "";
    }
  }

  async function init() {
    try {
      const id = getIdFromURL();
      if (!id) throw new Error("Parâmetro ?id não encontrado na URL.");

      const data = await carregarProdutos();
      const lista = Array.isArray(data) ? data : (data.produtos || []);
      const produto = lista.find((p) => String(p.id) === String(id));
      if (!produto) throw new Error("Produto não encontrado.");

      preencherCampos(produto);
      prepararBotoes(produto);
    } catch (err) {
      console.error(err);
      const box = document.getElementById("produto-container");
      if (box) box.innerHTML = "<p>Não foi possível carregar o produto.</p>";
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
