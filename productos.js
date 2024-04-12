class Producto{
    constructor(id, nombre, precio, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}

// Crear una lista de productos de tecnología
const productos= [
    new Producto(1, 'Laptop', 1200, 'Potente laptop para trabajo y entretenimiento'),
    new Producto(2, 'Teléfono inteligente', 800, 'Teléfono avanzado con pantalla OLED y cámara de alta resolución'),
    new Producto(3, 'Tableta', 500, 'Tableta ligera y versátil para tareas diarias'),
    new Producto(4, 'Monitor curvo', 600, 'Monitor de alta definición con diseño curvo para una experiencia envolvente'),
    new Producto(5, 'Impresora láser', 300, 'Impresora rápida y eficiente para documentos de alta calidad')
];

// Mostrar la lista de productos en la consola
//console.log(productos);