// Global behaviour for header and dark mode (applied on every page)
(function(){
  const lever = document.getElementById('lever');
  const stored = localStorage.getItem('panel-theme'); // 'dark' or 'light'
  let dark = stored ? (stored === 'dark') : true; // por defecto oscuro

  function applyTheme() {
    // Si 'dark' es true, quita 'light' (modo oscuro)
    // Si 'dark' es false, añade 'light' (modo claro)
    document.body.classList.toggle('light', !dark); 
    
    // Cambia la imagen de la palanca
    if (lever) {
        // Si está en modo oscuro (dark=true) -> Palanca 'on'
        // Si está en modo claro (dark=false) -> Palanca 'off'
        lever.src = dark ? './images/lever_on.png' : './images/lever_off.png';
    }
  }

  // Aplica el tema guardado al cargar
  applyTheme();

  if (lever) {
    lever.addEventListener('click', () => {
      dark = !dark; // Invierte el estado
      localStorage.setItem('panel-theme', dark ? 'dark' : 'light'); // Guarda el nuevo estado
      applyTheme(); // Aplica el cambio
    });
  }

  // Improve accessibility: keyboard toggle when focused on lever
  if (lever) {
    lever.tabIndex = 0;
    lever.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        lever.click();
      }
    });
  }
})();