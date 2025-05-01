import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

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

// Inicializa o Firestore e a autenticação
const db = getFirestore();
const auth = getAuth();


async function getRequests() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        console.log("Usuário logado:", user.uid);

        try {
          // ✅ Agora a referência ao user está dentro do onAuthStateChanged
          const userRef = doc(db, "Usuarios", user.uid);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            console.error("Usuário não encontrado");
            reject("Usuário não encontrado");
            return;
          }

          const isAdmin = userSnap.data().admin; // Corrigido aqui também: admin, não isAdmin
          let q;

          if (isAdmin) {
            q = query(collection(db, "Solicitacoes"));
          } else {
            q = query(collection(db, "Solicitacoes"), where("userId", "==", user.uid));
          }

          const querySnapshot = await getDocs(q);

          resolve({
            isAdmin,
            solicitacoes: querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          });

        } catch (error) {
          console.error("Erro ao buscar solicitações:", error);
          reject(error);
        }

      } else {
        // Redireciona para login se não estiver logado
        window.location.href = "../pages/login.html";
      }
    });
  });
}


async function displayRequests() {
  const SolicitacoesContainer = document.getElementById("SolicitacoesContainer");
  if (!SolicitacoesContainer) {
    console.error("Elemento SolicitacoesContainer não encontrado no HTML");
    return [];
  }

  try {
    const { solicitacoes } = await getRequests();

    SolicitacoesContainer.innerHTML = solicitacoes.map(request => {
      const dataSolicitacao = request.data?.toDate?.(); // Converte a data
      const dataFormatada = dataSolicitacao
        ? dataSolicitacao.toLocaleDateString("pt-BR")
        : "Sem data";
        const timestamp = dataSolicitacao ? dataSolicitacao.getTime() : 0;


      // Define a cor de acordo com o status
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



      // Filtra os tipos de ensaio com valor true
      const ensaiosAtivos = Object.entries(request.tipos_ensaios || {})
        .filter(([_, valor]) => valor === true)
        .map(([chave]) => chave)
        .join("|");

      return `<div class="request-item"
             data-id_solicitacao="${request.id_solicitacao}"
             data-tipo_inspecao="${ensaiosAtivos.toLowerCase()}"
             data-status="${(request.status || '').toLowerCase()}"
             data-timestamp="${timestamp}">
                <h3>${request.id_solicitacao}</h3>
                <p style ="display: none" id="id_daS">${request.id}</p>
                <p>${ensaiosAtivos || "Nenhum"}</p>
                <p>${dataFormatada}</p>
                <p><span class="status-badge ${statusClass}">${request.status}</span></p>
                <button class="delete-btn" data-id="${request.id}">Excluir</button>
            </div>`;


    }).join("");




    //botão delete
    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        excluirSolicitacao(id);
      });
    });

    return solicitacoes;
  } catch (error) {
    console.error("Erro ao exibir solicitações:", error);
    return [];
  }
}

// Função para exibir as solicitações na interface HTML

window.excluirSolicitacao = async function (id) {
  const confirmDelete = confirm("Tem certeza que deseja excluir esta solicitação?");
  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "Solicitacoes", id));
    alert("Solicitação excluída com sucesso!");
    displayRequests(); // recarrega as solicitações
  } catch (error) {
    console.error("Erro ao excluir solicitação:", error);
    alert("Erro ao excluir a solicitação.");
  }
};

// Depois que montar o HTML normalmente

window.originalRequestItems = Array.from(document.querySelectorAll(".request-item"));


export { displayRequests };
