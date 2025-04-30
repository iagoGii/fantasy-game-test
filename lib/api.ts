async function simulateDelay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

import players from "../mocks/players";
import teams from "../mocks/teams";
import leagues from "../mocks/leagues";

type Endpoint = "/api/players" | "/api/teams" | "/api/leagues";

export async function fetcher<T>(url: Endpoint): Promise<T> {
  await simulateDelay(300);

  switch (url) {
    case "/api/players":
      return players as unknown as T;
    case "/api/teams":
      return teams as unknown as T;
    case "/api/leagues":
      return leagues as unknown as T;
  }
}

export async function createTeam(data: { name: string }): Promise<any> {
  await simulateDelay(200);
  return {
    id: Date.now().toString(),
    name: data.name,
    players: [],
  };
}
