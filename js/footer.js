// footer.js
// Solo asigna el año actual en el footer (no duplica la lógica del tema).

document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
