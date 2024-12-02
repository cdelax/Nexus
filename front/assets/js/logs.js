// Manejo del login
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target[0].value;
  const password = e.target[1].value;

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('authToken', token); // Guardar el token
      alert('Inicio de sesión exitoso.');
      window.location.href = 'home.html';  // Redirigir a la página principal
    } else {
      const error = await response.json();
      alert(error.msg || 'Error en el inicio de sesión');
    }
  } catch (err) {
    console.error(err);
    alert('Error al conectar con el servidor');
  }
});

// Manejo del registro
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = e.target[0].value;
  const email = e.target[1].value;
  const password = e.target[2].value;

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: username, email, password }),
    });

    if (response.ok) {
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      showLogin(); // Cambiar al formulario de login
    } else {
      const error = await response.json();
      alert(error.msg || 'Error en el registro');
    }
  } catch (err) {
    console.error(err);
    alert('Error al conectar con el servidor');
  }
});

// Mostrar el formulario de login
function showLogin() {
  document.getElementById('login-form').classList.add('active');
  document.getElementById('signup-form').classList.remove('active');
}

// Mostrar el formulario de registro
function showSignUp() {
  document.getElementById('signup-form').classList.add('active');
  document.getElementById('login-form').classList.remove('active');
}

// Cerrar sesión
function logout() {
  localStorage.removeItem('authToken'); // Eliminar el token
  alert('Has cerrado sesión exitosamente.');
  window.location.href = 'log.html'; // Redirigir al login
}

// Enviar token en solicitudes protegidas
async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert('No tienes permisos para esta acción.');
    logout(); // Cerrar sesión automáticamente
    return;
  }

  const headers = options.headers || {};
  headers['Authorization'] = `Bearer ${token}`;

  return fetch(url, { ...options, headers });
}

// Verificar autenticación al cargar páginas protegidas
if (window.location.pathname !== '/log.html') {
  window.onload = checkAuthentication;
}

function checkAuthentication() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    alert('Debes iniciar sesión para acceder a esta página.');
    //window.location.href = 'log.html'; // Redirigir al login
  }
}