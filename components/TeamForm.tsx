"use client";

import { useState } from "react";
import { createTeam } from "../lib/api";
import Container from "./Container";

interface TeamResponse {
  id: string;
  name: string;
  players: any[];
}

export default function TeamForm() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const team = await createTeam({ name });
      setStatus(`Time "${team.name}" criado (ID ${team.id})`);
      setName("");
    } catch {
      setStatus("Erro ao criar time.");
    }
  }

  return (
    <Container>
      <h2 className="text-xl font-semibold mb-4">Criar Novo Time</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Nome do Time"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Criar
        </button>
      </form>
      {status && <p className="mt-2 text-gray-700">{status}</p>}
    </Container>
  );
}
