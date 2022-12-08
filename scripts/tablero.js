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
        td.textContent = '·';
        td.role = 'button';
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
  static tieneTresEnRaya(ficha, posicion, rayar) {
    // Comprueba columnas
    for (let i = 0; i < posicion.length; i++) {
      let cuenta = [];
      for (let j = 0; j < posicion.length; j++) {
        if (posicion[j][i] == ficha) {
          cuenta.push(tablero.rows[j].cells[i]);
        }
      }
      if (cuenta.length == 3) {
        Tablero.rayar(cuenta, 'vertical', rayar);
        return true;
      }
    }
    // comprueba filas
    for (let i = 0; i < posicion.length; i++) {
      let cuenta = [];
      for (let j = 0; j < posicion.length; j++) {
        if (posicion[i][j] == ficha) {
          cuenta.push(tablero.rows[i].cells[j]);
        }
      }
      if (cuenta.length == 3) {
        Tablero.rayar(cuenta, 'horizontal', rayar);
        return true;
      }
    }
    // Comprueba diagonales
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < posicion.length; i++) {
      if (posicion[i][i] == ficha) {
        diagonal1.push(tablero.rows[i].cells[i]);
      }
    }
    for (let i = 0, j = 2; i < posicion.length && j >= 0; i++, j--) {
      if (posicion[i][j] == ficha) {
        diagonal2.push(tablero.rows[i].cells[j]);
      }
    }
    if (diagonal1.length == 3) {
      Tablero.rayar(diagonal1, 'diagonal', rayar);
      return true;
    } else if (diagonal2.length == 3) {
      Tablero.rayar(diagonal2, 'diagonal', rayar);
      return true;
    } else {
      return false;
    }
  }
  static tieneCasillaLibre(posicion) {
    for (let i = 0; i < posicion.length; i++) {
      for (let j = 0; j < posicion.length; j++) {
        if (posicion[i][j] == "·") {
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
        if (posicion[i][j] == "·") {
          casillas.push([i, j]);
        }
      }
    }
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
