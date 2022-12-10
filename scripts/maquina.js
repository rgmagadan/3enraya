class Maquina {
  static buscarJugada(ficha, posicion) {
    let fichaRival = ficha == "X" ? "O" : "X";
    const casillasLibres = Tablero.obtenerCasillasLibres(posicion);

    let raya = Maquina.probarFicha(posicion, casillasLibres, ficha);
    if (raya) return raya;
    raya = Maquina.probarFicha(posicion, casillasLibres, fichaRival);
    if (raya) return raya;

    for (let casilla of casillasLibres) {
      if (casilla == 4) {
        return casilla;
      }
    }

    return casillasLibres[Math.floor(Math.random() * casillasLibres.length)];
  }
  static probarFicha(posicion, casillasLibres, ficha) {
    for (let casilla of casillasLibres) {
      posicion[casilla].ficha = ficha;
      const raya = Tablero.tieneTresEnRaya(ficha, posicion);
      if (raya) {
        return casilla;
      }
      posicion[casilla].ficha = "·";
    }
    return false;
  }
}
