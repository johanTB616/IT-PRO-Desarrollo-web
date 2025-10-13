(function(){
  const btn = document.getElementById('buscarClima');
  const info = document.getElementById('climaInfo');
  const input = document.getElementById('ciudadClima');
  if (!btn || !info || !input) return;

  const abreviaturas = {
    cdmx: 'Ciudad de México',
    nyc: 'New York',
    sf: 'San Francisco',
    la: 'Los Angeles',
    bcn: 'Barcelona',
    rio: 'Rio de Janeiro'
  };

  btn.addEventListener('click', async () => {
    let ciudad = input.value.trim();
    if (!ciudad) { alert('Escribe una ciudad'); return; }
    const key = ciudad.toLowerCase();
    if (abreviaturas[key]) ciudad = abreviaturas[key];

    info.textContent = 'Buscando...';

    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ciudad)}&count=1&language=es`);
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        info.textContent = 'Ciudad no encontrada.';
        return;
      }
      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`);
      const weatherData = await weatherRes.json();
      const clima = weatherData.current_weather;

      // Opcional: mapear weathercode a texto simple (puedes ampliar)
      const weatherText = (code => {
        if (code >= 80) return 'Lluvias';
        if (code >= 60) return 'Chubascos';
        if (code >= 30) return 'Nublado';
        return 'Despejado';
      })(clima.weathercode);

      info.innerHTML = `
        <strong>${name}, ${country}</strong><br>
        🌡️ <strong>${clima.temperature} °C</strong> — ${weatherText}<br>
        💨 Viento ${clima.windspeed} km/h<br>
        ⏱️ ${clima.time}
      `;

    } catch (err) {
      console.error(err);
      info.textContent = 'Error al obtener clima.';
    }
  });
})();
