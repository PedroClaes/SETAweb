import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, arrayUnion, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { gerarIdSolicitacao } from "./gerarIdSolicitacao.js";

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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("traceabilityForm");
  const button = document.getElementById("sendingSolicitation");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Usuário está logado
      button.addEventListener("click", async () => {
        const getValue = (id) => document.getElementById(id)?.value || "";

        const description = getValue("description");
        const drawing = getValue("drawing");
        const cliente_final = getValue("cliente_final");
        const local = getValue("local");

        const material = getValue("material");
        const espessura_diametro = parseFloat(getValue("espessura_diametro")) || null;
        const comprimento = getValue("comprimento");
        const condicao_superficial = getValue("condicao_superficial");
        const tratamento = getValue("tratamento");
        const quantidade = parseInt(getValue("quantidade")) || null;
        const processo_fabricacao = getValue("processo_fabricacao");
        const fase_inspecao = getValue("fase_inspecao");

        const norma_referencia = getValue("norma_referencia");
        const procedimento = getValue("procedimento");
        const faixa_dureza = getValue("faixa_dureza");

        const identifications = {
          corrida: getValue("corrida"),
          pedido: getValue("pedido"),
          op: getValue("op"),
          os: getValue("os"),
          po: getValue("po"),
          pn: getValue("pn"),
          ns: getValue("ns"),
          sn: getValue("sn"),
          orden: getValue("orden"),
          order: getValue("order")
        };

        const ensaios = [
          { id: "ensaio_dureza_checkbox", nome: "Ensaio de Dureza" },
          { id: "inspecao_visual_checkbox", nome: "Inspeção Visual" },
          { id: "relatorio_lp_checkbox", nome: "Relatório LP" },
          { id: "relatorio_pm_checkbox", nome: "Relatório PM" },
          { id: "relatorio_ultrassom_checkbox", nome: "Relatório de Ultrassom" }
        ];

        const tipos_ensaios = ensaios
          .filter(e => document.getElementById(e.id)?.checked)
          .map(e => e.nome);

        const id_solicitacao = await gerarIdSolicitacao(db);

        const dataAtual = new Date();
        const dataFormatada = `${String(dataAtual.getDate()).padStart(2, '0')}/${String(dataAtual.getMonth() + 1).padStart(2, '0')}/${dataAtual.getFullYear()}`;

        try {
          const docRef = await addDoc(collection(db, "Solicitacoes"), {
            cliente_final,
            local,
            rastreabilidade: {
              descricao_peca: description,
              desenho: drawing,
              identifications: identifications
            },
            dados_peca: {
              material,
              espessura_diametro,
              comprimento,
              condicao_superficial,
              tratamento,
              quantidade,
              processo_fabricacao,
              fase_inspecao
            },
            tipos_ensaios,
            normas: {
              norma_referencia,
              procedimento,
              faixa_dureza
            },
            data_solicitacao: dataFormatada,
            status: "pendente",
            id_solicitacao: id_solicitacao,
          });

          alert("Solicitação enviada com sucesso!");
          console.log("Documento salvo com ID:", docRef.id);

          const userRef = doc(db, "Usuarios", user.uid);
          await setDoc(userRef, {
            solicitacoes: arrayUnion(docRef.id)
          }, { merge: true });

          form.reset();
        } catch (error) {
          console.error("Erro ao enviar solicitação:", error);
          alert("Erro ao enviar a solicitação. Verifique os dados e tente novamente.");
        }
      });
    } else {
      console.warn("Usuário não está logado. Redirecionando ou bloqueando envio...");
      button.disabled = true;
      alert("Você precisa estar logado para enviar uma solicitação.");
    }
  });
});
