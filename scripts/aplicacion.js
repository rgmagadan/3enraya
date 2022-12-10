const empezarBtn = document.querySelector('#empezar');
let partida;

function empezarPartida() {
  const tablero = document.querySelector("#tablero");
  const marcador = document.querySelector("#marcador");
  if (tablero) {
    document.querySelector('#container').removeChild(tablero);
    document.querySelector('#container').removeChild(marcador);
  }
  empezar.disabled = true;
  partida = new Partida();
}

empezar.addEventListener("click", empezarPartida);