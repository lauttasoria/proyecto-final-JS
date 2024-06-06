const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Cargar el carrito al inicio
console.log(carrito);
let tabla = document.getElementById("tabla");

carrito.forEach(element => {
    tabla.innerHTML += `
    <tr>
        <td>${element.id}</td>
        <td>${element.nombre}</td>
        <td>$${element.precio}</td>
    </tr>
    `;
});

let totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
let infoTotal = document.getElementById("monto");
infoTotal.innerText = "Total a pagar $: " + totalCarrito;


