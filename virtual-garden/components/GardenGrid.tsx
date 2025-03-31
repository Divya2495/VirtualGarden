"use client";

import { useState, useEffect } from "react";
import GardenHeader from "./GardenHeader";
import GardenControls from "./GardenControls";
import GardenGridArea from "./GardenGridArea";
import PlantModal from "./PlantModal";
import { Dialog } from "@/components/ui/dialog";
import { PlantType } from "@/lib/types";
import GardenBackground from "./GardenBackground";

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
  const [resources, setResources] = useState<Record<PlantType, number>>({
    flower: 10,
    veggie: 7,
    tree: 5,
  });
  const [collectedCounts, setCollectedCounts] = useState<Record<PlantType, number>>({
    flower: 0,
    veggie: 0,
    tree: 0,
  });
  const [collectedInfo, setCollectedInfo] = useState<{
    index: number;
    points: number;
  } | null>(null);

  // 🌱 Handle planting
  const handlePlant = (plantData: { type: PlantType; name: string }) => {
    if (selectedIndex === null) return;
    if (resources[plantData.type] <= 0) {
      alert(`No more ${plantData.type}s available.`);
      return;
    }

    const newPlants = [...plants];
    newPlants[selectedIndex] = {
      ...plantData,
      growthStage: 0,
      lastGrowth: Date.now(),
    };
    setPlants(newPlants);
    setResources((prev) => ({
      ...prev,
      [plantData.type]: prev[plantData.type] - 1,
    }));
    setSelectedIndex(null);
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

  const handleBuy = (type: PlantType) => {
    const cost: Record<PlantType, number> = {
      flower: 5,
      veggie: 10,
      tree: 15,
    };
    if (points < cost[type]) return;
    setPoints((prev) => prev - cost[type]);
    setResources((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const handleRemove = (index: number) => {
    const newPlants = [...plants];
    newPlants[index] = null;
    setPlants(newPlants);
  };

  const handlePlantClick = (index: number) => {
    const isReady = plants[index]?.growthStage === MAX_STAGE;
    if (isReady) {
      handleCollect(index);
    } else if (!plants[index]) {
      setSelectedIndex(index);
    }
  };

  const toggleNight = () => setIsNight((prev) => !prev);

  const resetGarden = () => {
    setPlants(Array(GARDEN_SIZE).fill(null));
    setPoints(0);
    setCollectedCounts({ flower: 0, veggie: 0, tree: 0 });
    setResources({ flower: 10, veggie: 7, tree: 5 });
  };

  // 🌿 Growth interval
  useEffect(() => {
    const interval = setInterval(() => {
      setPlants((prev) =>
        prev.map((plant) => {
          if (!plant || plant.growthStage >= MAX_STAGE) return plant;
          const delay: Record<PlantType, number> = { flower: 5, veggie: 7, tree: 10 };
          const time = delay[plant.type];
          const now = Date.now();
          if ((now - (plant.lastGrowth || now)) / 1000 < time) return plant;

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
      <GardenBackground isNight={isNight} />

      <div className="min-h-screen p-6 relative z-10">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <GardenHeader
            isNight={isNight}
            points={points}
            collectedCounts={collectedCounts}
            onBuy={handleBuy}
          />
          <GardenControls
            isNight={isNight}
            onReset={resetGarden}
            onToggleNight={toggleNight}
            resources={resources}
          />
        </div>

        <GardenGridArea
          plants={plants}
          collectedInfo={collectedInfo}
          onClick={handlePlantClick}
          onRightClick={handleRemove}
        />

        <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
          {selectedIndex !== null && <PlantModal onPlant={handlePlant} />}
        </Dialog>
      </div>
    </main>
  );
}
