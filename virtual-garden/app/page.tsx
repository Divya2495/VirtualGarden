import GardenGrid from "@/components/GardenGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-6">🌿 My Virtual Garden</h1>
        <GardenGrid />
      </div>
    </main>
  );
}
