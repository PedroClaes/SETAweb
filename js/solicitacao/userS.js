import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, doc, getDoc  } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

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
const db = getFirestore();
const auth = getAuth();

//função que busca o usuário logado e suas solicitações
async function getRequests() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const usuarioRef = doc(db, "Usuarios", userId);
        const usuarioSnap = await getDoc(usuarioRef);

        if (usuarioSnap.exists()) {
          const usuarioData = usuarioSnap.data();

          if (usuarioData.id_solicitacoes && Array.isArray(usuarioData.id_solicitacoes)) {
            const solicitacoes = [];

            for (const id of usuarioData.id_solicitacoes) {
              const solicitacaoRef = doc(db, "Solicitacoes", id);
              const solicitacaoSnap = await getDoc(solicitacaoRef);

              if (solicitacaoSnap.exists()) {
                solicitacoes.push({ id: solicitacaoSnap.id, ...solicitacaoSnap.data() });
              }
            }

            resolve(solicitacoes);
          } else {
            resolve([]); // Nenhuma solicitação
          }
        } else {
          console.warn("Documento do usuário não encontrado.");
          resolve([]);
        }
      } else {
        console.warn("Nenhum usuário logado.");
        resolve([]);
      }
    });
  });
}

async function checkUser() {
  const SolicitacoesContainer = document.getElementById("SolicitacoesContainer");
  if (!SolicitacoesContainer) {
    console.error("Elemento SolicitacoesContainer não encontrado no HTML");
    return [];
  }

  try {
    const solicitacoes = await getRequests();

    SolicitacoesContainer.innerHTML += solicitacoes.map(request => {
      const dataSolicitacao = request.data_solicitacao?.toDate?.();
      const dataFormatada = dataSolicitacao
        ? dataSolicitacao.toLocaleDateString("pt-BR")
        : "Sem data";
      const timestamp = dataSolicitacao ? dataSolicitacao.getTime() : 0;

      let statusClass = "";
      switch (request.status?.toLowerCase()) {
        case "pendente":
        case "em progresso":
          statusClass = "status-amarelo";
          break;
        case "concluido":
          statusClass = "status-verde";
          break;
        case "cancelado":
          statusClass = "status-vermelho";
          break;
        default:
          statusClass = "status-verde";
      }

      const ensaiosAtivos = Object.entries(request.tipos_ensaios || {})
        .filter(([_, valor]) => valor === true)
        .map(([chave]) => chave)
        .join(", ");

      return `<div class="request-item"
             data-id_solicitacao="${request.id_solicitacao}"
             data-tipo_inspecao="${ensaiosAtivos.toLowerCase()}"
             data-status="${(request.status || '').toLowerCase()}"
             data-timestamp="${timestamp}">
                <h3>${request.id_solicitacao}</h3>
                <p style ="display: none">${request.id}</p>
                <p>${ensaiosAtivos || "Nenhum"}</p>
                <p>${dataFormatada}</p>
                <p><span class="status-badge ${statusClass}">${request.status}</span></p>
                <button class="delete-btn" data-id="${request.id}">Excluir</button>
            </div>`;


    }).join("");
    return solicitacoes;
  } catch (error) {
    console.error("Erro ao exibir solicitações:", error);
    SolicitacoesContainer.innerHTML += "<p>Erro ao carregar as solicitações.</p>";
    return [];
  }
}

const div = document.getElementById("SolicitacoesContainer");

div.addEventListener("click", () => {
  //window.location.href = "infoSolicitacao.html";

});

export { checkUser };
