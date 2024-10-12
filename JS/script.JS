let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = calcularTotal();
let productos = [];

fetch("JS/data.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        mostrarProductos(); 
    });
    function mostrarProductos() {
        const contenedor = document.getElementById('lista-productos');
        contenedor.innerHTML = ''; 
    
        productos.forEach(producto => {
            const divProducto = document.createElement('div');
            divProducto.classList.add('producto');
    
            divProducto.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" />
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Descripcion: ${producto.descripcion}</p>
                <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
            `;
    
            contenedor.appendChild(divProducto);
    
            const botonAgregar = divProducto.querySelector('.agregar-carrito');
            botonAgregar.addEventListener('click', () => agregarAlCarrito(producto));
        });
    }

    function agregarAlCarrito(producto) {
        const index = carrito.findIndex(item => item.id === producto.id);
        if (index !== -1) {
            carrito[index].cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
    
        total = calcularTotal();
        actualizarCarrito();
        guardarCarritoEnLocalStorage();
    
        Swal.fire({
            icon: 'success',
            title: '¡Producto Agregado!',
            text: `${producto.nombre} ha sido agregado al carrito.`,
            confirmButtonText: 'Aceptar'
        });
    }
    
    function actualizarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        listaCarrito.innerHTML = '';
    
        carrito.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} - $${item.precio.toFixed(2)} x ${item.cantidad}`;
    
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
        if (index >= 0 && index < carrito.length) {
            carrito[index].cantidad -= 1;
    
            if (carrito[index].cantidad === 0) {
                carrito.splice(index, 1);
            }
    
            total = calcularTotal();
            actualizarCarrito();
            guardarCarritoEnLocalStorage();
    
            Swal.fire({
                icon: 'info',
                title: '¡Producto Eliminado!',
                text: `Se ha eliminado un ${carrito[index] ? carrito[index].nombre : 'producto'}.`,
                confirmButtonText: 'Aceptar'
            });
        }
    }
    
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    
    function calcularTotal() {
        return carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    }
    

