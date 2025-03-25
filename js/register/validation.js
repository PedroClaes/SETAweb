export function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  return true;
}

export function validateCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, "");
  if (cnpj.length !== 14) return false;
  return true;
}

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePassword(password) {
  return password.length >= 8;
}

export function validateName(name) {
  return name.trim().split(" ").length >= 2;
}

export function validateForm() {
  let isValid = true;

  const cpfCnpjInput = document.getElementById("cpf_cnpj");
  const nameInput = document.getElementById("nome_completo");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("senha");
  const confirmPasswordInput = document.getElementById("confirmar_senha");

  if (!validateCPF(cpfCnpjInput.value) && !validateCNPJ(cpfCnpjInput.value)) {
    document.getElementById("cpf_error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("cpf_error").style.display = "none";
  }

  if (!validateName(nameInput.value)) {
    document.getElementById("nome_error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("nome_error").style.display = "none";
  }

  if (!validateEmail(emailInput.value)) {
    document.getElementById("email_error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("email_error").style.display = "none";
  }

  if (!validatePassword(passwordInput.value)) {
    document.getElementById("senha_error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("senha_error").style.display = "none";
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    document.getElementById("confirmar_senha_error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("confirmar_senha_error").style.display = "none";
  }

  return isValid;
}
