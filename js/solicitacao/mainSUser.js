import { displayRequests } from "./check_adm.js";
import { checkUser } from "./userS.js";
import {getFiltrosSelecionados} from"./filtroS.js"

document.addEventListener("DOMContentLoaded", async () => {

  const container = document.getElementById("SolicitacoesContainer");
  if (!container) {
    console.error("Elemento SolicitacoesContainer não encontrado.");
    return;
  }

  try {
    // Reseta o html
    container.innerHTML += "";

    await displayRequests(); // tenta carregar com displayRequests

    // Verifica se deu certo pela presença de elementos no container
    if (container.innerHTML.trim() === "" || container.innerHTML.includes("Nenhuma solicitação")) {
      console.warn("displayRequests não trouxe resultados. Executando checkUser como fallback.");
      await checkUser();
    }

  } catch (err) {
    console.error("Erro em displayRequests. Executando checkUser:", err);
    await checkUser();
  }
});

document.getElementById("searchInput").addEventListener("input", (event) => {
  const value = formatString(event.target.value);
  const items = document.querySelectorAll(".request-item");
  const noResults = document.getElementById("no_result");

  let hasResults = false;

  items.forEach(item => {
    const idSolicitacao = formatString(item.dataset.id_solicitacao || "");

    if (idSolicitacao.includes(value)) {
      item.style.display = "";
      hasResults = true;
    } else {
      item.style.display = "none";
    }
  });

  noResults.style.display = hasResults ? "none" : "block";
});

function formatString(value) {
  return value.toLowerCase().trim();
}

document.getElementById('toggleFiltro').addEventListener('click', function() {
  const painel = document.getElementById('painelFiltro');
  painel.classList.toggle('aberto');

});

document.addEventListener("DOMContentLoaded", async () => {
  await displayRequests();

  const filtros = document.querySelectorAll("#painelFiltro input[type='checkbox'], #painelFiltro input[type='radio']");
  filtros.forEach(filtro => {
    filtro.addEventListener("change", getFiltrosSelecionados);
  });
});
