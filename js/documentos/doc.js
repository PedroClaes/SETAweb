import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCBnaKnOE7Ba8Bi-KBbK876TFJwRNtb1X0",
  authDomain: "setaweb-ed47c.firebaseapp.com",
  projectId: "setaweb-ed47c",
  storageBucket: "setaweb-ed47c.firebasestorage.app",
  messagingSenderId: "922588992383",
  appId: "1:922588992383:web:48ea0dd8c55f99b1a7804a",
  measurementId: "G-SXMK5Y8BQS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const form = document.getElementById('form-documento');

onAuthStateChanged(auth, (user) => {
  if (user) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const faixa_dureza = document.getElementById('faixa_dureza').value.trim();
      const nome_ref = document.getElementById('nome_ref').value.trim();
      const procedimento = document.getElementById('procedimento').value.trim();

      try {
        // Cria o novo documento
        const docRef = await addDoc(collection(db, 'Documentos'), {
          faixa_dureza,
          nome_ref,
          procedimento,
          criadoPor: user.uid,
          criadoEm: new Date()
        });

        // Atualiza o documento do usuário com o ID do novo documento
        const usuarioRef = doc(db, "Usuarios", user.uid);
        await updateDoc(usuarioRef, {
          id_documentos: arrayUnion(docRef.id)
        });

        alert("Documento criado com sucesso!");
        form.reset();
      } catch (error) {
        console.error("Erro ao criar documento:", error);
        alert("Erro ao criar documento. Veja o console.");
      }
    });
  } else {
    alert("Você precisa estar logado para cadastrar documentos.");
    window.location.href = "login.html";
  }
});

//navBar
document.getElementById("navSolic").addEventListener("click", () => {
  window.location.href = "solicitacoesUSER.html";
});

document.getElementById("navDocs").addEventListener("click", () => {
  window.location.href = "documentos.html";
});

document.getElementById("navEqup").addEventListener("click", () => {
  window.location.href = "equipamentos.html";
});

document.getElementById("navProd").addEventListener("click", () => {
  window.location.href = "produtos.html";
});

document.querySelector(".request-test-btn").addEventListener("click", () => {
  window.location.href = "solicitacoes.html";
});
