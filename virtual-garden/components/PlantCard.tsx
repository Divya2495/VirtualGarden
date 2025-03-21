import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export default function PlantCard({
  plant,
  readyToCollect,
}: {
  plant: any;
  readyToCollect?: boolean;
}) {
  const getEmoji = () => {
    if (!plant) return "❌";
    const stage = plant.growthStage ?? 0;
    if (stage === 0) return "🌱";
    if (stage === 1) return "🌿";
    if (stage === 2) return "🪴";
    if (stage === 3)
      return plant.type === "flower"
        ? "🌼"
        : plant.type === "tree"
        ? "🌳"
        : "🥕";
    return "❓";
  };

  const color =
    plant?.type === "flower"
      ? "border-yellow-400"
      : plant?.type === "tree"
      ? "border-green-600"
      : plant?.type === "veggie"
      ? "border-orange-500"
      : "border-gray-300";

  return (
    <Card
      className={`h-28 flex items-center justify-center border-2 ${color} transition`}
    >
      <CardContent className="flex flex-col items-center justify-center">
        {plant ? (
          readyToCollect ? (
            <div className="text-center">
              <span className="text-2xl animate-bounce">✨ {getEmoji()}</span>
              <p className="text-xs mt-1 text-green-700 font-semibold">
                Ready to Collect
              </p>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-2xl">{getEmoji()}</span>
              </TooltipTrigger>
              <TooltipContent side="top">
                {plant.name || "Unnamed Plant"}
              </TooltipContent>
            </Tooltip>
          )
        ) : (
          <span className="text-gray-400 text-sm">Plant Here</span>
        )}
      </CardContent>
    </Card>
  );
}
