// theme.js

/* 
  Script para alternar entre modo oscuro y modo claro.
  - El atributo `data-theme="light"` en <html> activa el tema claro.
  - Si no existe ese atributo, se muestra el tema oscuro por defecto.
  - El ícono y aria-label cambian según el tema actual.
*/

const toggleBtn = document.getElementById('theme-toggle');

// Comprueba si el usuario ya tiene preferencia guardada en localStorage
const savedTheme = localStorage.getItem('temaUsuario');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  toggleBtn.textContent = savedTheme === 'light' ? '☀️' : '🌙';
  toggleBtn.setAttribute(
    'aria-label',
    savedTheme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'
  );
}

toggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');

  if (currentTheme === 'light') {
    document.documentElement.removeAttribute('data-theme');
    toggleBtn.textContent = '🌙';
    toggleBtn.setAttribute('aria-label', 'Cambiar a modo claro');
    localStorage.removeItem('temaUsuario');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    toggleBtn.textContent = '☀️';
    toggleBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
    localStorage.setItem('temaUsuario', 'light');
  }
});
