let partida;

function crearTablero() {
  let casillas = 1;
  const columnas = ["a", "b", "c"];
  const div = document.createElement("div");
  const tabla = document.createElement("table");
  const caption = document.createElement("caption");

  div.role = "application";
  tabla.id = "tablero";
  caption.id = "marcador";
  caption.ariaLive = "polite";

  document.body.appendChild(div);
  div.id = 'juego';
  div.appendChild(tabla);
  tabla.appendChild(caption);

  for (let fila = 1; fila <= columnas.length; fila++) {
    const tr = document.createElement("tr");
    tabla.appendChild(tr);
    columnas.forEach((columna) => {
      const td = document.createElement("td");
      td.id = columna + fila.toString();
      td.tabIndex = casillas++;
      tr.appendChild(td);
    });
  }
  document.querySelector("#b2").focus();
}

function empezarPartida() {
  document.body.removeChild(document.querySelector('#juego'));
  empezar.disabled = true;
  let jugadorX = new Jugador(document.getElementById("X"));
  let jugadorO = new Jugador(document.getElementById("O"));
  crearTablero();
  partida = new Partida(jugadorX, jugadorO);
}

function ponerFicha(e) {
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
    e.target.textContent === "·"
  ) {
    Tablero.ponerFichaEnCasilla(partida.jugadorQueTieneElTurno.ficha, e.target);
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
