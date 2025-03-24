import { applyCPFCNPJMask } from "./masks.js";

document.addEventListener("DOMContentLoaded", function () {
  const cpfCnpjInput = document.getElementById("cpf_cnpj");

  if (cpfCnpjInput) {
    applyCPFCNPJMask(cpfCnpjInput);
  }
});
