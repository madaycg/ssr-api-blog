/**
 * Esta función me permite validar si el rol especificado puede hacer alguna 
 * de las operaciones especificadas 
 * 
 * @param rol: El rol de usuario
 * @param operations: Array de operaciones a comprobar
 * @returns boolean: Si el rol puede hacer alguna operacion
 */
function can(rol, operations) {
  return operations.some((operation) => !!rol[operation]);
}

module.exports = can;
