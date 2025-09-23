window.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioAtual"));
  const bemVindo = document.getElementById("bem-vindo");

  // Renderiza nome na index
  if (usuario && usuario.nome && bemVindo) {
    const primeiroNome = usuario.nome.split(" ")[0];
    bemVindo.textContent = `Olá, ${primeiroNome}!`;
  }

  // Troca o link do perfil
  const perfilLink = document.getElementById("perfil");
  if (perfilLink) {
    if (usuario) {
      perfilLink.parentElement.setAttribute("href", "logout.html");
    } else {
      perfilLink.parentElement.setAttribute("href", "login.html"); 
    }
  }

  // LOGOUT
  const btnLogout = document.querySelector("#btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("usuarioAtual");
      window.location.href = "index.html";
    });
  }

  // CADASTRO
  const formCadastro = document.querySelector(".form-cadastro");
  if (formCadastro) {
    formCadastro.addEventListener("submit", function(event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const dadosUsuario = Object.fromEntries(formData);
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
 
      window.location.href = "index.html";
    });
  }
});
 