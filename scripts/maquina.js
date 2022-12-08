class Maquina {
  static buscarJugada(ficha, posicion) {
    let fichaRival = ficha == "X" ? "O" : "X";
const casillasLibres = Tablero.obtenerCasillasLibres(posicion);

let raya = Maquina.probarFicha(posicion, casillasLibres, ficha);
if (raya != false) {
  return raya;
} else {
   raya = Maquina.probarFicha(posicion, casillasLibres, fichaRival);
   if (raya != false) {
    return raya;
   }
}


    for (let casilla of casillasLibres) {
      if (casilla == 4) {
        return casilla;
      }
    }

    return casillasLibres[
      Math.floor(Math.random() * casillasLibres.length)
    ];
  }
  static probarFicha(posicion, casillasLibres, ficha) {
    for (let casilla of casillasLibres) {
      posicion[casilla] = posicion[casilla].substring(0,2) + ficha;
     if (Tablero.tieneTresEnRaya(ficha, posicion, false)) {
       return casilla;
     }
     posicion[casilla] = posicion[casilla].substring(0,2) + '·';
   }
   return false;
  }

}
