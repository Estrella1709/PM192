const productos=[
    {nombre: "Laptop", precio:12000},
    {nombre: "Mouse", precio:250},
    {nombre: "Teclado", precio:750},
    {nombre: "Monitor", precio:3000},
];

const productosFiltrados = productos.filter(producto => producto.precio > 1000);
const nombre = productosFiltrados.map(producto => producto.nombre);

console.log(nombre);