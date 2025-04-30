"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import type { Player } from "../mocks/players";

interface TeamContextData {
  budget: number;
  roster: Player[];
  buyPlayer: (p: Player) => void;
  removePlayer: (id: string) => void;
}

const TeamContext = createContext<TeamContextData | undefined>(undefined);

export function TeamProvider({ children }: { readonly children: ReactNode }) {
  const INITIAL_BUDGET = 100;
  const [budget, setBudget] = useState(INITIAL_BUDGET);
  const [roster, setRoster] = useState<Player[]>([]);

  function buyPlayer(p: Player) {
    if (budget - p.price < 0) {
      alert("Orçamento insuficiente!");
      return;
    }
    if (roster.find((x) => x.id === p.id)) {
      alert("Jogador já no time!");
      return;
    }
    setRoster((r) => [...r, p]);
    setBudget((b) => b - p.price);
  }

  function removePlayer(id: string) {
    const toRemove = roster.find((x) => x.id === id);
    if (!toRemove) return;
    setRoster((r) => r.filter((x) => x.id !== id));
    setBudget((b) => b + toRemove.price);
  }

  const contextValue = useMemo(
    () => ({ budget, roster, buyPlayer, removePlayer }),
    [budget, roster, buyPlayer, removePlayer]
  );

  return (
    <TeamContext.Provider value={contextValue}>{children}</TeamContext.Provider>
  );
}

export function useTeam() {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error("useTeam must be inside TeamProvider");
  return ctx;
}
