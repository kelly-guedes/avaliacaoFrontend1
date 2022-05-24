const userLogado = JSON.parse(localStorage.getItem("userLogado") || "[]");

let deveEditar = false;
let indiceEdicao = 0;

const form = document.querySelector("#infos_recados");
const corpoRecados = document.querySelector("#tbody");
const recuperarLocalStorage = () => {
  const recados = JSON.parse(localStorage.getItem(userLogado.user) || "[]");
  return recados;
};

const salvarLembrete = (event) => {
  event.preventDefault();
  const lembrete = form.lembrete.value;
  const detalhamento = form.detalhamento.value;
  const recados = recuperarLocalStorage();
  if (deveEditar === true) {
    alert("Editando recado");
    recados[indiceEdicao].lembrete = lembrete;
    recados[indiceEdicao].detalhamento = detalhamento;
    deveEditar = false;
  } else {
    recados.push({
      id: definirID(),
      lembrete,
      detalhamento,
    });

    alert("Lembrete adicionado com sucesso!");
  }
  localStorage.setItem(userLogado.user, JSON.stringify(recados));
  form.lembrete.value = "";
  form.detalhamento.value = "";
  preencherTabela();
};

const preencherTabela = () => {
  const recados = recuperarLocalStorage();
  corpoRecados.innerHTML = "";
  for (const recado of recados) {
    corpoRecados.innerHTML += `
<tr>
     
     <td> ${recado.id}</td>
     <td> ${recado.lembrete}</td>
     <td> ${recado.detalhamento}</td>
     <td> 
     <img src="./images/delet.svg" alt="lixeira" class="imgs" onclick="apagarRecado(${recado.id})" />
     <img src="./images/edit.svg" alt="lixeira" class="imgs" onclick="editarRecado(${recado.id})"/>
     </td>
</tr>
     `;
  }
};

const apagarRecado = (id) => {
  const recados = recuperarLocalStorage();

  const indice = recados.findIndex((rec) => {
    return rec.id === id;
  });

  recados.splice(indice, 1);
  localStorage.setItem(userLogado.user, JSON.stringify(recados));
  preencherTabela();
};

const editarRecado = (id) => {
  const recados = recuperarLocalStorage();
  const indice = recados.findIndex((rec) => rec.id === id);
  const recado = recados[indice];
  form.lembrete.value = recado.lembrete;
  form.detalhamento.value = recado.detalhamento;
  deveEditar = true;
  indiceEdicao = indice;
};

const definirID = () => {
  let max = 0;
  const recados = recuperarLocalStorage();
  recados.forEach((recado) => {
    if (recado.id > max) max = recado.id;
  });
  return max + 1;
};

if (localStorage.getItem("userLogado") == null) {
  alert("Você precisa estar logado para acessar esta página");
  document.location.href = "./index.html";
}

function sairSistema() {
  localStorage.removeItem("userLogado");
  document.location.href = "./index.html";
}

form.addEventListener("submit", salvarLembrete);
document.addEventListener("DOMContentLoaded", preencherTabela);
