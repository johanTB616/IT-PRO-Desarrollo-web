(function(){
  const guardar = document.getElementById('guardarNota');
  const borrar = document.getElementById('borrarNota');
  const input = document.getElementById('notaTexto');
  const display = document.getElementById('notaGuardada');
  if (!guardar || !input || !display) return;

  function cargar() {
    const saved = localStorage.getItem('nota');
    display.textContent = saved || '—';
  }

  guardar.addEventListener('click', () => {
    const texto = input.value.trim();
    if (!texto) return;
    localStorage.setItem('nota', texto);
    display.textContent = texto;
    input.value = '';
  });

  if (borrar) {
    borrar.addEventListener('click', () => {
      localStorage.removeItem('nota');
      display.textContent = '—';
    });
  }

  cargar();
})();
