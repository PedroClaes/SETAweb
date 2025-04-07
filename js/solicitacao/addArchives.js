const fileInput = document.getElementById('complementaryFiles');
const addFilesBtn = document.getElementById('addFilesBtn');
const filesTableBody = document.querySelector('#filesTable tbody');

addFilesBtn.addEventListener('click', () => {
  fileInput.click(); // Abre o seletor de arquivos
});

fileInput.addEventListener('change', () => {
  const files = Array.from(fileInput.files);

  files.forEach(file => {
    const fileURL = URL.createObjectURL(file);
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${file.name}</td>
      <td>${file.type}</td>
      <td>
        <a href="${fileURL}" download="${file.name}" class="downloadFileBtn">Download</a>
        <button class="removeFileBtn">Remover</button>
      </td>
    `;

    filesTableBody.appendChild(row);
  });

  fileInput.value = ''; // Limpa input
});

filesTableBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('removeFileBtn')) {
    const row = e.target.closest('tr');
    const downloadLink = row.querySelector('.downloadFileBtn');
    const fileURL = downloadLink.getAttribute('href');

    URL.revokeObjectURL(fileURL); // Libera memória
    row.remove();
  }
});
