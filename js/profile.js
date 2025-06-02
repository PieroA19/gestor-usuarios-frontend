// js/profile.js
document.addEventListener('DOMContentLoaded', () => {
  ensureAuthenticated();
  const userInfo = getUserInfoFromToken();
  const logoutBtn = document.getElementById('logoutBtn');
  const goDashboardBtn = document.getElementById('goDashboardBtn');
  const form = document.getElementById('profileForm');
  const errorProfile = document.getElementById('errorProfile');

  const API_URL = 'https://gestor-usuarios-backend.onrender.com/api/users';

  // Si no es admin, ocultar botón de ir a panel
  if (userInfo.role !== 'admin') {
    goDashboardBtn.style.display = 'none';
  }

  // Cargar datos del usuario
  async function loadProfile() {
    try {
      const response = await fetch(`${API_URL}/${userInfo.id}`, {
        headers: { Authorization: 'Bearer ' + getToken() },
      });
      const data = await response.json();
      if (!response.ok) {
        errorProfile.textContent = data.message || 'Error al obtener perfil';
        return;
      }
      document.getElementById('userId').value = data.user._id;
      document.getElementById('name').value = data.user.name;
      document.getElementById('email').value = data.user.email;
    } catch (err) {
      console.error('Error al cargar perfil:', err);
      errorProfile.textContent = 'Error de red al cargar perfil';
    }
  }

  loadProfile();

  // Guardar cambios de perfil
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorProfile.textContent = '';

    const id = document.getElementById('userId').value;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const bodyData = { name, email };
    if (password) bodyData.password = password;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getToken(),
        },
        body: JSON.stringify(bodyData),
      });
      const data = await response.json();
      if (!response.ok) {
        errorProfile.textContent = data.message || data.errors[0].msg;
        return;
      }
      alert('Perfil actualizado correctamente');
      // Si cambió el correo o rol (no puede cambiar rol), nada del token cambia. 
      // Si cambió contraseña, debe reingresar: descargar token y pedir login de nuevo.
      if (password) {
        clearToken();
        window.location.href = 'index.html';
      }
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      errorProfile.textContent = 'Error de red al actualizar perfil';
    }
  });

  // Botón de logout
  logoutBtn.addEventListener('click', () => {
    clearToken();
    window.location.href = 'index.html';
  });

  // Ir al panel admin (solo si role=admin)
  goDashboardBtn.addEventListener('click', () => {
    window.location.href = 'admin.html';
  });
});
