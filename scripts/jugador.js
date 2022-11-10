class Jugador {
    constructor(selector) {
        this._tipo = selector.value;
        this._ficha = selector.id;
    }
    get tipo() {
        return this._tipo;
    }
    get ficha() {
        return this._ficha;
    }
}
