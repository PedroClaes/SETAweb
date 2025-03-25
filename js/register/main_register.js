import { applyCPFCNPJMask } from "./masks.js";
import { validateForm } from "./validation.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const cpfCnpjInput = document.getElementById("cpf_cnpj");
const nameInput = document.getElementById("nome_completo");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("senha");

const firebaseConfig = {
  apiKey: "AIzaSyCBnaKnOE7Ba8Bi-KBbK876TFJwRNtb1X0",
  authDomain: "setaweb-ed47c.firebaseapp.com",
  projectId: "setaweb-ed47c",
  storageBucket: "setaweb-ed47c.firebasestorage.app",
  messagingSenderId: "922588992383",
  appId: "1:922588992383:web:48ea0dd8c55f99b1a7804a",
  measurementId: "G-SXMK5Y8BQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cadastro_form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário se houver erros

    if (validateForm()) {
      console.log("Todos os dados são válidos. Enviando...");

      // Aqui você pode adicionar a lógica para enviar os dados ao Firebase

      // Agora usamos a função "collection" para acessar a coleção e "addDoc" para adicionar um novo documento
      addDoc(collection(db, "Usuarios"), {
        cpf_cnpj: cpfCnpjInput.value,
        admin: false,
        codigo_inspetor: null,
        email: emailInput.value,
        id_solicitacoes: {},
        nome_completo: nameInput.value,
        senha: passwordInput.value
      }).then(() => {
        alert("Usuário adicionado com sucesso!");
      }).catch((error) => {
        console.error("Erro ao adicionar o usuário: ", error);
        alert("Erro ao adicionar o usuário.");
      });

    } else {
      console.log("Há erros no formulário. Corrija antes de enviar.");
    }
  });

  if (cpfCnpjInput) {
    applyCPFCNPJMask(cpfCnpjInput);
  }
});
