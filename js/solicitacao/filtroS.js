const toggleBtn = document.getElementById("toggleFiltro");
const painel = document.getElementById("painelFiltro");

toggleBtn.addEventListener("click", () => {
  painel.style.display = painel.style.display === "block" ? "none" : "block";
});

// Exemplo de como acessar os valores:
function getFiltrosSelecionados() {
  return {
    tipo_inspecao: {
      visual: document.getElementById("filtroVizual").checked,
      dureza: document.getElementById("filtroDureza").checked,
      lp: document.getElementById("filtroLP").checked,
      pm: document.getElementById("filtroPM").checked,
      ultrassom: document.getElementById("filtroUltrassom").checked
    },
    data_ordem: document.getElementById("dataCrescente").checked
      ? "crescente"
      : document.getElementById("dataDecrescente").checked
        ? "decrescente"
        : null,
    status: {
      concluido: document.getElementById("filtroConcluido").checked,
      pendente: document.getElementById("filtroPendente").checked,
      cancelado: document.getElementById("filtroCancelado").checked
    }
  };
}

export {getFiltrosSelecionados}
