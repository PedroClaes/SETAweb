import { query, collection, getDocs, where } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

export async function gerarIdSolicitacao(db) {
  const agora = new Date();

  // Obtem data no formato DDMMYYYY
  const dia = String(agora.getDate()).padStart(2, '0');
  const mes = String(agora.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
  const ano = String(agora.getFullYear());
  const dataNormal = `${dia}${mes}${ano}`;

  // Inverte para formato 52024090
  const dataInvertida = dataNormal.split('').reverse().join('');

  // Cria início e fim do dia para filtrar solicitações do dia
  const inicioDia = new Date(agora.setHours(0, 0, 0, 0));
  const fimDia = new Date(agora.setHours(23, 59, 59, 999));

  // Consulta Firestore por data_solicitacao de hoje
  const solicitacoesRef = collection(db, "Solicitacoes");
  const q = query(solicitacoesRef, where("data_solicitacao", ">=", inicioDia), where("data_solicitacao", "<=", fimDia));
  const snapshot = await getDocs(q);

  const quantidadeHoje = snapshot.size + 1; // A próxima da fila
  const idFinal = `${dataInvertida}-${quantidadeHoje}`;

  return idFinal;
}
