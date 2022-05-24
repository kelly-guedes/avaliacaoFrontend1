let formEntrar = document.querySelector("#form");
let entrar = document.querySelector("#entrar");
let user = document.querySelector("#user");
let password = document.querySelector("#password");
let msgError = document.querySelector("#msgError");
let listaUser = [];
let userValid = {
  user: "",
  password: "",
};

function entrarLogin(e) {
  e.preventDefault();
  listaUser = JSON.parse(localStorage.getItem("listaUser"));

  listaUser.forEach((item) => {
    if (user.value === item.emailCad && password.value === item.passwordCad) {
      userValid = {
        user: item.emailCad,
        password: item.passwordCad,
      };
    }
  });

  let userLogado = JSON.parse(localStorage.getItem("userLogado.user"));

  if (user.value != userValid.user) {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "E-mail não encontrado, clique em criar conta.";
    user.focus();
    return;
  }

  if (user.value == userValid.user && password.value == userValid.password) {
    setTimeout(() => {
      document.location.href = "./recados.html";
    }, 1500);
    localStorage.setItem("userLogado", JSON.stringify(userValid));
  } else {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "Usuário ou senha incorretos";
    user.focus();
  }
}
formEntrar.addEventListener("submit", entrarLogin);
