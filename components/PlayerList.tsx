"use client";

import useSWR from "swr";
import { fetcher } from "../lib/api";
import { useTeam } from "../context/TeamContext";
import Card from "./Card";

type Player = {
  id: string;
  name: string;
  position: string;
  price: number;
};

export default function PlayerList() {
  const { data: players, error } = useSWR<Player[]>("/api/players", fetcher);
  const { budget, buyPlayer, roster } = useTeam();

  if (error) return <p>Falha ao carregar jogadores.</p>;
  if (!players) return <p>Carregando...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Jogadores — Orçamento: R${budget}
      </h2>
      {players
        .filter((p) => !roster.some((r) => r.id === p.id))
        .sort((a, b) => b.price - a.price)
        .map((p) => (
          <Card key={p.id}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-600">{p.position}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">R${p.price}</span>
                <button
                  disabled={p.price > budget}
                  onClick={() => buyPlayer(p)}
                  className={`px-3 py-1 rounded transition 
                    ${
                      p.price > budget
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }
                  `}
                >
                  Comprar
                </button>
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
}
