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

const form = document.getElementById("form-equipamento");
const checkboxes = {
  lp: document.getElementById('check_lp'),
  pm: document.getElementById('check_pm'),
  ultra: document.getElementById('check_ultra'),
  visu: document.getElementById('check_visu'),
  dureza: document.getElementById('check_dureza')
};

function gerarID() {
  return Math.random().toString(36).substring(2, 10); // ID simples
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const equipamento = {};

  if (checkboxes.lp.checked) {
    const nome = document.getElementById("lp_nome").value.trim();
    const certificado = document.getElementById("lp_certificado").value.trim();
    const eqpID = document.getElementById("lp_eqpid").value.trim();
    if (nome && certificado && eqpID) {
      equipamento.LP = { ID: gerarID(), eqpID, nome, certificado };
    }
  }


  if (checkboxes.pm.checked) {
    const nome = document.getElementById("pm_nome").value.trim();
    const certificado = document.getElementById("pm_certificado").value.trim();
    const eqpID = document.getElementById("pm_eqpid").value.trim();
    if (nome && certificado && eqpID) {
      const id = gerarID();
      equipamento.PM = { ID: gerarID(), eqpID, nome, certificado };
    }
  }

  if (checkboxes.ultra.checked) {
    const nome = document.getElementById("ultra_nome").value.trim();
    const certificado = document.getElementById("ultra_certificado").value.trim();
    const eqpID = document.getElementById("ultra_eqpid").value.trim();
    if (nome && certificado && eqpID) {
      const id = gerarID();
      equipamento.Ultrassom = { ID: gerarID(), eqpID, nome, certificado };
    }
  }

  if (checkboxes.visu.checked) {
    const nome = document.getElementById("visu_nome").value.trim();
    const certificado = document.getElementById("visu_certificado").value.trim();
    const eqpID = document.getElementById("visu_eqpid").value.trim();
    if (nome && certificado && eqpID) {
      const id = gerarID();
      equipamento.Vizual = { ID: gerarID(), eqpID, nome, certificado };
    }
  }

  if (checkboxes.dureza.checked) {
    const nome = document.getElementById("dureza_nome").value.trim();
    const certificado = document.getElementById("dureza_certificado").value.trim();
    const numero_serie = document.getElementById("dureza_numero_serie").value.trim();
    const validade = document.getElementById("dureza_validade").value.trim();
    const eqpID = document.getElementById("dureza_eqpid").value.trim();


    if (nome && certificado && numero_serie && validade) {
      const id = gerarID();
      equipamento.dureza = {
        ID: id,
        eqpID,
        nome,
        certificado,
        numero_serie,
        validade
      };
    }
  }

  if (Object.keys(equipamento).length === 0) {
    alert("Selecione e preencha ao menos um tipo de equipamento.");
    return;
  }

  try {
    await addDoc(collection(db, "Equipamentos"), equipamento);
    alert("Equipamento(s) salvo(s) com sucesso!");
    form.reset();
    Object.values(blocos).forEach(b => b.style.display = "none");
  } catch (err) {
    console.error("Erro ao salvar:", err);
    alert("Erro ao salvar no Firestore.");
  }
});

// Mostrar ou ocultar blocos com base nos checkboxes
const blocos = {
  lp: document.getElementById('bloco-lp'),
  pm: document.getElementById('bloco-pm'),
  ultra: document.getElementById('bloco-ultrassom'),
  visu: document.getElementById('bloco-vizual'),
  dureza: document.getElementById('bloco-dureza')
};

Object.keys(checkboxes).forEach(tipo => {
  checkboxes[tipo].addEventListener('change', () => {
    blocos[tipo].style.display = checkboxes[tipo].checked ? 'block' : 'none';
  });
});
