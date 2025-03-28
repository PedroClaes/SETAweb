export function toggleMenu() {
  const aside = document.getElementById("sideMenu");

  if (aside) {
    const isOpen = aside.style.display === "block";
    aside.style.display = isOpen ? "none" : "block";
  }
}
