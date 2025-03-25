export function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  // Verifica se o CPF tem 11 caracteres
  if (cpf.length !== 11) return false;

  // Verifica se o CPF não é uma sequência de números repetidos (ex: 111.111.111-11)
  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0, remainder;

  // Validação do primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf[i - 1]) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf[9])) return false;

  sum = 0;
  // Validação do segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf[i - 1]) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;

  return remainder === parseInt(cpf[10]);
}

export function validateCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  // Verifica se o CNPJ tem 14 caracteres
  if (cnpj.length !== 14) return false;

  // Verifica se o CNPJ não é uma sequência de números repetidos (ex: 11111111111111)
  if (/^(\d)\1+$/.test(cnpj)) return false;

  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  // Cálculo do primeiro dígito verificador
  for (let i = size; i >= 1; i--) {
    sum += numbers[size - i] * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits[0])) return false;

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  // Cálculo do segundo dígito verificador
  for (let i = size; i >= 1; i--) {
    sum += numbers[size - i] * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits[1]);
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

  // Valida CPF ou CNPJ
  if (!validateCPF(cpfCnpjInput.value) && !validateCNPJ(cpfCnpjInput.value)) {
    document.getElementById("cpf_error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("cpf_error").style.display = "none";
  }

  // Valida nome
  if (!validateName(nameInput.value)) {
    document.getElementById("nome_error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("nome_error").style.display = "none";
  }

  // Valida e-mail
  if (!validateEmail(emailInput.value)) {
    document.getElementById("email_error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("email_error").style.display = "none";
  }

  // Valida senha
  if (!validatePassword(passwordInput.value)) {
    document.getElementById("senha_error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("senha_error").style.display = "none";
  }

  // Valida a confirmação de senha
  if (passwordInput.value !== confirmPasswordInput.value) {
    document.getElementById("confirmar_senha_error").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("confirmar_senha_error").style.display = "none";
  }

  return isValid;
}
