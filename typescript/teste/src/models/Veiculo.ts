export abstract class Veiculo {
    constructor(
        public marca: string,
        public modelo: string,
        public ano: number,
        public preco: number
    ) {

    }

    abstract exibirDetalhes(): void;

}