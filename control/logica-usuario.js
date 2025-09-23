// INDEX:

//Renderiza o nome do usuário na index:
window.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioAtual"));
  const bemVindo = document.getElementById("bem-vindo");

  if (usuario && usuario.nome) {
    const primeiroNome = usuario.nome.split(" ")[0];
    bemVindo.textContent = `Olá, ${primeiroNome}!`;
  }

  // Troca o link do botão perfil dependendo do login
  const perfilLink = document.getElementById("perfil");
  if (perfilLink) {
    if (usuario) {
      perfilLink.parentElement.setAttribute("href", "logout.html");
    } else {
      perfilLink.parentElement.setAttribute("href", "login.html"); 
    }
  }
});
  
// CADASTRO:

//Guarda os dados do usuário que se cadastrou:
document.querySelector(".form-cadastro").addEventListener("submit", function(event) {
  event.preventDefault(); // Previne o reload da página

  const formData = new FormData(event.target); // Cria um objeto que contém todos os inputs (com name) e seus respectivos valores
  
  const dadosUsuario = Object.fromEntries(formData);  // Exemplo: { nome: "Anna", email: "anna@email.com" }
  console.log("Dados do formulário:", dadosUsuario);
  localStorage.setItem("usuarioAtual", JSON.stringify(dadosUsuario));

  // Redireciona para index.html depois do cadastro
  window.location.href = "index.html";
});

//garantindo que a senha do cadastro coincide
const form = document.querySelector(".form-cadastro");

  form.addEventListener("submit", function (e) {
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    if (senha !== confirmarSenha) {
      e.preventDefault(); // bloqueia o envio
      alert("As senhas não coincidem. Tente novamente.");

      // opcional: limpa o campo confirmar senha e foca nele
      document.getElementById("confirmar-senha").value = "";
      document.getElementById("confirmar-senha").focus();
    }
  });