(function(){
  const eventoForm = document.getElementById('eventoForm');
  const listaEventos = document.getElementById('listaEventos');
  if (!eventoForm || !listaEventos) return;

  let eventos = JSON.parse(localStorage.getItem('eventos')) || [];

  function mostrarEventos() {
    listaEventos.innerHTML = '';
    eventos.forEach((ev, idx) => {
      const li = document.createElement('li');
      const left = document.createElement('div');
      left.innerHTML = `<strong>${ev.fecha}</strong> ${ev.hora} — ${ev.descripcion}`;
      const actions = document.createElement('div');

      const btnDel = document.createElement('button');
      btnDel.className = 'btn danger';
      btnDel.textContent = 'Eliminar';
      btnDel.addEventListener('click', () => {
        eventos.splice(idx, 1);
        localStorage.setItem('eventos', JSON.stringify(eventos));
        mostrarEventos();
      });

      actions.appendChild(btnDel);
      li.appendChild(left);
      li.appendChild(actions);
      listaEventos.appendChild(li);
    });
  }

  mostrarEventos();

  eventoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const descripcion = document.getElementById('descripcion').value.trim();
    if (!fecha || !hora || !descripcion) return;
    eventos.push({ fecha, hora, descripcion });
    localStorage.setItem('eventos', JSON.stringify(eventos));
    mostrarEventos();
    eventoForm.reset();
  });
})();
