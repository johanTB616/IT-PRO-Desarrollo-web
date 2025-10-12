// === Palanca modo oscuro ===
const lever = document.getElementById("lever");
let dark = false;

lever.addEventListener("click", () => {
  dark = !dark;
  document.body.classList.toggle("dark", dark);
  lever.src = dark ? "./images/lever_on.png" : "./images/lever_off.png";
});

// === Reloj en vivo ===
const reloj = document.getElementById("reloj");
setInterval(() => {
  const ahora = new Date();
  reloj.textContent = ahora.toLocaleTimeString();
}, 1000);

// === Agenda ===
const eventoForm = document.getElementById("eventoForm");
const listaEventos = document.getElementById("listaEventos");
let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

function mostrarEventos() {
  listaEventos.innerHTML = "";
  eventos.forEach(ev => {
    const li = document.createElement("li");
    li.textContent = `${ev.fecha} ${ev.hora} - ${ev.descripcion}`;
    listaEventos.appendChild(li);
  });
}
mostrarEventos();

eventoForm.addEventListener("submit", e => {
  e.preventDefault();
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const descripcion = document.getElementById("descripcion").value;
  eventos.push({ fecha, hora, descripcion });
  localStorage.setItem("eventos", JSON.stringify(eventos));
  mostrarEventos();
  eventoForm.reset();
});

// === Clima con Open-Meteo ===
const buscarClima = document.getElementById("buscarClima");
const climaInfo = document.getElementById("climaInfo");

buscarClima.addEventListener("click", async () => {
  let ciudad = document.getElementById("ciudadClima").value.trim();
  if (!ciudad) return alert("Por favor, escribe una ciudad");

  // --- Mapeo de abreviaturas comunes ---
  const abreviaturas = {
    "cdmx": "Ciudad de México",
    "nyc": "New York",
    "sf": "San Francisco",
    "la": "Los Angeles",
    "bcn": "Barcelona",
    "rio": "Rio de Janeiro"
  };

  // Convertir a minúsculas y reemplazar si hay coincidencia
  const key = ciudad.toLowerCase();
  if (abreviaturas[key]) {
    ciudad = abreviaturas[key];
  }

  try {
    // 1️⃣ Geocoding
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ciudad)}&count=1&language=es`);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      climaInfo.textContent = "Ciudad no encontrada.";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2️⃣ Clima
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`);
    const weatherData = await weatherRes.json();
    const clima = weatherData.current_weather;

    climaInfo.innerHTML = `
      📍 <b>${name}, ${country}</b><br>
      🌡️ <b>${clima.temperature} °C</b><br>
      💨 ${clima.windspeed} km/h<br>
      ⏰ ${clima.time}
    `;
  } catch (err) {
    climaInfo.textContent = "Error al obtener el clima.";
    console.error(err);
  }
});

// === Notas rápidas ===
const guardarNota = document.getElementById("guardarNota");
const notaTexto = document.getElementById("notaTexto");
const notaGuardada = document.getElementById("notaGuardada");

guardarNota.addEventListener("click", () => {
  const texto = notaTexto.value.trim();
  if (!texto) return;
  localStorage.setItem("nota", texto);
  notaGuardada.textContent = texto;
  notaTexto.value = "";
});

window.addEventListener("load", () => {
  const guardada = localStorage.getItem("nota");
  if (guardada) notaGuardada.textContent = guardada;
});

// === Frases motivacionales ===
const frases = [
  "¡Tú puedes con todo!",
  "Los grandes logros empiezan con pequeños pasos.",
  "No te rindas, el siguiente bloque puede tener diamantes.",
  "Cree en ti, como Steve cree en su pico de hierro.",
  "Haz de hoy una aventura épica."
];

const fraseTexto = document.getElementById("fraseTexto");
const nuevaFrase = document.getElementById("nuevaFrase");

nuevaFrase.addEventListener("click", () => {
  const random = Math.floor(Math.random() * frases.length);
  fraseTexto.textContent = frases[random];
});
