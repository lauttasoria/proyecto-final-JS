
// Función para cargar el carrito desde localStorage
const cargarCarrito = () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        return JSON.parse(carritoGuardado);
    }
    return [];
};

// Función para guardar el carrito en localStorage
const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const contenedorProductos = document.getElementById('misProductos');

let carrito = cargarCarrito();
fetch("./db/productos.json")
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        console.log(datos);
        misProductos(datos);
    })
    .catch((error) => console.log(error));

function misProductos(productos) {
    productos.forEach((producto) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-content">
                <img class="product-img" src="${producto.img}" alt="${producto.nombre}" />
                <h2 class="product-name">${producto.nombre}</h2>
                <p class="product-price">$${producto.precio}</p>
                <button class="add-to-cart-btn" id="boton${producto.id}">Comprar</button>
            </div>
        `;
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id, productos);

            Toastify({
                text: "Producto Agregado",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #debd1c, #96c93d)",
                },
                onClick: function() {} // Callback after click
            }).showToast();
        });
    });
}

const agregarAlCarrito = (id, productos) => {
    const producto = productos.find((producto) => producto.id === id);
    carrito.push(producto);
    guardarCarrito();
    actualizarCarrito();
    console.log(carrito);
};
