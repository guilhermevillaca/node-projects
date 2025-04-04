import { Veiculo } from "./Veiculo";

export class Moto extends Veiculo {
    constructor(
        marca: string,
        modelo: string,
        ano: number,
        preco: number,
        public cilindradas: number,
        public tipo: string
    ) {
        super(marca, modelo, ano, preco);
    }


    exibirDetalhes(): void {
        console.log(`Moto: ${this.marca} ${this.modelo} ${this.ano} - R$ ${this.preco}.toFixed(2) | ${this.cilindradas} cilindradas e estilo ${this.tipo}`);
    }

}