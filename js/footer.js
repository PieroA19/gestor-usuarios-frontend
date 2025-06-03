/* -------------------------------
   ASIGNAR AÑO ACTUAL EN EL FOOTER
   ------------------------------- */
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* --------------------------------
   ACTUALIZAR ICONOS AL CARGAR PÁGINA
   --------------------------------
   Como el CSS ya oculta/enseña con base en data-theme, 
   no es estrictamente necesario manipular visibilidad aquí.
   Sin embargo, podemos forzar que el botón de tema (🌙/☀️) 
   muestre el símbolo correcto al cargar.
*/
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (toggleBtn) {
    if (currentTheme === 'light') {
      toggleBtn.textContent = '☀️';
      toggleBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
    } else {
      toggleBtn.textContent = '🌙';
      toggleBtn.setAttribute('aria-label', 'Cambiar a modo claro');
    }
  }
});
