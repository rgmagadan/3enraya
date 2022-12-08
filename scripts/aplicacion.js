let partida;

function empezarPartida() {
  const juego = document.querySelector("#juego");
  if (juego) {
    document.querySelector('#container').removeChild(juego);
  }
  empezar.disabled = true;
  let jugadorX = new Jugador(document.getElementById("X"));
  let jugadorO = new Jugador(document.getElementById("O"));
  partida = new Partida(jugadorX, jugadorO);
}

function ponerFicha(e) {
  if (e.code === "Escape") empezar.focus();
  if (e.code === "ArrowRight") {
    if (e.target === a1) b1.focus();
    if (e.target === a2) b2.focus();
    if (e.target === a3) b3.focus();
    if (e.target === b1) c1.focus();
    if (e.target === b2) c2.focus();
    if (e.target === b3) c3.focus();
  } else if (e.code === "ArrowLeft") {
    if (e.target === c1) b1.focus();
    if (e.target === c2) b2.focus();
    if (e.target === c3) b3.focus();
    if (e.target === b1) a1.focus();
    if (e.target === b2) a2.focus();
    if (e.target === b3) a3.focus();
  } else if (e.code === "ArrowUp") {
    if (e.target === a3) a2.focus();
    if (e.target === a2) a1.focus();
    if (e.target === b3) b2.focus();
    if (e.target === b2) b1.focus();
    if (e.target === c3) c2.focus();
    if (e.target === c2) c1.focus();
  } else if (e.code === "ArrowDown") {
    if (e.target === a1) a2.focus();
    if (e.target === a2) a3.focus();
    if (e.target === b1) b2.focus();
    if (e.target === b2) b3.focus();
    if (e.target === c1) c2.focus();
    if (e.target === c2) c3.focus();
  } else if (
    (e.code === "Enter" || e.code === "Space" || e.type === "click") &&
    empezar.disabled &&
    e.target.textContent === "·" && partida.jugadorQueTieneElTurno.tipo === 'humano'
  ) {
    partida.tablero.ponerFichaEnCasilla(partida.jugadorQueTieneElTurno.ficha, e.target);
    partida.comprobarSituacion(e.target.id);
  }
}

window.onload = function () {
  const a1 = document.querySelector("#a1");
  const b1 = document.querySelector("#b1");
  const c1 = document.querySelector("#c1");
  const a2 = document.querySelector("#a2");
  const b2 = document.querySelector("#b2");
  const c2 = document.querySelector("#c2");
  const a3 = document.querySelector("#a3");
  const b3 = document.querySelector("#b3");
  const c3 = document.querySelector("#c3");

  empezar.addEventListener("click", empezarPartida);
};
