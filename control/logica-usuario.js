window.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioAtual"));
  const bemVindo = document.getElementById("bem-vindo");

  // Renderiza nome na index
  if (usuario && usuario.nome && bemVindo) {
    const primeiroNome = usuario.nome.split(" ")[0];
    bemVindo.textContent = `Olá, ${primeiroNome}!`;
  }

  // Troca o link do perfil (img dentro de <a>)
  const perfilImg = document.getElementById("perfil");
  if (perfilImg && perfilImg.parentElement) {
    perfilImg.parentElement.setAttribute("href", usuario ? "logout.html" : "login.html");
  }

  // LOGOUT
  const btnLogout = document.querySelector("#btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("usuarioAtual");
      window.location.href = "index.html";
    });
  }

  // CADASTRO — UM único submit handler
  const form = document.querySelector(".form-cadastro");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const senha = document.getElementById("senha").value;
      const confirmar = document.getElementById("confirmar-senha").value;

      // valida antes de salvar
      if (senha !== confirmar) {
        alert("As senhas não coincidem. Tente novamente.");
        document.getElementById("confirmar-senha").value = "";
        document.getElementById("confirmar-senha").focus();
        return; // não continua
      }

      // senhas ok -> salva e redireciona
      const dadosUsuario = Object.fromEntries(new FormData(form));
      localStorage.setItem("usuarioAtual", JSON.stringify(dadosUsuario));
      window.location.href = "index.html";
    });
  }
});
