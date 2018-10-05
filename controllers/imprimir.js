const { responseJson } = require('../utils/controllers');

const servicosImpressora = require('../services/imprimir')

function getTexto(req, res) {
  return servicosImpressora.imprimirTexto()
    .then(texto => responseJson(res, {
      mensagem: texto
    }))
    .catch((err) => responseErrorJson(res, 'servicosImpressora:imprimirTexto', err));
}

function getImagem(req, res) {
  return Promise.resolve(responseJson(res, {
    texto: 'imagem que devera ser impressa'
  }));
}

function getStatus(req, res) {
  return servicosImpressora.mostrarStatus()
  .then(status => responseJson(res, {
    mensagem: status
  }))
  .catch((err) => responseErrorJson(res, 'servicosImpressora:mostrarStatus', err));
}

module.exports = {
  getTexto,
  getImagem,
  getStatus
};