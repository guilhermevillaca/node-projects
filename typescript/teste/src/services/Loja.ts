import { Veiculo } from "../models/Veiculo";

export class Loja {
    private estoque: Veiculo[] = [];

    adicionarVeiculo(veiculo: Veiculo): void {
        this.estoque.push(veiculo);
        console.log(`${veiculo.marca} ${veiculo.modelo} adicionado com sucesso ao estoque`);
    }

    listarEstoque(): void {
        console.log("\n Estoque da loja:")
        if(this.estoque.length === 0){
            console.log("Nenhum veículo disponível");
            return;
        }
        this.estoque.forEach((veiculo) => veiculo.exibirDetalhes());
    }

}