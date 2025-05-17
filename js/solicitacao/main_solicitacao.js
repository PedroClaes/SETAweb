
import { handleIdentificationSelection } from '/js/solicitacao/addTextbox.js';
import { toggleMenu } from '/js/solicitacao/toggleMenu.js';
import "./addArchives.js"
import "./sendingSolicitation.js"
import "../relatorios/dureza_relatorio/add_register_dureza.js"



document.addEventListener("DOMContentLoaded", () => {
  handleIdentificationSelection();

  // Ajuste para a classe correta "menu-toggle"
  const menuToggleButton = document.querySelector(".menu-toggle");

  if (menuToggleButton) {
    menuToggleButton.addEventListener("click", toggleMenu);
  }

  document.getElementById("limparCampos").addEventListener("click", function () {
    document.getElementById("traceabilityForm").reset();
  });
});

//navBar
document.getElementById("navSolic").addEventListener("click", () => {
  window.location.href = "solicitacoesUSER.html";
});

document.getElementById("navDocs").addEventListener("click", () => {
  window.location.href = "documentos.html";
});

document.getElementById("navEqup").addEventListener("click", () => {
  window.location.href = "equipamentos.html";
});

document.getElementById("navProd").addEventListener("click", () => {
  window.location.href = "produtos.html";
});

