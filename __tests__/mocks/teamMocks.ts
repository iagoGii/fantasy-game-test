// Mock manual para simular a função createTeam
export const mockCreateTeam = async (teamData: { name: string }) => {
  if (teamData.name === "Time A") {
    return { id: "1", name: "Time A", players: [] };
  } else {
    throw new Error("Erro ao criar time");
  }
};