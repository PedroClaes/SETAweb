import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Configuração do Firebase (substitua com as informações do seu projeto)
const firebaseConfig = {
  apiKey: "AIzaSyCBnaKnOE7Ba8Bi-KBbK876TFJwRNtb1X0",
  authDomain: "setaweb-ed47c.firebaseapp.com",
  projectId: "setaweb-ed47c",
  storageBucket: "setaweb-ed47c.firebasestorage.app",
  messagingSenderId: "922588992383",
  appId: "1:922588992383:web:48ea0dd8c55f99b1a7804a",
  measurementId: "G-SXMK5Y8BQS"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firebase Authentication
const auth = getAuth(app);

// Variável global para armazenar o usuário autenticado
let currentUser = null;

// Função de login
const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Usuário autenticado com sucesso
      const user = userCredential.user;
      console.log("Usuário logado:", user);
      // Redirecionamento ou qualquer outra lógica após login bem-sucedido
      window.location.href = "../index.html"; // Redireciona para a página principal ou outra página após login
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Erro: ${errorCode}, ${errorMessage}`);
      alert("E-mail ou senha inválidos. Tente novamente."); // Mensagem de erro
    });
};

// Verificação do estado de autenticação
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Usuário está autenticado
    console.log("Usuário autenticado:", user.uid);
  } else {
    // Usuário não está autenticado
    currentUser = null;
    console.log("Usuário não autenticado");
  }
});

// Função chamada quando o botão de login é clicado
const loginButton = document.querySelector(".enterBTN"); // Seleciona o botão de login

loginButton.addEventListener("click", (event) => {
  event.preventDefault(); // Impede o comportamento padrão do botão

  // Captura os valores dos campos de email e senha
  const email = document.getElementById("inemailtxt").value;
  const password = document.getElementById("insenhatxt").value;

  // Verifica se os campos de email e senha não estão vazios antes de tentar fazer login
  if (email && password) {
    login(email, password); // Chama a função de login
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});
