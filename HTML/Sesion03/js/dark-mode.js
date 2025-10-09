// dark-mode.js - Version 1.0

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggle');
    const savedMode = localStorage.getItem('darkMode');
    
    // Aplicar modo guardado o modo claro por defecto esto ya depende de las preferencias dentro del navegador que se use
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
        toggle.classList.add('active');
    }
    
    // Cambiar entre modos al hacer click al toggle
    toggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-mode');
        toggle.classList.toggle('active');
        
        // Guardar preferencia del sistema
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    });
});