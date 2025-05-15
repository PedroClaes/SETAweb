import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, addDoc }  from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Atualizado para refletir o novo ID do formulário
const form = document.getElementById('form-documento');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const faixa_dureza = document.getElementById('faixa_dureza').value.trim();
  const nome_ref = document.getElementById('nome_ref').value.trim();
  const procedimento = document.getElementById('procedimento').value.trim();

  try {
    await addDoc(collection(db, 'Documentos'), {
      faixa_dureza,
      nome_ref,
      procedimento
    });

    alert("Documento criado com sucesso!");
    form.reset();
  } catch (error) {
    console.error("Erro ao criar documento:", error);
    alert("Erro ao criar documento. Veja o console.");
  }
});
