class Maquina {
  static buscarJugada(ficha) {
    let fichaRival = ficha == "X" ? "O" : "X";
    let posicion = Tablero.obtenerPosicion();
    let coordenadasDeCasillas = Tablero.obtenerCasillasLibres(posicion);

    for (let coordenadas of coordenadasDeCasillas) {
      posicion[coordenadas[0]][coordenadas[1]] = ficha;
      if (Tablero.tieneTresEnRaya(ficha, posicion)) {
        return coordenadas;
      }
      posicion[coordenadas[0]][coordenadas[1]] = "·";
    }

    for (let coordenadas of coordenadasDeCasillas) {
      posicion[coordenadas[0]][coordenadas[1]] = fichaRival;
      if (Tablero.tieneTresEnRaya(fichaRival, posicion)) {
        return coordenadas;
      }
      posicion[coordenadas[0]][coordenadas[1]] = "·";
    }

    for (let coordenadas of coordenadasDeCasillas) {
      if (coordenadas[0] == 1 && coordenadas[1] == 1) {
        return coordenadas;
      }
    }

    return coordenadasDeCasillas[
      Math.floor(Math.random() * coordenadasDeCasillas.length)
    ];
  }
}
