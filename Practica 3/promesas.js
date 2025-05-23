function verificarUsuario(usuario) {
  return new Promise((acceso, sinacceso) => {
    if (usuario === "admin") {
      acceso("Acceso concedido");
    } else {
      sinacceso("Acceso denegado");
    }
  });
}
// Pruebas
verificarUsuario("admin")
  .then(res => console.log(res))
  .catch(err => console.log(err));

verificarUsuario("Isay")
  .then(res => console.log(res))
  .catch(err => console.log(err));

