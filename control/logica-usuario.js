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
      const dadosUsuario = Object.fromEntries(formData); // { nome, email, senha }

      // Recupera lista de usuários existentes
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      // Verifica se email já existe
      if (usuarios.some(u => u.email === dadosUsuario.email)) {
        alert("Usuário já existe!");
        return;
      }

      // Adiciona novo usuário
      usuarios.push(dadosUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      // Define como usuário logado
      localStorage.setItem("usuarioAtual", JSON.stringify(dadosUsuario));

      window.location.href = "index.html";
    });
  }

  // LOGIN
  const formLogin = document.querySelector(".form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", function(event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const dadosLogin = Object.fromEntries(formData); // { email, senha }

      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      let usuarioValido = usuarios.find(u => u.email === dadosLogin.email && u.senha === dadosLogin.senha);

      if (usuarioValido) {
        localStorage.setItem("usuarioAtual", JSON.stringify(usuarioValido));
        window.location.href = "index.html";
      } else {
        alert("Email ou senha incorretos!");
      }
    });
  }
});
