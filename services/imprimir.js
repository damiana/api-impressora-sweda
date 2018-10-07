const util = require("../utils/controllers");
const Buffer = require('buffer').Buffer;
const request = require('request');
var http = require("http");

function imprimirTexto(req) {
    console.log("imprimirTexto: " + req);
    return new Promise((resolve, reject) => {
        return init().then(function(init) {
            try {

                //TODO: definir o tamanho de caracteres por linhas
                //TODO: verificar como enviar o buffer para a impressora
                let bufferTexto = new Buffer(req.body.texto.length);
                bufferTexto.write(bufferTexto.toString());
                console.log(bufferTexto);
    
                //backup do texto impresso em arquivo txt
                util.gravarTextoImpresso(req.body.texto);
    
                // backup do texto salvo em outra API
                gerarTextoBackup(req.body.texto);

                // pular linha
                let bufferPularLinha = Buffer.from([0x0A,0x0A,0x0A,0x0A,0x0A]);
                //bufferPularLinha.writeInt32BE();
                console.log(bufferPularLinha);
    
                //cortar papel
                let bufferCortarPapel = Buffer.from([0x1D,0x56,0x00]);
                //bufferCortarPapel.writeInt16BE();
                console.log(bufferCortarPapel);

                resolve("impressao efetuada com sucesso.");
            } catch (err) {
                console.log();
                reject("Erro ao imprimir: " + err);
            }
        }).catch(e => reject(e)); // error no init
    });
}

function mostrarStatus() {
    return new Promise((resolve, reject) => {
        return init().then(function(init) {
            try 
            {
                let buffer = new Buffer(7);
                buffer = Buffer.from([0x1B, 0x76]);
                buffer[1] = 2

                //TODO: verificar como passar parametro de saida para obter o byte de retorno.
                resolve(obterStatus(buffer[1], 0));
            } catch (err) {
                reject("Erro ao imprimir: " + err);
            }
        }).catch(e => reject(e)); // error no init
    });
}

function init() {
    return new Promise((resolve, reject) => {
        try {
            let buffer = new Buffer([0x1B, 0x40]);
            //buffer.write();
            console.log(buffer);
            resolve("inicializada com sucesso");
        } catch(err){
            console.log("Erro ao inicializar impressora: " + err);
            reject("Erro ao inicializar impressora: " + err);
        }
    });
}
function obterStatus(buffer, posicao) {
    let retorno = null;
    if (buffer == 0) { // ligado ao mecanismo de módulo de impressora 
        if (posicao == 0) {
            retorno = "ligado ao mecanismo de módulo de impressora? Não";
        } else if (posicao == 1) {
            retorno = "ligado ao mecanismo de módulo de impressora? Sim";
        }

    } else if (buffer == 1 || buffer == 4 || buffer == 5 || buffer == 7) { // Fixado em 0.
        retorno = 0;

    } else if (buffer == 2) { // papel presente ou não
        if (posicao == 0) {
            retorno = "papel presente";
        } else if (posicao == 1) {
            retorno = "papel não presente";
        }
    } else if (buffer == 3) { // tensão é demasiadamente elevada
        if (posicao == 0) {
            retorno = "tensão é normal";
        } else if (posicao == 1) {
            retorno = "tensão é mais alta que 9.5V";
        }
    } else if (buffer == 6) { // tensão é demasiadamente elevada
        if (posicao == 0) {
            retorno = "a temperatura é normal";
        } else if (posicao == 1) {
            retorno = "a temperatura esteja acima de 60";
        }
    }
    return retorno;
}

function gerarTextoBackup(texto) {
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/json'
    }
    
    var options = {
        host: "localhost",
        port: 3050,
        headers: headers,
        path: '/v1/gravarTexto',
        method: 'POST'
    };

    var reqPost = http.request(options, function(res) {
        //console.log("statusCode: ", res.statusCode);
        res.on('data', function(d) {
            console.info('POST result:\n');
            console.info(d);
            process.stdout.write(d);
        });
    });

    jsonObject = JSON.stringify({
        "texto" : texto,
    });

    reqPost.write(jsonObject);
    reqPost.end();
    reqPost.on('error', function(e) {
        console.error(e);
    });
}
module.exports = {
    imprimirTexto,
    mostrarStatus,
    init,
    obterStatus
  };