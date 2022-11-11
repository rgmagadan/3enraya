class Partida {

    constructor(jugadorX, jugadorO) {
        this._jugadorX = jugadorX;
        this._jugadorO = jugadorO;
        this._jugadorQueTieneElTurno = jugadorX;
        this.colocarPosicionInicial();
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
    _cambiarTurno() {
        this._jugadorQueTieneElTurno = (this._jugadorQueTieneElTurno.ficha == 'X') ? this._jugadorO : this._jugadorX;
        setTimeout(() => marcador.innerText = 'Es el turno de ' + this._jugadorQueTieneElTurno.ficha, 100);
        if (this._jugadorQueTieneElTurno.tipo == 'humano') {
            Tablero.ponerManejadores();
        } else {
            setTimeout(() => this._juegaMaquina(), 500);
        }
    }
    colocarPosicionInicial() {
        marcador.innerText = 'Es el turno de ' + this._jugadorQueTieneElTurno.ficha;
        Tablero.posicionInicial();
        if (this._jugadorQueTieneElTurno.tipo == 'humano') {
            Tablero.ponerManejadores();
        } else {
            this._juegaMaquina();
        }
    }
    comprobarSituacion() {
        Tablero.quitarManejadores();
        if (Tablero.tieneTresEnRaya(this._jugadorQueTieneElTurno.ficha, Tablero.obtenerPosicion())) {
            document.querySelector('#victoria').play();
            setTimeout(() => marcador.innerText = `${this._jugadorQueTieneElTurno.ficha} ha ganado la partida.`, 500);
            empezar.disabled = false;
        } else if (!Tablero.tieneCasillaLibre(Tablero.obtenerPosicion())) {
            document.querySelector('#empate').play();
            setTimeout(() => marcador.innerText = 'La partida ha terminado en empate.', 100);
            empezar.disabled = false;
        } else {
            this._cambiarTurno();
        }
    }
    _juegaMaquina() {
        let coordenadasParaJugar = Maquina.buscarJugada(this._jugadorQueTieneElTurno.ficha);
        let casilla = Tablero.obtenerCasilla(coordenadasParaJugar[0], coordenadasParaJugar[1]);
        Tablero.ponerFichaEnCasilla(this._jugadorQueTieneElTurno.ficha, casilla);
        this.comprobarSituacion();
    }
}