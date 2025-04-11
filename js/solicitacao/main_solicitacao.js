import { handleIdentificationSelection } from '/js/solicitacao/addTextbox.js';
import { toggleMenu } from '/js/solicitacao/toggleMenu.js';
import { displayRequests } from '../solicitacao/check_adm.js';




document.addEventListener("DOMContentLoaded", () => {
  handleIdentificationSelection();

  // Ajuste para a classe correta "menu-toggle"
  const menuToggleButton = document.querySelector(".menu-toggle");
  if (menuToggleButton) {
    menuToggleButton.addEventListener("click", toggleMenu);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  handleIdentificationSelection();
  displayRequests(); // <- chama aqui para mostrar as solicitações
});
