export interface League {
  id: string;
  name: string;
  teams: Array<{ id: string; name: string }>;
}

const leagues: League[] = [
  { id: "1", name: "Série A 2025", teams: [] },
  { id: "2", name: "Série B 2025", teams: [] },
  { id: "3", name: "Ligas Privadas", teams: [] },
];

export default leagues;
