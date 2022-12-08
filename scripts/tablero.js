class Tablero {
  constructor() {
    this._casillas = [];

    const contenedor = document.querySelector("#container");
    let casillas = 1;
    const columnas = ["a", "b", "c"];
    const div = document.createElement("div");
    const tabla = document.createElement("table");
    const caption = document.createElement("caption");

    div.role = "application";
    tabla.id = "tablero";
    caption.id = "marcador";
    caption.ariaLive = "polite";

    contenedor.appendChild(div);
    div.id = "juego";
    div.appendChild(tabla);
    tabla.appendChild(caption);

    for (let fila = 1; fila <= columnas.length; fila++) {
      const tr = document.createElement("tr");
      tabla.appendChild(tr);
      columnas.forEach((columna) => {
        const td = document.createElement("td");
        this._casillas.push(td);
        td.id = columna + fila.toString();
        td.tabIndex = casillas++;
        td.ariaLabel = columna + fila.toString();
        td.textContent = "·";
        td.role = "button";
        td.addEventListener("click", ponerFicha);
        td.addEventListener("keydown", ponerFicha);

        tr.appendChild(td);
      });
    }
    document.querySelector("#b2").focus();
  }
  ponerFichaEnCasilla(ficha, casilla) {
    casilla.innerText = ficha;
    casilla.ariaLabel = `${ficha}, ${casilla.ariaLabel}`;
    document.querySelector("#movimiento").play();
  }
  obtenerPosicion() {
    return this._casillas
    .map((casilla) => casilla.id + casilla.textContent);
  }
  obtenerCasilla(i) {
    return this._casillas[i];
  }
  static tieneTresEnRaya(ficha, posicion, rayar) {
    // Comprueba columnas
    const pos = posicion.map(casilla => casilla.charAt(0) + casilla.charAt(2)).filter((casilla) => casilla.charAt(1) === ficha)
      .map((casilla) => casilla.charAt(0));
      const letra =
      pos.filter((letra) => letra === "a").length == 3
      ? "a"
      : pos.filter((letra) => letra === "b").length == 3
      ? "b"
      : pos.filter((letra) => letra === "c").length == 3
      ? "c"
      : "";
    if (letra != "") {
      const casillas = [];
      for (let i = 1; i <= 3; i++) {
        casillas.push(document.querySelector("#" + letra + i));
      }
      Tablero.rayar(casillas, "vertical", rayar);
      return true;
    }
    // comprueba filas
    const posFilas = posicion.map(casilla => casilla.charAt(1) + casilla.charAt(2)).filter((casilla) => casilla.charAt(1) === ficha)
      .map((casilla) => casilla.charAt(0));
      const fila =
      posFilas.filter((n) => n === "1").length == 3
      ? "1"
      : posFilas.filter((n) => n === "2").length == 3
      ? "2"
      : posFilas.filter((n) => n === "3").length == 3
      ? "3"
      : "";
    if (fila != "") {
      const casillasFila = [];
        casillasFila.push(document.querySelector("#a" + fila));
        casillasFila.push(document.querySelector("#b" + fila));
        casillasFila.push(document.querySelector("#c" + fila));

        Tablero.rayar(casillasFila, "horizontal", rayar);
        return true;
    }
    // Comprueba diagonales
    if (posicion[4].charAt(2) === ficha) {
const diagonal = [];
if (posicion[0].charAt(2) === ficha && posicion[8].charAt(2) === ficha) {
diagonal.push(a1, b2, c3);
Tablero.rayar(diagonal, "diagonal", rayar);
return true;
} else if (posicion[6].charAt(2) === ficha && posicion[2].charAt(2) === ficha) {
diagonal.push(a3, b2, c1);
Tablero.rayar(diagonal, "diagonal", rayar);
return true;
  }
}
      return false;
  }
  static tieneCasillaLibre(posicion) {
    for (let casilla of posicion) {
      if (casilla.charAt(2) === '·') {
          return true;
    }
  }
    return false;
  }
  static obtenerCasillasLibres(posicion) {
    let casillas = [];
    posicion.forEach((casilla, i) => {
      if (casilla.charAt(2) === '·') {
        casillas.push(i);
      }
    });
    return casillas;
  }
  static rayar(linea, sentido, rayar) {
    if (rayar) {
      linea.forEach((casilla) => {
        casilla.className = "raya";
        casilla.ariaLabel += `, en raya ${sentido}.`;
      });
    }
  }
}
