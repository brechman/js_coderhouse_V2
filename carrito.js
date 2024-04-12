// Función para mostrar la lista de productos disponibles
function mostrarProductosDisponibles() {
    let mensaje = 'Productos Disponibles:\n\n';
    productos.forEach(producto => {
        mensaje += `ID: ${producto.id} - ${producto.nombre} - Precio: $${producto.precio}\n`;
        mensaje += `Descripción: ${producto.descripcion}\n\n`;
    });
    alert(mensaje);
}

// Función para filtrar productos por precio
function filtrarProductosPorPrecio(precioMaximo) {
    let productosFiltrados = productos.filter(producto => producto.precio <= precioMaximo);
    let mensaje = `Productos con precio igual o inferior a $${precioMaximo}:\n\n`;
    productosFiltrados.forEach(producto => {
        mensaje += `ID: ${producto.id} - ${producto.nombre} - Precio: $${producto.precio}\n`;
        mensaje += `Descripción: ${producto.descripcion}\n\n`;
    });
    alert(mensaje);
}

// Función para buscar un producto por nombre
function buscarProductoPorNombre(nombre) {
    let productoEncontrado = productos.find(producto => producto.nombre.toLowerCase().includes(nombre.toLowerCase()));
    if (productoEncontrado) {
        let mensaje = `Producto encontrado:\n\nID: ${productoEncontrado.id} - ${productoEncontrado.nombre} - Precio: $${productoEncontrado.precio}\n`;
        mensaje += `Descripción: ${productoEncontrado.descripcion}`;
        alert(mensaje);
    } else {
        alert(`No se encontró ningún producto con el nombre "${nombre}".`);
    }
}

// Función para agregar productos al carrito de compras
function agregarProductosAlCarrito() {
    let carrito = [];
    let totalAPagar = 0;

    while (true) {
       // mostrarProductosDisponibles();

        let opcion = parseInt(prompt('¿Qué desea hacer?\n1. Ver productos disponibles\n2. Filtrar productos por precio\n3. Buscar producto por nombre\n4. Agregar productos al carrito\n5. Finalizar la compra'));

        switch (opcion) {
            case 1:
                mostrarProductosDisponibles();
                break;
            case 2:
                let precioMaximo = parseInt(prompt('Ingrese el precio máximo para filtrar productos:'));
                filtrarProductosPorPrecio(precioMaximo);
                break;
            case 3:
                let nombreProducto = prompt('Ingrese el nombre del producto a buscar:');
                buscarProductoPorNombre(nombreProducto);
                break;
            case 4:

            let continuarAgregando = true;

            while (continuarAgregando) {
                let mensaje_productos ='Ingresa el ID del producto que deseas agregar al carrito (0 para finalizar la compra):\n\n';
                     mensaje_productos += 'Productos Disponibles:\n\n';
                    productos.forEach(producto => {
                        mensaje_productos += `ID: ${producto.id} - ${producto.nombre} - Precio: $${producto.precio}\n`;
                        mensaje_productos += `Descripción: ${producto.descripcion}\n\n`;
                    });
                   
                let idProducto = parseInt(prompt(mensaje_productos));
                if (idProducto === 0) {
                    let mensajeCarrito = '\nContenido del Carrito:\n\n';
                    if (carrito.length > 0) {
                        carrito.forEach(producto => {
                            mensajeCarrito += `${producto.nombre} - Precio: $${producto.precio}\n`;
                        });
                        mensajeCarrito += `\nTotal a pagar: $${totalAPagar}`;
                    } else {
                        mensajeCarrito += 'El carrito de compras está vacío.';
                    }
                    alert(mensajeCarrito);
                    return;
                }

                let productoSeleccionado = productos.find(producto => producto.id === idProducto);
                if (productoSeleccionado) {
                    carrito.push(productoSeleccionado);
                    totalAPagar += productoSeleccionado.precio;
                    alert(`Producto "${productoSeleccionado.nombre}" agregado al carrito.`);
                } else {
                    alert('ID de producto inválido. Introduce un ID válido.');
                }

                // Preguntar al usuario si desea agregar más productos
                let respuesta = prompt('¿Deseas agregar más productos al carrito? (s/n)');
                if (respuesta.toLowerCase() !== 's') {
                    let mensajeCarrito = '\nContenido del Carrito:\n\n';
                    if (carrito.length > 0) {
                        carrito.forEach(producto => {
                            mensajeCarrito += `${producto.nombre} - Precio: $${producto.precio}\n`;
                        });
                        mensajeCarrito += `\nTotal a pagar: $${totalAPagar}`;
                    } else {
                        mensajeCarrito += 'El carrito de compras está vacío.';
                    }
                    alert(mensajeCarrito);
                    continuarAgregando = false;
                }
            }

                break;
            case 5:
                let mensajeCarrito = '\nContenido del Carrito:\n\n';
                if (carrito.length > 0) {
                    carrito.forEach(producto => {
                        mensajeCarrito += `${producto.nombre} - Precio: $${producto.precio}\n`;
                    });
                    mensajeCarrito += `\nTotal a pagar: $${totalAPagar}`;
                } else {
                    mensajeCarrito += 'El carrito de compras está vacío.';
                }
                alert(mensajeCarrito);
                return;
            default:
                alert('Opción inválida. Introduce un número válido.');
                break;
        }
    }
}

// Llamar a la función para agregar productos al carrito de compras
agregarProductosAlCarrito();