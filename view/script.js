//barra de pesquisa
document.getElementById("search-button").addEventListener("click", function() {
  const query = document.getElementById("search-input").value.trim();
  if (query) {
    // Exemplo: redirecionar para uma página de resultados
    window.location.href = "resultados.html?q=" + encodeURIComponent(query);
  } else {
    alert("Digite algo para pesquisar!");
  }
});


 
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-carrinho');
  if (!btn) return;

  const nome   = btn.dataset.nome;
  const id     = Number(btn.dataset.id);
  const preco  = Number(btn.dataset.preco);
  const imagem = btn.dataset.imagem;

  adicionarAoCarrinho(nome, id, preco, imagem);
});
// Função para salvar no carrinho
function adicionarAoCarrinho(nome, id, preco,imagem) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  let produto = {
    id:id,
    nome: nome,
    imagem: imagem,
    preco: preco
  };

  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  alert(nome + " foi adicionado ao carrinho!");
}

window.addEventListener("load", carregarDados);

//Função do contador do carrinho:

function updateCartCounter(count) {
    const counterElement = document.getElementById('cart-counter');
    
    if (count > 0) {
        counterElement.textContent = count;
        counterElement.style.display = 'block'; // Mostra o contador
    } else {
        counterElement.style.display = 'none'; // Esconde o contador
    }
}

// Para testar, chame a função com um número.
// Na sua aplicação real, chame esta função
// sempre que um item for adicionado ou removido.
updateCartCounter(3); // Exemplo: 3 itens no carrinho

