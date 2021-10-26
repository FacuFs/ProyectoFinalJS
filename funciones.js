//Funcion para generar la interfaz de los productos
function interfazProductos(productos, id) {

    $(id).empty();
    for (const producto of productos) {

        $(id).append(`   
        <div class="productos">   
        <h2>${producto.nombre}</h2>
        <img src="${producto.img}" class="imgProductos"> 
        <h4>$ ${producto.precio} </h4>
        <h4 id="producto${producto.id}Stock">Stock: ${producto.stock}</h4>
        <button id="${producto.id}" class="btnCompra">Comprar</button>
        </div>`);
    }

}

//Funcion para accionar el boton "Comprar"
function comprar() {
    const seleccionado = productos.find(producto => producto.id == this.id);

    if (carrito.includes(seleccionado)) {
        seleccionado.agregarCantidad(1);
        
    } else {
        carrito.push(seleccionado);
        seleccionado.agregarCantidad(1);
    }

    seleccionado.stock -=1;

    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    interfazCarrito(carrito);
}

//Funcion para generar la interfaz de los productos en el carrito
function interfazCarrito(productos) {
    $("#cantidadCarrito").html(carrito.length);
    $("#productosCarrito").empty();
    for (const producto of productos) {
        $("#productosCarrito").append(` <div class="productosCarrito__individuales">
                                        <p>${producto.nombre}</p>
                                        <p>$${producto.precio}</p>
                                        <p>${producto.cantidad}</p>
                                        <p>${producto.subtotal()}</p>
                                        <button id="${producto.id}" class="btnAgregar">+</button>
                                        <button id="${producto.id}" class="btnSubstraer">-</button>
                                        <button id="${producto.id}" class="btnBorrar">x</button>
                                        </div>`)
    }
    $('#productosCarrito').append(`<p id="totalCarrito"> TOTAL ${totalCarrito(productos)}</p>`)


    $(".btnBorrar").click(eliminarCarrito);
    $(".btnAgregar").click(agregarCant);
    $(".btnSubstraer").click(substraerCant);

}

//funcion para calcular el precio total de los productos en el carrito
function totalCarrito(carrito) {
    let total = 0;
    carrito.forEach(p => total += p.subtotal());
    return total;
}

//Funcion para accionar el boton que elimina un producto del carrito de compras
function eliminarCarrito() {
    const seleccionado = productos.find(producto => producto.id == this.id);
    let posicion = carrito.findIndex(producto => producto.id == this.id);
    carrito.splice(posicion, 1);
    seleccionado.cantidad=0;
    interfazCarrito(carrito);

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Funcion para accionar el boton que agrega una unidad de un producto del carrito de compras
function agregarCant() {
    const seleccionado = productos.find(producto => producto.id == this.id);
    seleccionado.agregarCantidad(1);
    let registroUI = $(this).parent().children();
    registroUI[2].innerHTML = seleccionado.cantidad;
    registroUI[3].innerHTML = seleccionado.subtotal();
    $("#totalCarrito").html(`TOTAL ${totalCarrito(carrito)}`);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Funcion para accionar el boton que elimina una unidad de un producto del carrito de compras
function substraerCant() {
    const seleccionado = productos.find(producto => producto.id == this.id);
    seleccionado.agregarCantidad(-1);
    if (seleccionado.cantidad<=0 || seleccionado.cantidad==undefined) {
        eliminarCarrito();
    }
    let registroUI = $(this).parent().children();
    registroUI[2].innerHTML = seleccionado.cantidad;
    registroUI[3].innerHTML = seleccionado.subtotal();
    $("#totalCarrito").html(`TOTAL ${totalCarrito(carrito)}`);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function filtroCat(array, selector) {
    $(selector).empty();
    array.forEach(e => {
        $(selector).append(`<option value='${e}'>${e}</option>`);
    })
    $(selector).prepend(`<option value='TODOS' selected>TODOS</option>`)
}


//Funcion para abrir el carrito
function abrirCarrito() {
    if (carritoAbierto==false) {
        $("#carrito").fadeIn("fast");
        carritoAbierto=true;
        cerrarFiltro();
    }else{
        $("#carrito").fadeOut("fast");
        carritoAbierto=false;
    }
    
   
}

//Funcion para cerrar el carrito
function cerrarCarrito() {
    $("#carrito").fadeOut("fast");
    carritoAbierto=false;
}

//Funcion para abrir el filtro
function abrirFiltro() {
    if (filtroAbierto==false) {
        $("#filtro").fadeIn("fast");
        filtroAbierto=true;
        cerrarCarrito();
    }else{
        $("#filtro").fadeOut("fast");
        filtroAbierto=false;
    }
}

//Funcion para cerrar el filtro
function cerrarFiltro() {
    $("#filtro").fadeOut("fast");
    filtroAbierto=false;
}