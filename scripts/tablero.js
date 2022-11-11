class Tablero {
    static posicionInicial() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                tablero.rows[i].cells[j].innerText = '·';
            }
        }
    }
    static ponerManejadores() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (tablero.rows[i].cells[j].textContent == '·') {
                    tablero.rows[i].cells[j].onclick = ponerFicha;
                }
            }
        }
    }
    static quitarManejadores() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (tablero.rows[i].cells[j].onclick != '') {
                    tablero.rows[i].cells[j].onclick = '';
                }
            }
        }
    }
    static ponerFichaEnCasilla(ficha, casilla) {
        casilla.innerText = ficha;
        document.querySelector('#movimiento').play();
        casilla.onclick = '';
    }
    static obtenerPosicion() {
        let posicion = [Array(3), Array(3), Array(3)];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                posicion[i][j] = tablero.rows[i].cells[j].textContent;
            }
        }
        return posicion;
    }
    static obtenerCasilla(i, j) {
        return tablero.rows[i].cells[j];
    }
    static tieneTresEnRaya(ficha, posicion) {
        for (let i = 0; i < posicion.length; i++) {
            let cuenta = 0;
            for (let j = 0; j < posicion.length; j++) {
                cuenta += (posicion[j][i] == ficha) ? 1 : 0;
            }
            if (cuenta == 3) {
                return true;
            }
        }
        for (let i = 0; i < posicion.length; i++) {
            let cuenta = 0;
            for (let j = 0; j < posicion.length; j++) {
                cuenta += (posicion[i][j] == ficha) ? 1 : 0;
            }
            if (cuenta == 3) {
                return true;
            }
        }
        let diagonal1 = 0;
        let diagonal2 = 0;
        for (let i = 0; i < posicion.length; i++) {
            diagonal1 += (posicion[i][i] == ficha) ? 1 : 0;
        }
        for (let i = 0, j = 2; i < posicion.length && j >= 0; i++, j--) {
            diagonal2 += (posicion[i][j] == ficha) ? 1 : 0;
        }
        return (diagonal1 == 3 || diagonal2 == 3) ? true : false;
    }
    static tieneCasillaLibre(posicion) {
        for (let i = 0; i < posicion.length; i++) {
            for (let j = 0; j < posicion.length; j++) {
                if (posicion[i][j] == '·') {
                    return true;
                }
            }
        }
        return false;
    }
    static obtenerCasillasLibres(posicion) {
        let casillas = [];
        for (let i = 0; i < posicion.length; i++) {
            for (let j = 0; j < posicion.length; j++) {
                if (posicion[i][j] == '·') {
                    casillas.push([i, j]);
                }
            }
        }
        return casillas;
    }

}