// js/login.js
const formLogin = document.getElementById('loginForm');
const errorLogin = document.getElementById('error');

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorLogin.textContent = '';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('https://gestor-usuarios-backend.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      errorLogin.textContent = data.message || data.errors[0].msg;
      return;
    }

    // Guardar token y redirigir
    saveToken(data.token);
    const payload = parseJwt(data.token);
    if (payload.role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'profile.html';
    }
  } catch (err) {
    console.error('Error en login:', err);
    errorLogin.textContent = 'Error al iniciar sesión. Inténtalo de nuevo.';
  }
});
