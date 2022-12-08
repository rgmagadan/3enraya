class Partida {
  constructor(jugadorX, jugadorO) {
    this._jugadorX = jugadorX;
    this._jugadorO = jugadorO;
    this._jugadorQueTieneElTurno = jugadorX;
    this._tablero = new Tablero();
    this.colocarPosicionInicial();
  }
  get tablero() {
    return this._tablero;
  }
  get jugadorX() {
    return this._jugadorX;
  }
  get jugadorO() {
    return this._jugadorO;
  }
  get jugadorQueTieneElTurno() {
    return this._jugadorQueTieneElTurno;
  }
  _cambiarTurno(idCasilla) {
    this._jugadorQueTieneElTurno =
      this._jugadorQueTieneElTurno.ficha == "X"
        ? this._jugadorO
        : this._jugadorX;
    if (this._jugadorQueTieneElTurno.tipo == "humano") {
      setTimeout(
        () =>
          (marcador.innerHTML = `<span id="jugada">${idCasilla}</span><span id="infoPartida">Es el turno de ${this._jugadorQueTieneElTurno.ficha}</span>`),
        100
      );
    }
    if (this._jugadorQueTieneElTurno.tipo == "maquina") {
      setTimeout(() => this._juegaMaquina(), 500);
    }
  }
  colocarPosicionInicial() {
    marcador.innerHTML = `<span id="jugada">&nbsp;</span><span id="infoPartida">Es el turno de ${this._jugadorQueTieneElTurno.ficha}</span>`;
    if (this._jugadorQueTieneElTurno.tipo == "maquina") {
      this._juegaMaquina();
    }
  }
  comprobarSituacion(idCasilla) {
    if (
      Tablero.tieneTresEnRaya(
        this._jugadorQueTieneElTurno.ficha,
        this._tablero.obtenerPosicion(),
        true
      )
    ) {
      document.querySelector("#victoria").play();
      setTimeout(
        () =>
          (marcador.innerHTML = `<span id="jugada">${idCasilla}</span><span id="infoPartida">${this._jugadorQueTieneElTurno.ficha} ha ganado</span>`),
        500
      );
      empezar.disabled = false;
    } else if (!Tablero.tieneCasillaLibre(this._tablero.obtenerPosicion())) {
      document.querySelector("#empate").play();
      setTimeout(
        () =>
          (marcador.innerHTML = `<span id="jugada">${idCasilla}</span><span id="infoPartida">Partida empatada</span>`),
        100
      );
      empezar.disabled = false;
    } else {
      this._cambiarTurno(idCasilla);
    }
  }
  _juegaMaquina() {
    const indiceCasilla = Maquina.buscarJugada(
      this._jugadorQueTieneElTurno.ficha,
      this._tablero.obtenerPosicion()
    );
    const casilla = this._tablero.obtenerCasilla(indiceCasilla);
    this._tablero.ponerFichaEnCasilla(this._jugadorQueTieneElTurno.ficha, casilla);
    this.comprobarSituacion(casilla.id);
  }
}
