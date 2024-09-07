class Maquina {
  static CENTRO = 4;
  static ESQUINAS = [0, 2, 6, 8];

  // Buscar jugada óptima
  static buscarJugada(ficha, posicion) {
    const fichaRival = ficha === "X" ? "O" : "X";
    const casillasLibres = Tablero.obtenerCasillasLibres(posicion);

    // 1. Verifica si la máquina puede ganar
    for (let casilla of casillasLibres) {
      if (Maquina.esJugadaGanadora(posicion, casilla, ficha)) return casilla;
    }

    // 2. Verifica si el oponente puede ganar y necesita bloquearlo
    for (let casilla of casillasLibres) {
      if (Maquina.esJugadaGanadora(posicion, casilla, fichaRival)) return casilla;
    }

    // 3. Si la casilla central está libre, la selecciona
    if (casillasLibres.includes(Maquina.CENTRO)) return Maquina.CENTRO;

    // Priorizar esquinas
    const jugadaEsquina = Maquina.priorizarEsquinas(casillasLibres);
    if (jugadaEsquina !== null) return jugadaEsquina;

    // 4. Si no hay jugada ganadora o de bloqueo, elige una casilla aleatoria
    return Maquina.seleccionarJugadaAleatoria(casillasLibres);
  }

  // Verifica si colocar una ficha en una casilla da lugar a tres en raya
  static esJugadaGanadora(posicion, casilla, ficha) {
    posicion[casilla].ficha = ficha;
    const tieneRaya = Tablero.tieneTresEnRaya(ficha, posicion);
    posicion[casilla].ficha = "·";  // Deshacer el cambio temporal
    return tieneRaya;
  }

  // Seleccionar jugada aleatoria
  static seleccionarJugadaAleatoria(casillasLibres) {
    const indexAleatorio = Math.floor(Math.random() * casillasLibres.length);
    return casillasLibres[indexAleatorio];
  }

  // Añadir la preferencia por las esquinas si no hay jugada ganadora
  static priorizarEsquinas(casillasLibres) {
    for (let esquina of Maquina.ESQUINAS) {
      if (casillasLibres.includes(esquina)) return esquina;
    }
    return null;  // No hay esquinas disponibles
  }
  
}
