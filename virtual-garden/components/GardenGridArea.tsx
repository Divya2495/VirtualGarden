import PlantCard from "./PlantCard";
import { PlantType } from "@/lib/types";

type Plant = {
  type: PlantType;
  name: string;
  growthStage: number;
  lastGrowth?: number;
};

type Props = {
  plants: (Plant | null)[];
  collectedInfo: { index: number; points: number } | null;
  onClick: (index: number) => void;
  onRightClick: (index: number) => void;
};

export default function GardenGridArea({ plants, collectedInfo, onClick, onRightClick }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
      {plants.map((plant, index) => {
        const isReadyToCollect = plant?.growthStage === 3;
        return (
          <div
            key={index}
            onClick={() => onClick(index)}
            onContextMenu={(e) => {
              e.preventDefault();
              onRightClick(index);
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
  );
}
