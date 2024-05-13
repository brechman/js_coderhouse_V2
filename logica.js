$(document).ready(function() {
    const listaProductos = $('#lista-productos');
    const tablaBody = $('#tablabody');
    const totalElement = $('#total');
    const finalizarBtn = $('#finalizarBtn');
    const vaciarBtn = $('#vaciarBtn');
    const menuDesplegable = $('#menu-desplegable');
    const botonFlotante = $('#boton-flotante');   
    const overlay = $('.overlay');

    let carrito = [];

   
    

    // Mostrar el carrito y el overlay al hacer clic en el botón flotante
    botonFlotante.click(function() {
        menuDesplegable.toggleClass('oculto');
        overlay.toggle(); 
    });

    // Ocultar el carrito y el overlay al hacer clic en el botón "Seguir comprando"
    $('#cerrar-carrito').click(function() {
        menuDesplegable.removeClass('oculto');
        overlay.hide(); 
    });

   
 
    // Cargar productos desde productos.json al cargar la página
    $.getJSON('productos.json', function(data) {
   
        $.each(data, function(index, producto) {
         
            const productoHTML = `
                <div class="col-md-4 mb-4">
                    <div class="card shadow-sm">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.descripcion}</p>
                            <p class="card-text precio">$${producto.precio.toFixed(2)}</p>
                            <button class="btn btn-primary btn-sm agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            `;

          
            listaProductos.append(productoHTML);
        });

        $('.agregar-carrito').click(function() {
            const productId = $(this).data('id');
            const product = data.find(p => p.id === productId);
        
            if (product) {
               
                agregarAlCarro(product);
            }
        });

     
        mostrarCarrito();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log('Error al cargar productos:', textStatus, errorThrown);
      s
    });

function mostrarMensaje(mensaje) {
        $('#confirmacionModalBody').text(mensaje); 
        $('#confirmacionModal').modal('show'); 
    }

function agregarAlCarro(producto) {
    Swal.fire({
        title: "Felicitaciones!",
        text: `Agregaste ${producto.nombre} al carro 🛒`,
        imageUrl: producto.foto,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: producto.nombre,
        input: 'number',
        inputLabel: 'Cantidad',
        inputValue: 1,  
        inputAttributes: {
            min: 1, 
            step: 1   
        },
        showCancelButton: true,
        confirmButtonText: 'Agregar al carro',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (cantidad) => {
            console.log(`Cantidad seleccionada: ${cantidad}`);

            // Si el producto ya está en el carrito, actualizar la cantidad
            if (carrito.some(p => p.id === producto.id)) {
                const index = carrito.findIndex(p => p.id === producto.id);
                carrito[index].cantidad = parseInt(carrito[index].cantidad) + parseInt(cantidad); 
              } else {
                carrito.push({ ...producto, cantidad: parseInt(cantidad) }); 
              }
      
            // Actualizar el carrito en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));
      
            // Mostrar mensaje de confirmación
            Swal.fire('Agregado!', `${producto.nombre} ha sido agregado al carro.`, 'success');
           
        }
    }).then((result) => {
        if (result.isConfirmed) {
            mostrarCarrito(); 
          }
    });
}
    

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    tablaBody.empty(); 

    let total = 0;
    let cantidadTotal = 0;
     
    // Recorrer el carrito y agregar productos a la tabla
    carrito.forEach(function(producto) {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        cantidadTotal += parseInt(producto.cantidad);
        const filaHTML = `
            <tr>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>
                    <div class="input-group">
                        <input type="number" class="form-control cantidad-input" value="${producto.cantidad}" min="1">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary decrementar-btn" type="button">-</button>
                            <button class="btn btn-outline-secondary incrementar-btn" type="button">+</button>
                        </div>
                    </div>
                </td>
                <td>$${subtotal.toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm eliminar-producto" data-id="${producto.id}">Eliminar</button></td>
            </tr>
        `;
        tablaBody.append(filaHTML);
    });

    // Actualizar el total a pagar
    totalElement.text(`Total a pagar: $${total.toFixed(2)}`);
    $('#cantidad-carrito').text(cantidadTotal);

    // Manejar cambios en la cantidad de productos
    $('.cantidad-input').change(function() {
        const index = $(this).closest('tr').index();
        const newQuantity = parseInt($(this).val());

        if (newQuantity > 0) {
            carrito[index].cantidad = newQuantity;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
        } else {
            // Eliminar el producto si la cantidad es cero o negativa
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
        }
    });

    // Manejar clic en los botones de incrementar/decrementar cantidad
    $('.incrementar-btn').click(function() {
        const index = $(this).closest('tr').index();
        const currentQuantity = parseInt($('.cantidad-input').eq(index).val());
        const newQuantity = currentQuantity + 1;
        carrito[index].cantidad = newQuantity;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
       
    });

    $('.decrementar-btn').click(function() {
        const index = $(this).closest('tr').index();
        const currentQuantity = parseInt($('.cantidad-input').eq(index).val());
        const newQuantity = Math.max(currentQuantity - 1, 1); // No permitir cantidades menores a 1
        carrito[index].cantidad = newQuantity;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
        
    });

    // Manejar clic en el botón "Eliminar" dentro del carrito
    $('.eliminar-producto').click(function() {
        const productId = $(this).data('id');
        const producto = carrito.find(p => p.id === productId);
        if (producto) {
            Swal.fire({
              title: '¿Eliminar producto?',
              text: `¿Estás seguro de que deseas eliminar ${producto.nombre} de tu carrito?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#33d',
              confirmButtonText: 'Sí, eliminar',
              cancelButtonText: 'Cancelar',
              preConfirm: () => {
                carrito = carrito.filter(p => p.id !== productId);
                localStorage.setItem('carrito', JSON.stringify(carrito));
              }
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: '¡Producto eliminado!',
                  text: `${producto.nombre} ha sido eliminado del carrito correctamente.`,
                  icon: 'success',
                  confirmButtonColor: '#32CD32'
                }).then(() => {
                  mostrarCarrito(); // Actualizar la visualización del carrito
                 
                });
              }
            });
          }
    });
}

    // Manejar clic en el botón "Vaciar Carrito"
    vaciarBtn.click(function() {
        mostrarMensaje('¡El carrito fue limpiado! Agregue nuevos productos.');
        carrito = []; // Vaciar el carrito
        localStorage.removeItem('carrito'); // Eliminar el carrito de localStorage
        mostrarCarrito(); // Actualizar la visualización del carrito
       
    });

    // Manejar clic en el botón "Finalizar Compra"
    finalizarBtn.click(function() {
        mostrarMensaje('¡Compra finalizada! Gracias por su compra.');
        carrito = []; // Vaciar el carrito después de la compra
        localStorage.removeItem('carrito'); // Eliminar el carrito de localStorage
        mostrarCarrito(); // Actualizar la visualización del carrito        
    });

    // Cargar el carrito desde localStorage al cargar la página
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
});