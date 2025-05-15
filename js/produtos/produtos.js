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

const form = document.getElementById("form-produto");

const checkboxes = {
  penetrante: document.getElementById('check_penetrante'),
  removedor: document.getElementById('check_removedor'),
  solvente: document.getElementById('check_solvente')
};

const blocos = {
  penetrante: document.getElementById('bloco-penetrante'),
  removedor: document.getElementById('bloco-removedor'),
  solvente: document.getElementById('bloco-solvente')
};

Object.keys(checkboxes).forEach(tipo => {
  checkboxes[tipo].addEventListener('change', () => {
    blocos[tipo].style.display = checkboxes[tipo].checked ? 'block' : 'none';
  });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const produto = {};

  if (checkboxes.penetrante.checked) {
    const fabricante = document.getElementById("penetrante_fabricante").value.trim();
    const lote = document.getElementById("penetrante_lote").value.trim();
    const penetrante = document.getElementById("penetrante_nome").value.trim();
    const validade = document.getElementById("penetrante_validade").value.trim();

    if (fabricante && lote && penetrante && validade) {
      produto.penetrantes = { fabricante, lote, penetrante, validade };
    }
  }

  if (checkboxes.removedor.checked) {
    const fabricante = document.getElementById("removedor_fabricante").value.trim();
    const lote = document.getElementById("removedor_lote").value.trim();
    const penetrante = document.getElementById("removedor_nome").value.trim();
    const validade = document.getElementById("removedor_validade").value.trim();

    if (fabricante && lote && penetrante && validade) {
      produto.removedores = { fabricante, lote, penetrante, validade };
    }
  }

  if (checkboxes.solvente.checked) {
    const fabricante = document.getElementById("solvente_fabricante").value.trim();
    const lote = document.getElementById("solvente_lote").value.trim();
    const penetrante = document.getElementById("solvente_nome").value.trim();
    const validade = document.getElementById("solvente_validade").value.trim();

    if (fabricante && lote && penetrante && validade) {
      produto.solventes = { fabricante, lote, penetrante, validade };
    }
  }

  if (Object.keys(produto).length === 0) {
    alert("Selecione e preencha ao menos um tipo de produto.");
    return;
  }

  try {
    await addDoc(collection(db, "Produtos"), produto);
    alert("Produto(s) cadastrado(s) com sucesso!");
    form.reset();
    Object.values(blocos).forEach(b => b.style.display = "none");
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
    alert("Erro ao salvar no Firestore.");
  }
});
