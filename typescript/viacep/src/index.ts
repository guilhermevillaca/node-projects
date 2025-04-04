import { ViaCepService } from "./services/ViaCepService";

async function main(){
    const cep = "85807594";

    console.log(`Buscando CEP para o CEP: ${cep}...\n`);

    const endereco = await ViaCepService.buscarEndereco(cep);

    if(endereco){
        console.log("Endereço Encontrado:");
        console.log(`CEP: ${endereco.cep}`);
        console.log(`Logradouro: ${endereco.logradouro}`);
        console.log(`Bairro: ${endereco.bairro}`);
        console.log(`Cidade: ${endereco.localidade} - ${endereco.uf}`);
    } else {
        console.log("Não foi possível encontrar o endereço");
    }
}

main();