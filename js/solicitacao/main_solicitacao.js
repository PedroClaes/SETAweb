import { handleIdentificationSelection } from '/js/solicitacao/addTextbox.js';
import { toggleMenu } from '/js/solicitacao/toggleMenu.js';

document.addEventListener("DOMContentLoaded", () => {
  handleIdentificationSelection();

  // Ajuste para a classe correta "menu-toggle"
  const menuToggleButton = document.querySelector(".menu-toggle");

  if (menuToggleButton) {
    menuToggleButton.addEventListener("click", toggleMenu);
  }
});
