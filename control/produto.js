document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("produto-container").innerHTML =
      "<p>Produto não encontrado.</p>";
    return;
  }

  fetch("../model/produtos.json")
    .then(r => r.json())
    .then(data => {
      const produto = (data.produtos || []).find(p => String(p.id) === id);

      if (!produto) {
        document.getElementById("produto-container").innerHTML =
          "<p>Produto não encontrado.</p>";
        return;
      }

      // Renderiza os dados
      document.getElementById("produto-nome").textContent = produto.nome;
      document.getElementById("produto-imagem").src = produto.imagem;
      document.getElementById("produto-imagem").alt = produto.nome;
      document.getElementById("produto-preco").textContent = produto.preco;

      // Adicionar ao carrinho
      const btnCarrinho = document.getElementById("btn-add-carrinho");
      if (btnCarrinho) {
        btnCarrinho.addEventListener("click", () => {
          if (typeof adicionarAoCarrinho === "function") {
            adicionarAoCarrinho(produto.nome, produto.id, produto.preco, produto.imagem);
          } else {
            alert("Carrinho não implementado ainda.");
          }
        });
      }

      // Adicionar aos favoritos
      const btnFav = document.getElementById("btn-add-fav");
      if (btnFav) {
        btnFav.addEventListener("click", () => {
          if (typeof adicionarAFavoritos === "function") {
            adicionarAFavoritos(produto.nome, produto.id, produto.preco, produto.imagem);
          } else {
            alert("Favoritos não implementado ainda.");
          }
        });
      }
    })
    .catch(err => {
      console.error("Erro ao carregar produto:", err);
      document.getElementById("produto-container").innerHTML =
        "<p>Erro ao carregar produto.</p>";
    });
});