document.querySelector(".request-test-btn").addEventListener("click", () => {
  window.location.href = "solicitacoes.html";
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCBnaKnOE7Ba8Bi-KBbK876TFJwRNtb1X0",
  authDomain: "setaweb-ed47c.firebaseapp.com",
  projectId: "setaweb-ed47c",
  storageBucket: "setaweb-ed47c.firebasestorage.app",
  messagingSenderId: "922588992383",
  appId: "1:922588992383:web:48ea0dd8c55f99b1a7804a",
  measurementId: "G-SXMK5Y8BQS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let usuarioLogado = null;

onAuthStateChanged(auth, user => {
  if (!user) {
    alert("Você precisa estar logado.");
    return;
  }
  usuarioLogado = user;
});

// Função para configurar seleção de equipamentos usando botões já existentes no HTML
function configurarSelecaoEquipamentos(mapName, botaoSelecionarId, containerId, tabelaId) {
  const btnSelecionar = document.getElementById(botaoSelecionarId);
  const container = document.getElementById(containerId);
  if (!btnSelecionar || !container) return;

  const select = document.getElementById(`equipamentoSelect-${mapName}`);
  const confirmar = container.querySelector("button"); // botão confirmar dentro do container

  btnSelecionar.addEventListener("click", async () => {
    container.style.display = container.style.display === "none" ? "block" : "none";
    select.innerHTML = `<option value="">Carregando equipamentos...</option>`;

    const user = auth.currentUser;
    if (!user) return;

    try {
      const userDoc = await getDoc(doc(db, "Usuarios", user.uid));
      const equipamentoIds = userDoc.exists() ? userDoc.data().equipamentos || [] : [];

      const equipamentos = [];
      for (const id of equipamentoIds) {
        const docRef = await getDoc(doc(db, "Equipamentos", id));
        if (docRef.exists()) {
          const dados = docRef.data();
          if (dados[mapName]) {
            equipamentos.push({ id, ...dados[mapName] });
          }
        } else {
          console.warn(`Equipamento com ID '${id}' não encontrado.`);
        }
      }

      if (equipamentos.length === 0) {
        select.innerHTML = `<option value="">Nenhum equipamento do tipo ${mapName} encontrado.</option>`;
      } else {
        select.innerHTML = equipamentos
          .map((eq, i) => `<option value="${i}">${eq.nome || "Sem nome"} - ${eq.numeroSerie || ""}</option>`)
          .join("");
        select.dataset.equipamentos = JSON.stringify(equipamentos);
      }
    } catch (e) {
      console.error("Erro ao buscar equipamentos:", e);
      select.innerHTML = `<option value="">Erro ao carregar equipamentos.</option>`;
    }
  });

  confirmar.addEventListener("click", () => {
    const index = select.value;
    const equipamentos = JSON.parse(select.dataset.equipamentos || "[]");
    if (index === "" || !equipamentos[index]) return;

    const equipamento = equipamentos[index];
    const tabela = document.getElementById(tabelaId).querySelector("tbody");

    const row = tabela.insertRow();

    if (mapName === "dureza") {
      row.innerHTML = `
        <td>${equipamento.nome || ""}</td>
        <td>${equipamento.numero_serie || ""}</td>
        <td>${equipamento.eqpID || equipamento.id || ""}</td>
        <td>${equipamento.validade || ""}</td>
        <td>${equipamento.certificado || ""}</td>
        <td><button class="removeBtn">Remover</button></td>
      `;
    } else {
      row.innerHTML = `
        <td>${equipamento.nome || ""}</td>
        <td>${equipamento.certificado || ""}</td>
        <td>${equipamento.eqpID || equipamento.id || ""}</td>
        <td><button class="removeBtn">Remover</button></td>
      `;
    }

    row.querySelector(".removeBtn").addEventListener("click", () => {
      row.remove();
    });

    select.value = "";
    container.style.display = "none";
  });
}

// Agora passe os 4 parâmetros: nome do mapa, id do botão "Selecionar Equipamento Cadastrado" do HTML, id do container do select, id da tabela
configurarSelecaoEquipamentos("dureza", "selecionarEquipamentoDureza", "equipSelectContainerDureza", "equipamentoTableDureza");
configurarSelecaoEquipamentos("LP", "selecionarEquipamentoLp", "equipSelectContainerLp", "equipamentoTableLp");
configurarSelecaoEquipamentos("PM", "selecionarEquipamentoPm", "equipSelectContainerPm", "equipamentoTablePm");
configurarSelecaoEquipamentos("Ultrassom", "selecionarEquipamentoUltrassom", "equipSelectContainerUltrassom", "equipamentoTableUltrassom");
configurarSelecaoEquipamentos("Vizual", "selecionarEquipamentoVisual", "equipSelectContainerVisual", "equipamentoTableVisual");


onAuthStateChanged(auth, user => {
  if (!user) {
    alert("Você precisa estar logado.");
    return;
  }
  usuarioLogado = user;
  configurarSelecaoProdutos("btnSelecionarProdutoLp", "produtoTableLp");
});

// Configura a seleção de produtos cadastrados
function configurarSelecaoProdutos(botaoId, tabelaId) {
  const botao = document.getElementById(botaoId);
  if (!botao) return;

  const container = document.createElement("div");
  container.style.display = "none";
  container.style.marginTop = "10px";

  const label = document.createElement("label");
  label.textContent = "Selecionar produto:";
  const select = document.createElement("select");
  select.innerHTML = `<option value="">Carregando produtos...</option>`;

  const confirmar = document.createElement("button");
  confirmar.type = "button";
  confirmar.textContent = "Confirmar";

  container.appendChild(label);
  container.appendChild(select);
  container.appendChild(confirmar);

  botao.parentNode.insertBefore(container, botao.nextSibling);

  botao.addEventListener("click", async () => {
    container.style.display = container.style.display === "none" ? "block" : "none";
    select.innerHTML = `<option value="">Carregando produtos...</option>`;

    const user = auth.currentUser;
    if (!user) return;

    try {
      const userDoc = await getDoc(doc(db, "Usuarios", user.uid));
      const produtoIds = userDoc.exists() ? userDoc.data().id_produtos || [] : [];

      const produtos = [];

      for (const id of produtoIds) {
        const docRef = await getDoc(doc(db, "Produtos", id));
        if (!docRef.exists()) continue;
        const data = docRef.data();

        ["penetrantes", "removedores", "solventes"].forEach(categoria => {
          if (data[categoria]) {
            produtos.push({ id, categoria, ...data[categoria] });
          }
        });
      }

      if (produtos.length === 0) {
        select.innerHTML = `<option value="">Nenhum produto encontrado.</option>`;
      } else {
        select.innerHTML = produtos.map((p, i) => {
          return `<option value="${i}">${p.categoria} - ${p.codigo || "Sem código"} - ${p.fabricante || ""}</option>`;
        }).join("");
        select.dataset.produtos = JSON.stringify(produtos);
      }

    } catch (e) {
      console.error("Erro ao buscar produtos:", e);
      select.innerHTML = `<option value="">Erro ao carregar produtos.</option>`;
    }
  });

  confirmar.addEventListener("click", () => {
    const index = select.value;
    const produtos = JSON.parse(select.dataset.produtos || "[]");
    if (index === "" || !produtos[index]) return;

    const produto = produtos[index];
    const tabela = document.getElementById(tabelaId).querySelector("tbody");
    const row = tabela.insertRow();

    row.innerHTML = `
      <td>${produto.categoria}</td>
      <td>${produto.codigo || ""}</td>
      <td>${produto.fabricante || ""}</td>
      <td>${produto.lote || ""}</td>
      <td>${produto.validade || ""}</td>
      <td><button class="removeBtn">Remover</button></td>
    `;

    row.querySelector(".removeBtn").addEventListener("click", () => row.remove());

    select.value = "";
    container.style.display = "none";
  });
}

onAuthStateChanged(auth, user => {
  if (!user) {
    alert("Você precisa estar logado.");
    return;
  }
  usuarioLogado = user;

  configurarSelecaoProdutosPm("btnSelecionarProdutoPm", "produtoTablePm");
});

function configurarSelecaoProdutosPm(botaoId, tabelaId) {
  const botao = document.getElementById(botaoId);
  if (!botao) return;

  const container = document.createElement("div");
  container.style.display = "none";
  container.style.marginTop = "10px";

  const label = document.createElement("label");
  label.textContent = "Selecionar produto:";
  const select = document.createElement("select");
  select.innerHTML = `<option value="">Carregando produtos...</option>`;

  const confirmar = document.createElement("button");
  confirmar.type = "button";
  confirmar.textContent = "Confirmar";

  container.appendChild(label);
  container.appendChild(select);
  container.appendChild(confirmar);

  botao.parentNode.insertBefore(container, botao.nextSibling);

  botao.addEventListener("click", async () => {
    container.style.display = container.style.display === "none" ? "block" : "none";
    select.innerHTML = `<option value="">Carregando produtos...</option>`;

    const user = auth.currentUser;
    if (!user) return;

    try {
      const userDoc = await getDoc(doc(db, "Usuarios", user.uid));
      const produtoIds = userDoc.exists() ? userDoc.data().id_produtos || [] : [];

      const produtosPm = [];

      for (const id of produtoIds) {
        const docRef = await getDoc(doc(db, "Produtos", id));
        if (!docRef.exists()) continue;
        const data = docRef.data();

        ["penetrantes", "removedores", "solventes"].forEach(categoria => {
          if (data[categoria]) {
            produtosPm.push({ id, categoria, ...data[categoria] });
          }
        });
      }

      if (produtosPm.length === 0) {
        select.innerHTML = `<option value="">Nenhum produto encontrado.</option>`;
      } else {
        select.innerHTML = produtosPm.map((p, i) => {
          return `<option value="${i}">${p.categoria} - ${p.codigo || "Sem código"} - ${p.fabricante || ""}</option>`;
        }).join("");
        select.dataset.produtosPm = JSON.stringify(produtosPm);
      }

    } catch (e) {
      console.error("Erro ao buscar produtos PM:", e);
      select.innerHTML = `<option value="">Erro ao carregar produtos.</option>`;
    }
  });

  confirmar.addEventListener("click", () => {
    const index = select.value;
    const produtosPm = JSON.parse(select.dataset.produtosPm || "[]");
    if (index === "" || !produtosPm[index]) return;

    const produto = produtosPm[index];
    const tabela = document.getElementById(tabelaId).querySelector("tbody");
    const row = tabela.insertRow();

    row.innerHTML = `
      <td>${produto.categoria}</td>
      <td>${produto.codigo || ""}</td>
      <td>${produto.fabricante || ""}</td>
      <td>${produto.lote || ""}</td>
      <td>${produto.validade || ""}</td>
      <td><button class="removeBtn">Remover</button></td>
    `;

    row.querySelector(".removeBtn").addEventListener("click", () => row.remove());

    select.value = "";
    container.style.display = "none";
  });
}

