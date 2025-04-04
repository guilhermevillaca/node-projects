"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moto = void 0;
const Veiculo_1 = require("./Veiculo");
class Moto extends Veiculo_1.Veiculo {
    constructor(marca, modelo, ano, preco, cilindradas, tipo) {
        super(marca, modelo, ano, preco);
        this.cilindradas = cilindradas;
        this.tipo = tipo;
    }
    exibirDetalhes() {
        console.log(`Moto: ${this.marca} ${this.modelo} ${this.ano} - R$ ${this.preco}.toFixed(2) | ${this.cilindradas} cilindradas e estilo ${this.tipo}`);
    }
}
exports.Moto = Moto;
