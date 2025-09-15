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


//parte do teste do json
/*function carregarDados(){
    let divisao = document.querySelector("#divProduto")
        divisao.innerHTML+= "<ol>"
        fetch("prod.json").then((response) =>{
            response.json().then((prod) =>{
                           prod.produtos.map((produto) =>{
                            divisao.innerHTML+="<li> {"
                            +produto.id+", "
                            + produto.nome+", " //aqui colocar os nomes igual ta no json
                            +produto.preco+", "
                            +produto.qtd+", "
                            +produto.desc+ "} </li>";
                            console.log(produto.cod);
                            console.log(produto.nome);
                            console.log(produto.preco);
                        })          
            })
        })
        divisao.innerHTML+= "</ol>"
}

window.addEventListener("load", function(){
    carregarDados()
})*/

//carrinho teste
function carregarDados() {
  let divSecSala = document.getElementById("secSala");
  divSecSala.innerHTML = ""; // limpar antes de carregar

  fetch("prod.json")
    .then(response => response.json())
    .then(data => {
      data.produtos.forEach(produto => {
        // Criar um "card" para cada produto
        let card = document.createElement("div");
        card.classList.add("produto");

        card.innerHTML = `
          <img src="${produto.imagem}" alt="${produto.nome}" width="150"/>
          <p>${produto.nome}</p>
          <p>Preço: R$ ${produto.preco}</p>
          <button onclick="adicionarAoCarrinho('${produto.nome}', ${produto.id}, ${produto.preco},'${produto.imagem}')">Adicionar ao carrinho</button>
        `;

        divSecSala.appendChild(card);
      });
    });
}

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
