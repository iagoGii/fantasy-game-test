export interface Team {
  id: string;
  name: string;
  players: any[];
}

const teams: Team[] = [
  { id: "1", name: "Time 1", players: [] },
  { id: "2", name: "Time 2", players: [] },
];

export default teams;
