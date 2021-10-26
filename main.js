
//Creo las arrays
const categorias= ["VELAS", "SALES", "SPRAY", "ACEITES", "OTROS"];
const productos = [];
const carrito = [];


window.addEventListener("load", () => {
    $("body").fadeIn("fast", () => {
        $("#cargando").fadeOut("slow");
    });

})
$(document).ready(function () {

    const URLGET = "data/producto.json";
    $.get(URLGET, function (datos, estado) {
        if (estado == "success") {
            for (const literal of datos) {
                productos.push(new producto(literal.id, literal.nombre, literal.precio, literal.stock, literal.img, literal.cantidad, literal.categoria));
            }
        }

        interfazProductos(productos, "#contenedor__productos");

        const botones = document.getElementsByClassName("btnCompra");
        for (const boton of botones) {
            boton.addEventListener("click", comprar);
        }
    })

    if ("carrito" in localStorage) {
        const datosGuardados = JSON.parse(localStorage.getItem("carrito"));
        for (const literal of datosGuardados) {
            carrito.push(new producto(literal.id, literal.nombre, literal.precio, literal.stock, literal.img, literal.cantidad))
        }
        interfazCarrito(carrito);
    }

})


$("#busqueda").keypress(function (e) {
    const criterio = this.value.toUpperCase();
    const encontrado = productos.filter(producto => producto.nombre.includes(criterio) || producto.categoria.includes(criterio));
    interfazProductos(encontrado, "#contenedor__productos");
});

let carritoAbierto=false;
let filtroAbierto=false;


$("#btnCarrito").click(abrirCarrito);
$("#cerrarCarrito").click(cerrarCarrito);
$("#btnFiltro").click(abrirFiltro);
$("#cerrarFiltro").click(cerrarFiltro);

filtroCat(categorias, "#filtroCat");

$("#filtroCat").change(function (e) { 
    const value= e.target.value;
    const filtrados = productos.filter(p=> p.categoria == value)
    interfazProductos(filtrados, "#contenedor__productos");
    if (value=="TODOS") {
        interfazProductos(productos, "#contenedor__productos");
    }
    
});

$(".inputPrecio").change(function (e) { 
    const min= $("#minPrecio").val();
    const max= $("#maxPrecio").val();

    if ((min>0)&&(max>0)) {
        const encontrados=productos.filter(p=>p.precio >= min && p.precio<=max);
        console.log(encontrados)
        interfazProductos(encontrados,"#contenedor__productos");
    }

});

