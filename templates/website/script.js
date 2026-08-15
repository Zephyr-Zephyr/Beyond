const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

toggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
});
