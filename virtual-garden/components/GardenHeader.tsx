import { PlantType } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type Props = {
  isNight: boolean;
  points: number;
  collectedCounts: Record<PlantType, number>;
  onBuy: (type: PlantType) => void;
};

export default function GardenHeader({ isNight, points, collectedCounts, onBuy }: Props) {
  return (
    <div className={`text-xl font-semibold ${isNight ? "text-green-300" : "text-green-900"}`}>
      {/* 🌟 Points with Popover to buy seeds */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="cursor-pointer inline-block">
            🌟 Points: <span className="font-bold">{points}</span>
          </div>
        </PopoverTrigger>
        <PopoverContent className={`w-48 space-y-2 text-sm ${isNight ? "bg-green-950 text-green-200 border-green-700" : ""}`}>
          <Button
            onClick={() => onBuy("flower")}
            disabled={points < 5}
            className="w-full justify-start"
            variant="outline"
            size="sm"
          >
            Buy 🌼 (5 pts)
          </Button>
          <Button
            onClick={() => onBuy("veggie")}
            disabled={points < 10}
            className="w-full justify-start"
            variant="outline"
            size="sm"
          >
            Buy 🥕 (10 pts)
          </Button>
          <Button
            onClick={() => onBuy("tree")}
            disabled={points < 15}
            className="w-full justify-start"
            variant="outline"
            size="sm"
          >
            Buy 🌳 (15 pts)
          </Button>
        </PopoverContent>
      </Popover>

      {/* 🧾 Collected stats */}
      <div className={`text-sm mt-2 space-y-1 ${isNight ? "text-green-200" : "text-gray-800"}`}>
        Collected Resources
        <div>🌼 Flowers: {collectedCounts.flower}</div>
        <div>🥕 Veggies: {collectedCounts.veggie}</div>
        <div>🌳 Trees: {collectedCounts.tree}</div>
      </div>
    </div>
  );
}
