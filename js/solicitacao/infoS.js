import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs }  from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

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

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Recupera o id_solicitacao salvo
const idSelecionado = localStorage.getItem('id_solicitacao');
console.log("ID carregado:", idSelecionado);


// Função para buscar e exibir os dados do documento correspondente
async function buscarDetalhesSolicitacao() {
  if (!idSelecionado) {
    console.error('ID da solicitação não encontrado.');
    return;
  }

  const detalhesRef = collection(db, 'Solicitacoes');
  const q = query(detalhesRef, where('id_solicitacao', '==', idSelecionado));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log('Nenhum detalhe encontrado para esta solicitação.');
    return;
  }

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    exibirDados(data);
  });
}

// Função para exibir os dados na tela (você pode customizar o HTML como quiser)
function exibirDados(dados) {
  const container = document.getElementById('dadosSolicitacao');

  const dadosPecaObj = dados.dados_peca || {};

  const material = dadosPecaObj?.material ?? 'Não informado';
  const processo_fab = dadosPecaObj?.processo_fabricacao ?? 'Não informado';
  const tratamento = dadosPecaObj?.tratamento ?? 'Não informado';
  const quantidade = dadosPecaObj?.quantidade ?? 'Não informado';
  const fase_insp = dadosPecaObj?.fase_inspecao ?? 'Não informado';
  const espessura = dadosPecaObj?.espessura_diametro ?? 'Não informado';
  const cond_superfi = dadosPecaObj?.condicao_superficial ?? 'Não informado';
  const comprimento = dadosPecaObj?.comprimento ?? 'Não informado';
  const diametro = dadosPecaObj?.diametro ?? 'Não informado';


  const dadosPecaHTML = Object.entries(dados.dados_peca || {})
    .map(([chave, valor]) => `<li><strong>${chave}:</strong> ${valor ?? 'Não informado'}</li>`)
    .join('');


  const dadosNormas = Object.entries(dados.normas || {})
    .map(([chave, valor]) => `<li><strong>${chave}:</strong> ${valor ?? 'Não informado'}</li>`)
    .join('');

  const rastreabilidadeObj = dados.rastreabilidade || {};

  const dadosIdentifications = Object.entries(rastreabilidadeObj.identifications || {})
    .map(([chave, valor]) => `<li><strong>${chave}:</strong> ${valor ?? 'Não informado'}</li>`)
    .join('');

  const dadosRastreabilidade = Object.entries(rastreabilidadeObj)
    .filter(([chave]) => chave !== 'identifications')
    .map(([chave, valor]) => `<li><strong>${chave}:</strong> ${valor ?? 'Não informado'}</li>`)
    .join('');

  const descricaoPeca = rastreabilidadeObj?.descricao_peca ?? 'Não informado';
  const desenho = rastreabilidadeObj?.desenho ?? 'Não informado';


  container.innerHTML = `
    <section>

    <form id="traceabilityForm">
      <h3 class="form-section-title poppins-semibold">Rastreabilidade</h3>

      <br>
      <fieldset class="rastreabilidade_fieldset">
        <div class="form-group">
          <label class="label-form open-sans-semibold" for="description">Descrição da peça</label>
          <ul>${descricaoPeca}</ul>
        </div>
        <div class="form-group">
          <label class="label-form open-sans-semibold" for="drawing">Desenho/Especificação</label>
          <ul>${desenho}</ul>
        </div>


        <div id="identifications">
          <p class="open-sans-semibold">Identificação da peça</p>
          <button type="button" id="addIdentification" class="open-sans-semibold">Adicionar identificação</button>
          <div class="inputIdentificationGroup hidden" id="corridaGroup">
            <label for="corrida" class="open-sans-semibold">Corrida:</label>
            <input type="text" id="corrida" name="corrida" placeholder="Corrida:" class="open-sans-semibold">
          </div>
          <div class="inputIdentificationGroup hidden" id="pedidoGroup">
            <label for="pedido" class="open-sans-semibold">Pedido</label>
            <input type="text" id="pedido" name="pedido" placeholder="Pedido:" class="open-sans-semibold">
          </div>
          <div class="inputIdentificationGroup hidden" id="opGroup">
            <label for="op" class="open-sans-semibold">OP:</label>
            <input type="text" id="op" name="op" placeholder="OP:" class="open-sans-semibold">
          </div>
          <div class="inputIdentificationGroup hidden" id="osGroup">
            <label for="os" class="open-sans-semibold">OS:</label>
            <input type="text" id="os" name="os" placeholder="OS:" class="open-sans-semibold">
          </div>
          <div class="inputIdentificationGroup hidden" id="poGroup">
            <label for="po" class="open-sans-semibold">PO:</label>
            <input type="text" id="po" name="po" placeholder="PO:" class="open-sans-semibold">
          </div>
          <div class="inputIdentificationGroup hidden" id="pnGroup">
            <label for="pn" class="open-sans-semibold">PN:</label>
            <input type="text" id="pn" name="pn" placeholder="PN:" class="open-sans-semibold">
          </div>
          <div class="inputIdentificationGroup hidden" id="nsGroup">
            <label for="ns" class="open-sans-semibold">NºS:</label>
            <input type="text" id="ns" name="ns" placeholder="NºS:" class="open-sans-semibold">
          </div>
          <div class="inputIdentificationGroup hidden" id="snGroup">
            <label for="sn" class="open-sans-semibold">SN:</label>
            <input type="text" id="sn" name="sn" placeholder="SN:" class="open-sans-semibold">
          </div>
          <div class="inputIdentificationGroup hidden" id="ordenGroup">
            <label for="orden" class="open-sans-semibold">ORDEN:</label>
            <input type="text" id="orden" name="orden" placeholder="ORDEN:" class="open-sans-semibold">
          </div>
          <div class="inputIdentificationGroup hidden" id="orderGroup">
            <label for="order" class="open-sans-semibold">ORDER:</label>
            <input type="text" id="order" name="order" placeholder="ORDER:" class="open-sans-semibold">
          </div>
        </div>

      </fieldset>

      <h3 class="form-section-title poppins-semibold">Dados da peça</h3>
      <div class="form-group-container">
        <div class="form-group">
          <label class="label-form open-sans-semibold" for="material">Material</label>
         <ul>${material}</ul>

        </div>
        <div class="form-group">
          <label class="label-form open-sans-semibold" for="espessura">Espessura</label>
          <ul>${espessura}</ul>

        </div>
        <div class="form-group">
          <label class="label-form open-sans-semibold" for="diametro">Diâmetro</label>
          <ul>${diametro}</ul>
        </div>
        <div class="form-group">
          <label class="label-form open-sans-semibold" for="comprimento">Comprimento</label>
          <ul>${comprimento}</ul>
        </div>
        <div class="form-group">
          <label class="label-form open-sans-semibold" for="condicao_superficial">Condição Superficial</label>
          <ul>${cond_superfi}</ul>
        </div>
        <div class="form-group">
          <label class="label-form open-sans-semibold" for="tratamento">Tratamento</label>
          <ul>${tratamento}</ul>
        </div>
        <div class="form-group">
          <label class="label-form open-sans-semibold" for="quantidade">Quantidade</label>
          <ul>${quantidade}</ul>
        </div>
        <div class="form-group">
          <label class="label-form open-sans-semibold" for="processo_fabricacao">Processo de Fabricação</label>
          <ul>${processo_fab}</ul>
        </div>
      </div>

      <br>
      <h3 class="form-section-title poppins-semibold">Informações Essenciais</h3>
      <div class="form-group-container">
        <div class="form-group">
          <label class="label-form open-sans-semibold" for="cliente_final">Cliente Final</label>
          <ul>${dados.cliente_final || 'N/A'}</ul>
        </div>
        <div class="form-group">
          <label class="label-form open-sans-semibold" for="local">Local</label>
          <ul>${dados.local || 'N/A'}</ul>
        </div>
      </div>



  </section>
  `;
}

// Chama a função ao carregar a página
buscarDetalhesSolicitacao();

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
  window.location.href = "solicitar-ensaio.html";
});
