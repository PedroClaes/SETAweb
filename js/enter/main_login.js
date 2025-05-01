import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// 🔧 Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCBnaKnOE7Ba8Bi-KBbK876TFJwRNtb1X0",
  authDomain: "setaweb-ed47c.firebaseapp.com",
  projectId: "setaweb-ed47c",
  storageBucket: "setaweb-ed47c.appspot.com",
  messagingSenderId: "922588992383",
  appId: "1:922588992383:web:48ea0dd8c55f99b1a7804a",
  measurementId: "G-SXMK5Y8BQS"
};

// 🚀 Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🌐 Verifica se está na página de solicitações
const isOnSolicitacoesPage = window.location.pathname.includes("solicitacoes.html");

// 📦 Variável global com UID do usuário
let currentUser = null;

// 🔐 Login
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user && user.uid) {
      currentUser = user.uid;
      alert("Login bem-sucedido! UID:", currentUser);
      window.location.href = "../pages/solicitacoes.html";
    }
  } catch (error) {
    console.error("Erro de login:", error.code, error.message);
    alert("E-mail ou senha inválidos. Tente novamente.");
  }
};

// 👀 Observa mudanças no estado de autenticação
onAuthStateChanged(auth, (user) => {
  if (user && user.uid) {
    currentUser = user.uid;
    console.log("Usuário autenticado:", currentUser);

    if (!isOnSolicitacoesPage) {
      window.location.href = "../pages/solicitacoes.html";
    }
  } else {
    currentUser = null;
    console.log("Usuário não autenticado.");

    if (isOnSolicitacoesPage) {
      window.location.href = "../index.html";
    }
  }
});

// 🧠 Lógica do botão de login
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".enterBTN");

  if (loginButton) {
    loginButton.addEventListener("click", (event) => {
      event.preventDefault();

      const email = document.getElementById("inemailtxt").value.trim();
      const password = document.getElementById("insenhatxt").value;

      if (email && password) {
        login(email, password);
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    });
  }
});

export { currentUser };
