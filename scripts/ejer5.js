let partida;

function empezarPartida() {
    empezar.disabled = true;
    let jugadorX = new Jugador(document.getElementById('X'));
    let jugadorO = new Jugador(document.getElementById('O'));
    partida = new Partida(jugadorX, jugadorO);
    }

function ponerFicha() {
    Tablero.ponerFichaEnCasilla(partida.jugadorQueTieneElTurno.ficha, this)
    partida.comprobarSituacion();
}

window.onload = function () {
    empezar.onclick = empezarPartida;
}