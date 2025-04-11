import { applyCPFCNPJMask } from "./masks.js";
import { validateForm } from "./validation.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js"

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
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cadastro_form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o envio do formulário se houver erros

    if (validateForm()) {
      console.log("Todos os dados são válidos. Registrando usuário...");

      try {
        // Criando usuário no Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
        const user = userCredential.user; // Pegando os dados do usuário autenticado

        console.log("Usuário autenticado com sucesso: ", user);

        // Adicionando os dados do usuário ao Firestore
        await setDoc(doc(db, "Usuarios", user.uid), {
          cpf_cnpj: cpfCnpjInput.value,
          admin: false,
          codigo_inspetor: null,
          email: emailInput.value,
          id_solicitacoes: {},
          nome_completo: nameInput.value
        });

        alert("Usuário cadastrado com sucesso!");
        window.location.href = "../pages/login.html"; // Redirecionando após o cadastro

      } catch (error) {
        console.error("Erro ao cadastrar usuário: ", error);

        // Verifica se o erro é de e-mail já cadastrado
        if (error.code === "auth/email-already-in-use") {
          alert("Este e-mail já está em uso. Tente outro ou faça login.");
          window.location.href = "../pages/login.html";
        } else {
          alert(`Erro ao cadastrar: ${error.message}`);
        }
      }
    } else {
      console.log("Há erros no formulário. Corrija antes de enviar.");
    }
  });

  if (cpfCnpjInput) {
    applyCPFCNPJMask(cpfCnpjInput);
  }
});
