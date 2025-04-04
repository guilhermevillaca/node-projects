"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loja = void 0;
class Loja {
    constructor() {
        this.estoque = [];
    }
    adicionarVeiculo(veiculo) {
        this.estoque.push(veiculo);
        console.log(`${veiculo.marca} ${veiculo.modelo} adicionado com sucesso ao estoque`);
    }
    listarEstoque() {
        console.log("\n Estoque da loja:");
        if (this.estoque.length === 0) {
            console.log("Nenhum veículo disponível");
            return;
        }
        this.estoque.forEach((veiculo) => veiculo.exibirDetalhes());
    }
}
exports.Loja = Loja;
