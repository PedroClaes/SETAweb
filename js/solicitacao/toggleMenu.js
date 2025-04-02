export function toggleMenu() {
  const headerContent = document.getElementById("user-navigation");

  if (headerContent) {
    headerContent.classList.toggle("open");
  }
}
