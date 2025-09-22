// CADASTRO:

// Guarda os dados do usuário que se cadastrou:
document.querySelector(".form-cadastro").addEventListener("submit", function(event) {
  event.preventDefault(); // Previne o reload da página

  const formData = new FormData(event.target); // Cria um objeto que contém todos os inputs (com name) e seus respectivos valores
  
  const dadosUsuario = Object.fromEntries(formData);  // Exemplo: { nome: "Anna", email: "anna@email.com" }
  localStorage.setItem("usuarioAtual", JSON.stringify(dadosUsuario));
});