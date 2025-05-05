import { displayRequests } from "./check_adm.js";
import { checkUser } from "./userS.js";

document.addEventListener("DOMContentLoaded", async () => {

  const container = document.getElementById("SolicitacoesContainer");
  if (!container) {
    console.error("Elemento SolicitacoesContainer não encontrado.");
    return;
  }

  try {
    container.innerHTML += "";

    await displayRequests();


    window.originalRequestItems = Array.from(document.querySelectorAll(".request-item"));

    configurarFiltros();

    if (container.innerHTML.trim() === "" || container.innerHTML.includes("Nenhuma solicitação")) {
      console.warn("displayRequests não trouxe resultados. Executando checkUser como fallback.");
      await checkUser();
    }

  } catch (err) {
    console.error("Erro em displayRequests. Executando checkUser:", err);
    await checkUser();
  }
});

document.getElementById("toggleFiltro").addEventListener("click", () => {
  const painel = document.getElementById("painelFiltro");
  painel.style.display = painel.style.display === "none" ? "block" : "none";
});

// Filtro de busca por ID
document.getElementById("searchInput").addEventListener("input", (event) => {
  aplicarFiltros();
});

function formatString(value) {
  return value.toLowerCase().trim();
}

function aplicarFiltros() {
  const selectedTipos = Array.from(document.querySelectorAll(".filter.tipo-inspecao"))
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

  const selectedStatus = Array.from(document.querySelectorAll(".filter.status"))
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

  const ordemCrescente = document.getElementById("dataCrescente")?.checked || false;
  const ordemDecrescente = document.getElementById("dataDecrescente")?.checked || false;

  const searchValue = formatString(document.getElementById("searchInput")?.value || "");

  const allItems = window.originalRequestItems || [];
  const container = document.getElementById("SolicitacoesContainer");
  const noResults = document.getElementById("no_result");



  let resultadosFiltrados = allItems.filter(item => {
    const id = (item.dataset.id_solicitacao || "").toLowerCase();
    const tipoTexto = item.getAttribute("data-tipo_inspecao") || "";
    const tipoArray = tipoTexto.toLowerCase().split(",").map(t => t.trim());
    const status = (item.getAttribute("data-status") || "").toLowerCase().trim();

    const tipoValido = selectedTipos.length === 0 || selectedTipos.some(filtro =>
      tipoArray.includes(filtro)
    );

    const statusValido = selectedStatus.length === 0 || selectedStatus.includes(status);
    const textoValido = id.includes(searchValue);

    console.log("selectedTipos", selectedTipos);
    console.log("data-tipo_inspecao", tipoTexto);

    return tipoValido && statusValido && textoValido;
  });

  // 📅 Ordenação por data
  if (ordemCrescente || ordemDecrescente) {
    resultadosFiltrados.sort((a, b) => {
      const dataA = parseInt(a.getAttribute("data-timestamp") || "0", 10);
      const dataB = parseInt(b.getAttribute("data-timestamp") || "0", 10);
      return ordemCrescente ? dataA - dataB : dataB - dataA;
    });
  }



  // Atualiza o container
  container.innerHTML = "";

  if (resultadosFiltrados.length > 0) {
    resultadosFiltrados.forEach(item => container.appendChild(item));
    if (noResults) noResults.style.display = "none";
  } else {
    if (noResults) noResults.style.display = "block";
  }
}

// 🧩 Configura listeners para os filtros
function configurarFiltros() {
  document.querySelectorAll(".filter.tipo-inspecao, .filter.status")
    .forEach(cb => cb.addEventListener("change", aplicarFiltros));

  document.getElementById("dataCrescente")?.addEventListener("change", aplicarFiltros);
  document.getElementById("dataDecrescente")?.addEventListener("change", aplicarFiltros);
}

// Botão de exibir painel de filtros
document.getElementById('toggleFiltro').addEventListener('click', function() {
  const painel = document.getElementById('painelFiltro');
  painel.classList.toggle('aberto');
});
