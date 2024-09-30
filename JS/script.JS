const productos = [
    { nombre: "Chocolate en Barras", precio: 1000, imagen: "images/chocolate1.jpg" , descripcion: "Delicioso chocolate oscuro con un 70% de cacao." },
    { nombre: "Chocolate Surtidos", precio: 2000, imagen: "images/chocolate2.jpg", descripcion: "Chocolate en barra surtidos y bombones." },
    { nombre: "Bombones Surtidos", precio: 3000, imagen: "images/chocolate3.jpg", descripcion: "Bombones rellenos especiales, ideal para los amantes de sabores exoticos." },
    { nombre: "Figuras", precio: 4000, imagen: "images/chocolate4.jpg", descripcion: "Figuras creadas a pedido, solicitar con anticipacion." }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = calcularTotal();

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    actualizarCarrito();
});

function mostrarProductos() {
    const listaProductos = document.getElementById('lista-productos');
    productos.forEach((producto) => {
        const div = document.createElement('div');
        div.classList.add('producto');

        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>$${producto.precio.toFixed(2)}</p>
            <button class="agregar-carrito">Agregar al Carrito</button>
        `;

        const button = div.querySelector('.agregar-carrito');
        button.addEventListener('click', () => {
            agregarAlCarrito(producto);
        });

        listaProductos.appendChild(div);
    });
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
    total += producto.precio;
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;

        const eliminarButton = document.createElement('button');
        eliminarButton.textContent = 'Eliminar';
        eliminarButton.addEventListener('click', () => {
            eliminarDelCarrito(index);
        });

        li.appendChild(eliminarButton);
        listaCarrito.appendChild(li);
    });

    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

function eliminarDelCarrito(index) {
    const precio = carrito[index].precio;
    carrito.splice(index, 1);
    total -= precio;
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function calcularTotal() {
    return carrito.reduce((sum, item) => sum + item.precio, 0);
}
