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
function carregarDados(){
    let divisao = document.querySelector("#divProduto")
        divisao.innerHTML+= "<ol>"
        fetch("prod.json").then((response) =>{
            response.json().then((prod) =>{
                           prod.prodA.map((produto) =>{
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
})