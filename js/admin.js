// js/admin.js
document.addEventListener('DOMContentLoaded', () => {
  ensureAuthenticated();
  const userInfo = getUserInfoFromToken();
  if (userInfo.role !== 'admin') {
    // Si no es admin, redirigir
    window.location.href = 'profile.html';
    return;
  }

  const logoutBtn = document.getElementById('logoutBtn');
  const usersTableBody = document.querySelector('#usersTable tbody');
  const createForm = document.getElementById('createUserForm');
  const errorAdmin = document.getElementById('errorAdmin');

  const editModal = document.getElementById('editModal');
  const editForm = document.getElementById('editUserForm');
  const cancelEdit = document.getElementById('cancelEdit');
  const errorEdit = document.getElementById('errorEdit');

  const API_URL = 'https://gestor-usuarios-backend.onrender.com/api/users';

  // Función para obtener y renderizar todos los usuarios
  async function fetchUsers() {
    usersTableBody.innerHTML = '';
    try {
      const response = await fetch(API_URL, {
        headers: { Authorization: 'Bearer ' + getToken() },
      });
      const data = await response.json();
      if (!response.ok) {
        errorAdmin.textContent = data.message || 'Error al obtener usuarios';
        return;
      }
      data.users.forEach((user) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${user._id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
            <button class="editBtn" data-id="${user._id}">Editar</button>
            <button class="deleteBtn" data-id="${user._id}">Eliminar</button>
          </td>`;
        usersTableBody.appendChild(tr);
      });
    } catch (err) {
      console.error('Error al listar usuarios:', err);
      errorAdmin.textContent = 'Error de red al listar usuarios';
    }
  }

  // Inicializar listado
  fetchUsers();

  // Crear usuario
  createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorAdmin.textContent = '';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getToken(),
        },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await response.json();
      if (!response.ok) {
        errorAdmin.textContent = data.message || data.errors[0].msg;
        return;
      }
      // Limpiar form y actualizar lista
      createForm.reset();
      fetchUsers();
    } catch (err) {
      console.error('Error al crear usuario:', err);
      errorAdmin.textContent = 'Error de red al crear usuario';
    }
  });

  // Delegación de eventos para editar y eliminar
  usersTableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('editBtn')) {
      const userId = e.target.dataset.id;
      openEditModal(userId);
    }
    if (e.target.classList.contains('deleteBtn')) {
      const userId = e.target.dataset.id;
      deleteUser(userId);
    }
  });

  // Función para eliminar usuario
  async function deleteUser(userId) {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + getToken() },
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'Error al eliminar usuario');
        return;
      }
      fetchUsers();
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
      alert('Error de red al eliminar usuario');
    }
  }

  // Función para abrir modal de edición
  async function openEditModal(userId) {
    errorEdit.textContent = '';
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        headers: { Authorization: 'Bearer ' + getToken() },
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'Error al obtener usuario');
        return;
      }
      // Rellenar formulario
      document.getElementById('editUserId').value = data.user._id;
      document.getElementById('editName').value = data.user.name;
      document.getElementById('editEmail').value = data.user.email;
      document.getElementById('editRole').value = data.user.role;
      editModal.style.display = 'block';
    } catch (err) {
      console.error('Error al obtener usuario:', err);
      alert('Error de red al obtener usuario');
    }
  }

  // Cancelar edición
  cancelEdit.addEventListener('click', () => {
    editModal.style.display = 'none';
  });

  // Guardar cambios de edición
  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEdit.textContent = '';

    const id = document.getElementById('editUserId').value;
    const name = document.getElementById('editName').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const role = document.getElementById('editRole').value;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getToken(),
        },
        body: JSON.stringify({ name, email, role }),
      });
      const data = await response.json();
      if (!response.ok) {
        errorEdit.textContent = data.message || data.errors[0].msg;
        return;
      }
      editModal.style.display = 'none';
      fetchUsers();
    } catch (err) {
      console.error('Error al editar usuario:', err);
      errorEdit.textContent = 'Error de red al editar usuario';
    }
  });

  // Logout
  logoutBtn.addEventListener('click', () => {
    clearToken();
    window.location.href = 'index.html';
  });
});
