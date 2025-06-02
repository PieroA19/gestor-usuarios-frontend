// js/auth.js

// Guardar token en localStorage
function saveToken(token) {
  localStorage.setItem('token', token);
}

// Recuperar token
function getToken() {
  return localStorage.getItem('token');
}

// Eliminar token (logout)
function clearToken() {
  localStorage.removeItem('token');
}

// Redirigir al login si no hay token
function ensureAuthenticated() {
  const token = getToken();
  if (!token) {
    window.location.href = 'login.html';
  }
}

// Obtener payload del JWT (decodificar base64)
function parseJwt(token) {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
}

// Obtener rol y id del usuario
function getUserInfoFromToken() {
  const token = getToken();
  if (!token) return null;
  return parseJwt(token);
}
