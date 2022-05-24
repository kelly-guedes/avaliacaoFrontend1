let formCadastro = document.querySelector("#formCadastro");

let inputSalvarUsuario = document.querySelector("#salvarUsuario");
let emailUser = document.querySelector("#emailUser");
let labelEmailUser = document.querySelector("#labelEmailUser");
let validEmail = false;

let passwordUser = document.querySelector("#passwordUser");
let labelPasswordUser = document.querySelector("#labelPasswordUser");
let validPassword = false;

let confirmPassword = document.querySelector("#confirmPassword");
let labelConfirmPassword = document.querySelector("#labelConfirmPassword");
let validConfirmPassword = false;

let msgError = document.querySelector("#msgError");
let msgSuccess = document.querySelector("#msgSuccess");

formCadastro.addEventListener("submit", cadastrado);

emailUser.addEventListener("keyup", () => {
  if (emailUser.value.length <= 5) {
    labelEmailUser.setAttribute("style", "color: red");
    labelEmailUser.innerHTML = "Email mínino 6 caracteres ";
    emailUser.setAttribute("style", "outline-color: red");
    validEmail = false;
  } else {
    emailUser.setAttribute("style", "outline-color: green");
    labelEmailUser.setAttribute("style", "color: green");
    labelEmailUser.innerHTML = "Email";
    validEmail = true;
  }
});

passwordUser.addEventListener("keyup", () => {
  if (passwordUser.value.length <= 5) {
    passwordUser.setAttribute("style", "outline-color: red");
    labelPasswordUser.setAttribute("style", "color: red");
    labelPasswordUser.innerHTML = "Mínimo 6 caracteres";
    validPassword = false;
  } else {
    passwordUser.setAttribute("style", "outline-color: green");
    labelPasswordUser.setAttribute("style", "color: green");
    labelPasswordUser.innerHTML = "Senha";
    validPassword = true;
  }
});

confirmPassword.addEventListener("keyup", () => {
  if (passwordUser.value != confirmPassword.value) {
    confirmPassword.setAttribute("style", "outline-color: red");
    labelConfirmPassword.setAttribute("style", "color: red");
    labelConfirmPassword.innerHTML = "As senhas não conferem";
    validConfirmPassword = false;
  } else {
    confirmPassword.setAttribute("style", "outline-color: green");
    labelConfirmPassword.setAttribute("style", "color: green");
    labelConfirmPassword.innerHTML = "Confirmar senha";

    validConfirmPassword = true;
  }
});

function cadastrado(e) {
  e.preventDefault();
  let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");
  const userExistente = listaUser.some(
    (user) => emailUser.value === user.emailCad
  );

  if (userExistente) {
    labelEmailUser.setAttribute("style", "color: red");
    labelEmailUser.innerHTML = "Email já cadastrado";
    emailUser.setAttribute("style", "outline-color: red");
    validEmail = false;
    return;
  }

  if (validEmail && validPassword && validConfirmPassword) {
    let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");

    listaUser.push({
      emailCad: emailUser.value,
      passwordCad: passwordUser.value,
    });

    localStorage.setItem("listaUser", JSON.stringify(listaUser));

    msgSuccess.setAttribute("style", "display: block");
    msgSuccess.innerHTML = "<strong>Cadastrando usuário...</strong>";
    msgError.innerHTML = "";
    msgError.setAttribute("style", "display: none");

    setTimeout(() => {
      document.location.href = "./index.html";
    }, 3000);
  } else {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML =
      "<strong>Preencha todos os campos corretamente</strong>";
    msgSuccess.innerHTML = "";
    msgSuccess.setAttribute("style", "display: none");
  }
}
