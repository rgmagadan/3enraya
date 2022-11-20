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
    _cambiarTurno(idCasilla) {
        this._jugadorQueTieneElTurno = (this._jugadorQueTieneElTurno.ficha == 'X') ? this._jugadorO : this._jugadorX;
        if (this._jugadorQueTieneElTurno.tipo == 'humano') {
        setTimeout(() => marcador.innerText = `${idCasilla}. Es el turno de ${this._jugadorQueTieneElTurno.ficha}`, 100);
        }
        if (this._jugadorQueTieneElTurno.tipo == 'maquina') {
            setTimeout(() => this._juegaMaquina(), 500);
        }
    }
    colocarPosicionInicial() {
        marcador.innerText = 'Es el turno de ' + this._jugadorQueTieneElTurno.ficha;
        Tablero.posicionInicial();
        Tablero.ponerManejadores();
        if (this._jugadorQueTieneElTurno.tipo == 'maquina') {
            this._juegaMaquina();
        }
    }
    comprobarSituacion(idCasilla) {
        if (Tablero.tieneTresEnRaya(this._jugadorQueTieneElTurno.ficha, Tablero.obtenerPosicion())) {
            document.querySelector('#victoria').play();
            setTimeout(() => marcador.innerText = `${idCasilla}. ${this._jugadorQueTieneElTurno.ficha} ha ganado la partida.`, 500);
            empezar.disabled = false;
        } else if (!Tablero.tieneCasillaLibre(Tablero.obtenerPosicion())) {
            document.querySelector('#empate').play();
            setTimeout(() => marcador.innerText = `${idCasilla}. La partida ha terminado en empate.`, 100);
            empezar.disabled = false;
        } else {
            this._cambiarTurno(idCasilla);
        }
    }
    _juegaMaquina() {
        let coordenadasParaJugar = Maquina.buscarJugada(this._jugadorQueTieneElTurno.ficha);
        let casilla = Tablero.obtenerCasilla(coordenadasParaJugar[0], coordenadasParaJugar[1]);
        Tablero.ponerFichaEnCasilla(this._jugadorQueTieneElTurno.ficha, casilla);
        this.comprobarSituacion(casilla.id);
    }
}