const toggleBtn = document.querySelector('#toggleDark');

// Verificar si hay una preferencia guardada
const savedMode = localStorage.getItem('darkMode');
if (savedMode === 'light') {
    document.body.classList.add('light-mode');
    toggleBtn.textContent = 'Modo Oscuro';
} else {
    toggleBtn.textContent = 'Modo Claro';
}

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    // Guardar preferencia
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('darkMode', 'light');
        toggleBtn.textContent = 'Modo Oscuro';
    } else {
        localStorage.setItem('darkMode', 'dark');
        toggleBtn.textContent = 'Modo Claro';
    }
});