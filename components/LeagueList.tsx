"use client";

import useSWR from "swr";
import { fetcher } from "../lib/api";
import Card from "./Card";

interface League {
  id: string;
  name: string;
  teams: Array<{ id: string; name: string }>;
}

export default function LeagueList() {
  const { data: leagues, error } = useSWR<League[]>("/api/leagues", fetcher);

  if (error) return <p>Erro ao carregar ligas.</p>;
  if (!leagues) return <p>Carregando...</p>;

  return (
    <div>
      {leagues.map((l) => (
        <Card key={l.id}>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{l.name}</p>
              <p className="text-sm text-gray-600">{l.teams.length} times</p>
            </div>
            <button
              className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
              onClick={() => alert(`Entrou na liga "${l.name}"`)}
            >
              Entrar
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
