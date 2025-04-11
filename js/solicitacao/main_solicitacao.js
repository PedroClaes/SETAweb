import { handleIdentificationSelection } from '/js/solicitacao/addTextbox.js';
import { toggleMenu } from '/js/solicitacao/toggleMenu.js';
import "./addArchives.js"
import "./sendingSolicitation.js"

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
