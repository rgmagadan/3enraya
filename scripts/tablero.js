class Tablero {
  static columnas = ["a", "b", "c"];
  static filas = ["1", "2", "3"];

  constructor() {
    const contenedor = document.querySelector("#container");
    let casillas = 1;
    const tablero = document.createElement("div");
    const marcador = document.createElement("div");

    tablero.role = "application";
    tablero.id = "tablero";
    marcador.id = "marcador";
    marcador.ariaLive = "polite";

    contenedor.appendChild(marcador);
    contenedor.appendChild(tablero);

    Tablero.filas.forEach((fila) => {
      Tablero.columnas.forEach((columna) => {
        const casilla = document.createElement("div");
        casilla.id = columna + fila;
        casilla.ariaLabel = columna + fila;
        casilla.tabIndex = casillas++;
        casilla.textContent = "·";
        casilla.className = "casilla";
        casilla.role = "button";
        casilla.addEventListener("click", Tablero.manejarCasilla);
        casilla.addEventListener("keydown", Tablero.manejarCasilla);
        tablero.appendChild(casilla);
      });
    });
    this._casillas = [...document.querySelectorAll(".casilla")];
    document.querySelector("#b2").focus();
  }

  ponerFicha(ficha, casilla) {
    casilla.innerText = ficha;
    casilla.ariaLabel = `${ficha}, ${casilla.ariaLabel}`;
    document.querySelector("#movimiento").play();
  }
  obtenerPosicion() {
    return this._casillas.map((casilla, i) => ({
      columna: casilla.id.charAt(0),
      fila: casilla.id.charAt(1),
      ficha: casilla.textContent,
      index: i,
    }));
  }
  obtenerCasilla(i) {
    return this._casillas[i];
  }
  static tieneTresEnRaya(ficha, posicion) {
    // Comprueba columnas
    for (const c of Tablero.columnas) {
      const columna = posicion
        .filter((casilla) => casilla.ficha === ficha && casilla.columna === c)
        .map((casilla) => casilla.index);
      if (columna.length == 3) {
        return { casillas: columna, sentido: "vertical" };
      }
    }
    // comprueba filas
    for (const f of Tablero.filas) {
      const fila = posicion
        .filter((casilla) => casilla.ficha === ficha && casilla.fila === f)
        .map((casilla) => casilla.index);
      if (fila.length == 3) {
        return { casillas: fila, sentido: "horizontal" };
      }
    }
    // Comprueba diagonales
    if (posicion[4].ficha === ficha) {
      const diagonal = [];
      if (posicion[0].ficha === ficha && posicion[8].ficha === ficha) {
        diagonal.push(0, 4, 8);
        return { casillas: diagonal, sentido: "diagonal" };
      } else if (posicion[6].ficha === ficha && posicion[2].ficha === ficha) {
        diagonal.push(6, 4, 2);
        return { casillas: diagonal, sentido: "diagonal" };
      }
    }
    return false;
  }
  static tieneCasillaLibre(posicion) {
    for (const casilla of posicion) {
      if (casilla.ficha === "·") {
        return true;
      }
    }
    return false;
  }
  static obtenerCasillasLibres(posicion) {
    return posicion
      .filter((casilla) => casilla.ficha === "·")
      .map((casilla) => casilla.index);
  }
  rayar(linea, sentido) {
    linea.forEach((index) => {
      this._casillas[index].classList.add("raya");
      this._casillas[index].ariaLabel += `, en raya ${sentido}.`;
    });
  }
  static manejarCasilla(e) {
    if (e.code === "Escape") empezar.focus();
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
      e.target.textContent === "·" &&
      partida.jugadorQueTieneElTurno.tipo === "humano"
    ) {
      partida.tablero.ponerFicha(
        partida.jugadorQueTieneElTurno.ficha,
        e.target
      );
      partida.comprobarSituacion(e.target.id);
    }
  }
}
