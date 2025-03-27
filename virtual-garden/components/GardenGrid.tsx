"use client";

import { useState, useEffect } from "react";
import PlantCard from "./PlantCard";
import PlantModal from "./PlantModal";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlantType } from "@/lib/types";


type Plant = {
  type: PlantType;
  name: string;
  growthStage: number;
  lastGrowth?: number;
};

const GARDEN_SIZE = 16;
const MAX_STAGE = 3;

export default function GardenGrid() {
  const [plants, setPlants] = useState<(Plant | null)[]>(Array(GARDEN_SIZE).fill(null));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [points, setPoints] = useState(0);
  const [isNight, setIsNight] = useState(false);

  const [collectedInfo, setCollectedInfo] = useState<{
    index: number;
    points: number;
  } | null>(null);

  const [collectedCounts, setCollectedCounts] = useState<Record<PlantType, number>>({
    flower: 0,
    veggie: 0,
    tree: 0,
  });

  const handlePlant = (plantData: { type: PlantType; name: string }) => {
    if (selectedIndex === null) return;

    const newPlants = [...plants];
    newPlants[selectedIndex] = {
      ...plantData,
      growthStage: 0,
      lastGrowth: Date.now(),
    };
    setPlants(newPlants);
    setSelectedIndex(null);
  };

  const handleRemove = (index: number) => {
    if (!plants[index]) return;
    const newPlants = [...plants];
    newPlants[index] = null;
    setPlants(newPlants);
  };

  const handleCollect = (index: number) => {
    const plant = plants[index];
    if (!plant) return;

    const pointsByType: Record<PlantType, number> = {
      flower: 10,
      veggie: 25,
      tree: 50,
    };

    const reward = pointsByType[plant.type];

    setCollectedInfo({ index, points: reward });
    setTimeout(() => setCollectedInfo(null), 800);

    const newPlants = [...plants];
    newPlants[index] = null;
    setPlants(newPlants);
    setPoints((prev) => prev + reward);

    setCollectedCounts((prev) => ({
      ...prev,
      [plant.type]: prev[plant.type] + 1,
    }));
  };

  // ⏳ Simulate growth per type
  useEffect(() => {
    const interval = setInterval(() => {
      setPlants((prevPlants) =>
        prevPlants.map((plant) => {
          if (!plant || plant.growthStage >= MAX_STAGE) return plant;

          const delayByType: Record<PlantType, number> = {
            flower: 5,
            veggie: 7,
            tree: 10,
          };

          const stageTime = delayByType[plant.type];
          const now = Date.now();
          const lastGrowth = plant.lastGrowth || now;
          const elapsedSeconds = (now - lastGrowth) / 1000;

          if (elapsedSeconds < stageTime) return plant;

          return {
            ...plant,
            growthStage: plant.growthStage + 1,
            lastGrowth: now,
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="fixed inset-0 overflow-hidden">
      {/* 🌞 Daytime video */}
      {!isNight && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/MorningBackground.mov" type="video/mp4" />
        </video>
      )}

      {/* 🌙 Night video */}
      {isNight && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/NightBackground.mov" type="video/mp4" />
        </video>
      )}

      {/* 🌿 UI */}
      <div className="min-h-screen p-6 relative z-10">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <div className={`text-xl font-semibold ${isNight ? "text-green-300" : "text-green-900"}`}>
            🌟 Points: <span className="font-bold">{points}</span>
            <div className="text-sm mt-1 flex gap-4">
              <span>🌼 Flowers: {collectedCounts.flower}</span>
              <span>🥕 Veggies: {collectedCounts.veggie}</span>
              <span>🌳 Trees: {collectedCounts.tree}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-green-800 text-white hover:bg-green-900"
              onClick={() => {
                setPlants(Array(GARDEN_SIZE).fill(null));
                setPoints(0);
                setCollectedCounts({ flower: 0, veggie: 0, tree: 0 });
              }}
            >
              🔁 Reset Garden
            </Button>
            <Button onClick={() => setIsNight(!isNight)}>
              {isNight ? "☀️ Day" : "🌙 Night"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
          {plants.map((plant, index) => {
            const isReadyToCollect = plant?.growthStage === MAX_STAGE;
            return (
              <div
                key={index}
                onClick={() => {
                  if (isReadyToCollect) {
                    handleCollect(index);
                  } else if (!plants[index]) {
                    setSelectedIndex(index);
                  }
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleRemove(index);
                }}
                className="cursor-pointer"
              >
                <div className="relative">
                  <PlantCard plant={plant} readyToCollect={isReadyToCollect} />
                  {collectedInfo?.index === index && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-yellow-400 font-bold animate-fade-up-out pointer-events-none select-none text-sm">
                      +{collectedInfo.points}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Dialog
          open={selectedIndex !== null}
          onOpenChange={() => setSelectedIndex(null)}
        >
          {selectedIndex !== null && <PlantModal onPlant={handlePlant} />}
        </Dialog>
      </div>
    </main>
  );
}
