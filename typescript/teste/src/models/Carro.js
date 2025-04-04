"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carro = void 0;
const Veiculo_1 = require("./Veiculo");
class Carro extends Veiculo_1.Veiculo {
    constructor(marca, modelo, ano, preco, portas) {
        super(marca, modelo, ano, preco);
        this.portas = portas;
    }
    exibirDetalhes() {
        console.log(`Carro: ${this.marca} ${this.modelo} ${this.ano} - R$ ${this.preco}.toFixed(2) | ${this.portas} portas`);
    }
}
exports.Carro = Carro;
