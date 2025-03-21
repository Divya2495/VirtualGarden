"use client";

import { useState, useEffect } from "react";
import PlantCard from "./PlantCard";
import PlantModal from "./PlantModal";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const GARDEN_SIZE = 12;
const MAX_STAGE = 3;

export default function GardenGrid() {
  const [plants, setPlants] = useState(Array(GARDEN_SIZE).fill(null));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [points, setPoints] = useState(0);

  const handlePlant = (plantData: { type: string; name: string }) => {
    if (selectedIndex === null) return;

    const newPlants = [...plants];
    newPlants[selectedIndex] = {
      ...plantData,
      growthStage: 0,
      collected: false,
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
    const newPlants = [...plants];
    newPlants[index] = null;
    setPlants(newPlants);
    setPoints((prev) => prev + 10); // 🌟 Add points here
  };

  // ⏳ Simulate growth every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlants((prev) =>
        prev.map((plant) => {
          if (!plant) return null;
          if (plant.growthStage >= MAX_STAGE) return plant;
          return {
            ...plant,
            growthStage: plant.growthStage + 1,
          };
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold text-green-900">
          🌟 Points: <span className="font-bold">{points}</span>
        </div>
        <Button
          className="bg-green-800 text-white hover:bg-green-900"
          onClick={() => {
            setPlants(Array(GARDEN_SIZE).fill(null));
            setPoints(0);
          }}
        >
          🔁 Reset Garden
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {plants.map((plant, index) => {
          const isReadyToCollect = plant?.growthStage === MAX_STAGE;

          return (
            <div
              key={index}
              onClick={() => {
                if (isReadyToCollect) {
                  handleCollect(index);
                } else {
                  setSelectedIndex(index);
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                handleRemove(index);
              }}
              className="cursor-pointer"
            >
              <PlantCard plant={plant} readyToCollect={isReadyToCollect} />
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
    </>
  );
}
