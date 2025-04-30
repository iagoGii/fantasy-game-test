export interface Player {
  id: string;
  name: string;
  position: string;
  price: number;
}

const players: Player[] = [
  { id: "1", name: "Gustavo Gómez", position: "Zagueiro", price: 15 },
  { id: "2", name: "Marinho", position: "Atacante", price: 18 },
  { id: "3", name: "Arrascaeta", position: "Meio-campo", price: 20 },
  { id: "4", name: "Pedro", position: "Atacante", price: 22 },
  { id: "5", name: "Emerson Palmeira", position: "Lateral", price: 14 },
  { id: "6", name: "Diego Alves", position: "Goleiro", price: 17 },
  { id: "7", name: "Willian Arão", position: "Volante", price: 16 },
  { id: "8", name: "Gabriel Martinelli", position: "Atacante", price: 19 },
  { id: "9", name: "Nino", position: "Zagueiro", price: 13 },
  { id: "10", name: "Raphael Veiga", position: "Meio-campo", price: 21 },
  { id: "11", name: "Guilherme Arana", position: "Lateral", price: 16 },
  { id: "12", name: "Jailson", position: "Goleiro", price: 14 },
  { id: "13", name: "Gustavo Henrique", position: "Atacante", price: 18 },
  { id: "14", name: "Lucas Lima", position: "Meio-campo", price: 17 },
  { id: "15", name: "Roger Guedes", position: "Atacante", price: 20 },
];

export default players;
