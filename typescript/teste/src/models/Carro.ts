import { Veiculo } from "./Veiculo";

export class Carro extends Veiculo {
    constructor (
        marca: string,
        modelo: string,
        ano: number,
        preco: number,
        public portas: number
    ) {
        super(marca, modelo, ano, preco);
    }


    exibirDetalhes(): void {
        console.log(`Carro: ${this.marca} ${this.modelo} ${this.ano} - R$ ${this.preco}.toFixed(2) | ${this.portas} portas`);
    }
}