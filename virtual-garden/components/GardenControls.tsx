import { Button } from "@/components/ui/button";
import { PlantType } from "@/lib/types";

type Props = {
    isNight: boolean;
    resources: Record<PlantType, number>;
    onToggleNight: () => void;
    onReset: () => void;
};

export default function GardenControls({ isNight, resources, onToggleNight, onReset }: Props) {
    return (
        <div className={`flex flex-col gap-2 items-end font-semibold text-sm ${isNight ? "text-green-200" : "text-gray-800"}`}>
            <div className="flex gap-2">
                <Button onClick={onReset} className="bg-green-800 text-white hover:bg-green-900">
                    🔁 Reset Garden
                </Button>
                <Button onClick={onToggleNight}>
                    {isNight ? "☀️ Day" : "🌙 Night"}
                </Button>
                {/* <button
  onClick={onToggleNight}
  className={`px-4 py-2 rounded-md font-semibold transition ${
    isNight
      ? "bg-yellow-600 text-black hover:bg-yellow-700"
      : "bg-green-800 text-white hover:bg-green-900"
  }`}
>
  {isNight ? "☀️ Day" : "🌙 Night"}
</button> */}

            </div>
            <div className={`${isNight ? "text-green-300" : "text-gray-700"} mt-1 text-right`}>
                Remaining Resources
                <div>🌼 Seeds: {resources.flower}</div>
                <div>🥕 Seeds: {resources.veggie}</div>
                <div>🌳 Seeds: {resources.tree}</div>
            </div>
        </div>
    );
}
