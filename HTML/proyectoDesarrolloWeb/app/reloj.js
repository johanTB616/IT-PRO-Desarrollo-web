// Solo corre si existe el elemento
(function(){
  const reloj = document.getElementById('reloj-large') || document.getElementById('reloj');
  if (!reloj) return;

  function update() {
    const ahora = new Date();
    reloj.textContent = ahora.toLocaleTimeString();
  }

  update();
  setInterval(update, 1000);
})();
