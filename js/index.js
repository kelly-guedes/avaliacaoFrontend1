const formEntrar = document.querySelector("#form");
const entrar = document.querySelector("#entrar");
const user = document.querySelector("#user");
const password = document.querySelector("#password");
const msgError = document.querySelector("#msgError");

function entrarLogin(e) {
  e.preventDefault();
  const listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");
  const userEncontrado = listaUser.find((item) => {
    return item.emailCad === user.value;
  });

  if (!userEncontrado) {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "E-mail não cadastrado, clique em criar conta.";
    user.focus();
    return;
  }

  if (password.value === userEncontrado.passwordCad) {
    document.location.href = "./recados.html";

    localStorage.setItem("userLogado", JSON.stringify(userEncontrado));
  } else {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "Usuário ou senha incorretos";
    user.focus();
  }
}
formEntrar.addEventListener("submit", entrarLogin);
