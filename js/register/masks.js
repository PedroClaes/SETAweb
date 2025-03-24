export function applyCPFCNPJMask(input) {
  input.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    let cursorPosition = e.target.selectionStart; // Pega a posição atual do cursor antes da mudança
    let formattedValue = "";

    if (value.length <= 11) {
      formattedValue = value.replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      formattedValue = value.replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }

    // Atualiza o valor do campo com a máscara
    e.target.value = formattedValue;

    // Recalcula a diferença no tamanho da string e reposiciona o cursor
    const diff = formattedValue.length - value.length;
    e.target.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
  });
}
