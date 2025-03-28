export function handleIdentificationSelection() {
  const modal = document.getElementById("identificationModal");
  const checkboxes = document.querySelectorAll("#identificationForm input[type=checkbox]");
  const confirmSelectionBtn = document.getElementById("confirmSelection");
  const maxSelections = 5;

  document.getElementById("addIdentification").addEventListener("click", () => {
    modal.classList.add("open");
  });

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const selected = document.querySelectorAll("#identificationForm input[type=checkbox]:checked");
      if (selected.length > maxSelections) {
        checkbox.checked = false;
      }
    });
  });

  confirmSelectionBtn.addEventListener("click", () => {
    document.querySelectorAll(".inputIdentificationGroup").forEach(div => div.classList.add("hidden"));
    document.querySelectorAll("#identificationForm input[type=checkbox]:checked").forEach(checkbox => {
      document.getElementById(checkbox.value + "Group").classList.remove("hidden");
    });
    modal.classList.remove("open");
  });
}
