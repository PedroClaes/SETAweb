const redirectLoginBtn = document.getElementById("redirectLoginBtn");
const redirectRegisterBtn = document.getElementById("redirectRegisterBtn");
const requestEnsaiosBtn = document.getElementById("requestEnsaiosBtn");
const whatsappBtn = document.getElementById("whatsappBtn");

redirectLoginBtn.onclick = () => {
  window.location.href = "../pages/login.html";
}

redirectRegisterBtn.onclick = () => {
  window.location.href = "../pages/cadastro.html";
}

requestEnsaiosBtn.onclick = () => {
  window.location.href = "../pages/login.html";
}

whatsappBtn.onclick = () => {
  const telefone = "5511920402700"
  const mensagem = "Olá tudo bem, poderia me tirar algumas duvidas?"

  const mensagemCodificada = encodeURIComponent(mensagem);

  window.location.href = `https://wa.me/${telefone}?text=${mensagemCodificada}`;
}

