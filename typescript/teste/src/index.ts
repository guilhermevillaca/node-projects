import { Carro } from "./models/Carro";
import { Moto } from "./models/Moto";
import { Loja } from "./services/Loja";

const loja = new Loja();

//criando carros
const carro1 = new Carro("Toyota", "Corolla", 2023, 145000, 4);
const carro2 = new Carro("Honda", "Civic", 2018, 62000, 4);

//criando motos
const moto1 = new Moto("Yamaha", "Tenere 250", 2015, 15000, 250, "Trail");
const moto2 = new Moto("Honda", "XRE 300", 2012, 12000, 300, "Trail");
const moto3 = new Moto("Royal Enfield", "Super Meteor", 2024, 35000, 650, "Custom");

//adicionando ao estoque
loja.adicionarVeiculo(carro1);
loja.adicionarVeiculo(carro2);
loja.adicionarVeiculo(moto1);
loja.adicionarVeiculo(moto2);
loja.adicionarVeiculo(moto3);

//Listando o estoque
loja.listarEstoque();