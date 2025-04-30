import PlayerList from "../../components/PlayerList";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <PlayerList />
    </div>
  );
}
