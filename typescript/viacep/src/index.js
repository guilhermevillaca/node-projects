"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ViaCepService_1 = require("./services/ViaCepService");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const cep = "85807594";
        console.log(`Buscando CEP para o CEP: ${cep}...\n`);
        const endereco = yield ViaCepService_1.ViaCepService.buscarEndereco(cep);
        if (endereco) {
            console.log("Endereço Encontrado:");
            console.log(`CEP: ${endereco.cep}`);
            console.log(`Logradouro: ${endereco.logradouro}`);
            console.log(`Bairro: ${endereco.bairro}`);
            console.log(`Cidade: ${endereco.localidade} - ${endereco.uf}`);
        }
        else {
            console.log("Não foi possível encontrar o endereço");
        }
    });
}
main();
