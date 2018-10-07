const fs = require('fs');

'use strict';
const HttpStatus = require('http-status-codes');

function responseJson(res, data, code = HttpStatus.OK) {
  res.status(code);
  return res.json(data);
}

function responseErrorJson(res, methodName, error, code = HttpStatus.INTERNAL_SERVER_ERROR) {
  res.status(error.httpCode || code);
  return res.json({
    error: error.message || error.toString()
  });
}

function gravarTextoImpresso(texto) {
  let stream = fs.createWriteStream(new Date().toISOString()+".txt");
  stream.once('open', function(fd) {
    stream.write(texto);
    stream.end();
  });
}
module.exports = exports = {
  responseJson,
  responseErrorJson,
  gravarTextoImpresso
};
