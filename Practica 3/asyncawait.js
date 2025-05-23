function obtenerDatos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Datos obtenidos correctamente");
    }, 2000); 
  });
}

async function ejecutar() {
  console.log("Obteniendo datos...");
  const resultado = await obtenerDatos();
  console.log(resultado);
}

ejecutar();

