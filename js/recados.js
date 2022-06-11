const form = document.querySelector("#infos_recados");
const corpoRecados = document.querySelector("#tbody");

const userLogado = JSON.parse(localStorage.getItem("userLogado") || "[]");

let deveEditar = false;
let indiceEdicao = 0;

if (!localStorage.getItem("userLogado")) {
  alert("Você precisa estar logado para acessar esta página");
  document.location.href = "./index.html";
}

const recuperarLocalStorage = () => {
  const recados = JSON.parse(localStorage.getItem(userLogado.emailCad) || "[]");
  return recados;
};

const salvarLembrete = (event) => {
  event.preventDefault();

  const lembrete = form.lembrete.value;
  const detalhamento = form.detalhamento.value;

  const recados = recuperarLocalStorage();

  if (deveEditar) {
    recados[indiceEdicao].lembrete = lembrete;
    recados[indiceEdicao].detalhamento = detalhamento;
    deveEditar = false;
    alert("Recado editado com sucesso!");
  } else {
    recados.push({
      id: definirID(),
      lembrete,
      detalhamento,
    });

    alert("Lembrete adicionado com sucesso!");
  }

  localStorage.setItem(userLogado.emailCad, JSON.stringify(recados));

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
  localStorage.setItem(userLogado.emailCad, JSON.stringify(recados));
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

function sairSistema() {
  localStorage.removeItem("userLogado");
  document.location.href = "./index.html";
}

form.addEventListener("submit", salvarLembrete);
document.addEventListener("DOMContentLoaded", preencherTabela);
