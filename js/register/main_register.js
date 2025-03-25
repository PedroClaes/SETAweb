import { applyCPFCNPJMask } from "./masks.js";
import { validateForm } from "./validation.js";

const cpfCnpjInput = document.getElementById("cpf_cnpj");
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cadastro_form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário se houver erros

    if (validateForm()) {
      console.log("Todos os dados são válidos. Enviando...");
      // Aqui você pode adicionar a lógica para enviar os dados ao Firebase
    } else {
      console.log("Há erros no formulário. Corrija antes de enviar.");
    }
  });

  if (cpfCnpjInput) {
    applyCPFCNPJMask(cpfCnpjInput);
  }
});
