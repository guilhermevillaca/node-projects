import { Endereco } from "./model/Endereco";

export class ViaCepService {
    
    static async buscarEndereco(cep: string): Promise<Endereco | null> {

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json`);
            if(!response.ok){
                throw new Error(`Erro ao consultar o CEP: ${response.statusText}`);
            }

            const data = await response.json();

            if(data.erro){
                console.log("CEP não encontrado!");
                return null;
            }

            return {
                cep: data.cep,
                logradouro: data.logradouro,
                bairro: data.bairro,
                localidade: data.localidade,
                uf: data.uf
            };
        } catch (error) {
            console.error("Erro na requisição:", error);
            return null;
        }

    }
}