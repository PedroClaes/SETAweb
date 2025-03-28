import { handleIdentificationSelection } from '/js/solicitacao/addTextbox.js';
import { toggleMenu } from '/js/solicitacao/toggleMenu.js';

document.addEventListener("DOMContentLoaded", () => {
  handleIdentificationSelection();

  const menuToggleButton = document.querySelector(".menuToogle");

  if (menuToggleButton) {
    menuToggleButton.addEventListener("click", toggleMenu);
  }
});
