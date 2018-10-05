
function imprimirTexto() {

    return new Promise((resolve, reject) => {
        resolve("texto a ser impresso: ");
    });
}

function mostrarStatus() {

    return new Promise((resolve, reject) => {
        resolve("exibir status da impressora: ");
    });
}

module.exports = {
    imprimirTexto,
    mostrarStatus
  };