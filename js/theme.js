// theme.js
// Lógica de alternancia de tema oscuro/claro, con almacenamiento en localStorage.

(function () {
  const toggleBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  const storageKey = 'temaUsuario';

  // 1) Obtiene tema inicial guardado o detecta preferencia del sistema.
  function obtenerTemaInicial() {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  // 2) Aplica tema: ajuste de atributo, texto y aria-label del botón.
  function aplicarTema(tema) {
    if (tema === 'light') {
      htmlEl.setAttribute('data-theme', 'light');
      toggleBtn.textContent = '☀️';
      toggleBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
      localStorage.setItem(storageKey, 'light');
    } else {
      htmlEl.setAttribute('data-theme', 'dark');
      toggleBtn.textContent = '🌙';
      toggleBtn.setAttribute('aria-label', 'Cambiar a modo claro');
      localStorage.setItem(storageKey, 'dark');
    }
  }

  // 3) Al cargar la página, aplicar el tema guardado o detectado.
  document.addEventListener('DOMContentLoaded', () => {
    const temaInicial = obtenerTemaInicial();
    aplicarTema(temaInicial);
  });

  // 4) Al hacer clic en el botón, alternar entre light y dark.
  toggleBtn.addEventListener('click', () => {
    const actual = htmlEl.getAttribute('data-theme');
    aplicarTema(actual === 'light' ? 'dark' : 'light');
  });
})();
