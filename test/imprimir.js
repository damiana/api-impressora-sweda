const expect = require("chai").expect;
const services = require("../services/imprimir");

describe("Services - Imprimir", function() {
    describe("ImprimirTexto", function() {
        it("Impressão com sucesso", function() {
            let req = {body: { texto: "Teste de impressao"}}
            let retornoEsperado = "impressao efetuada com sucesso.";
            return services.imprimirTexto(req).then(function(retonoSucesso){
                expect(retornoEsperado).to.equal(retonoSucesso);    
            });
        });
        it("Impressão com erro", function() {
            let req = {body: {}}
            let retornoEsperado = "Erro ao imprimir: TypeError: Cannot read property 'length' of undefined";
            return services.imprimirTexto(req).catch(function(retonoErro){
                expect(retornoEsperado).to.equal(retonoErro);
            });
        });

        it("Init com sucesso", function() {
            let retornoEsperado = "inicializada com sucesso";
            return services.init().then(function(retonoErro){
                expect(retornoEsperado).to.equal(retonoErro);
            });
        }); 

        it("ObterStatus - SIM: mecanismo de módulo de impressora", function() {
            let retornoEsperado = "ligado ao mecanismo de módulo de impressora? Sim";
            expect(retornoEsperado).to.equal(services.obterStatus(0,1));
        });

        it("ObterStatus - NAO: mecanismo de módulo de impressora", function() {
            let retornoEsperado = "ligado ao mecanismo de módulo de impressora? Não";
            expect(retornoEsperado).to.equal(services.obterStatus(0,0));
        });

        it("ObterStatus - Fixado em 0", function() {
            let retornoEsperado = 0;
            expect(retornoEsperado).to.equal(services.obterStatus(1,0));
        });

        it("ObterStatus - a tensão é demasiadamente elevada", function() {
            let retornoEsperado = "tensão é mais alta que 9.5V";
            expect(retornoEsperado).to.equal(services.obterStatus(3,1));
        });

        it("ObterStatus - a tensão é normal", function() {
            let retornoEsperado = "tensão é normal";
            expect(retornoEsperado).to.equal(services.obterStatus(3,0));
        });

        it("ObterStatus - temperatura for demasiadamente elevada", function() {
            let retornoEsperado = "a temperatura esteja acima de 60";
            expect(retornoEsperado).to.equal(services.obterStatus(6,1));
        });

        it("ObterStatus - temperatura normal", function() {
            let retornoEsperado = "a temperatura é normal";
            expect(retornoEsperado).to.equal(services.obterStatus(6,0));
        });
    });
});