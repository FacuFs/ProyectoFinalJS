class producto {
    constructor(id, nombre, precio, stock, img, cantidad, categoria) {
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = precio;
        this.stock = stock;
        this.img = img;
        this.cantidad = cantidad;
        this.categoria = categoria;

    }
    //Escribir descuento en el parametro con estructura decimal (0.10 = 10%, 0.25 = 25%, etc.)
    crearDescuento(n) {
        let porcentaje = 1 - n;
        let precioDescuento = this.precio * porcentaje;
        return precioDescuento;
    }
    vender(n) {
        this.stock -= n;
        console.log("El stock de " + this.nombre + " bajo a: " + this.stock);
    }
    agregarCantidad(valor) {
        this.cantidad += valor;
    }
    subtotal() {
        
        return this.cantidad * this.precio;

    }
}