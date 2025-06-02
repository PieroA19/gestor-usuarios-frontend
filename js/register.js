// js/register.js
const form = document.getElementById('registerForm');
const errorEl = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorEl.textContent = '';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('https://gestor-usuarios-backend.onrender.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      errorEl.textContent = data.message || data.errors[0].msg;
      return;
    }

    // Guardar token y redirigir
    saveToken(data.token);
    // Si el usuario es admin, redirigir a admin.html; si no, a profile.html
    const payload = parseJwt(data.token);
    if (payload.role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'profile.html';
    }
  } catch (err) {
    console.error('Error en registro:', err);
    errorEl.textContent = 'Error al registrar. Inténtalo de nuevo.';
  }
});
