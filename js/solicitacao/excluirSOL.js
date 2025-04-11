import { deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";



async function excluirSolicitacao(id) {
  const confirmacao = confirm("Tem certeza que deseja excluir esta solicitação?");
  if (!confirmacao) return;

  try {
    await deleteDoc(doc(db, "Solicitacoes", id));
    const elem = document.getElementById(`request-${id}`);
    if (elem) elem.remove();
    alert("Solicitação excluída com sucesso.");
  } catch (error) {
    console.error("Erro ao excluir solicitação:", error);
    alert("Erro ao excluir a solicitação.");
  }
}
