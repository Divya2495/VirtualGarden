import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";


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
      className={`h-28 flex items-center justify-center border-2 ${color} bg-cover bg-center`}
      style={{
        backgroundImage: 'url("/images/soil-bg.jpg")',
      }}
    >
      <CardContent className="flex flex-col items-center justify-center overflow-visible">
        {plant ? (
          readyToCollect ? (
            <div className="text-center">
              <span
                className={`text-2xl ${plant?.growthStage === 0 ? 'animate-scale-in' : ''
                  }`}
              >
                {getEmoji()}
              </span>

              <p className="text-yellow-300 text-xs mt-1 font-semibold">
                🌟 Ready to Collect
              </p>
            </div>
          ) : (
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="text-2xl">{getEmoji()}</span>
              </HoverCardTrigger>
              <HoverCardContent className="w-48 text-sm bg-white border shadow rounded-lg z-50">
                <div className="font-semibold mb-1">{plant?.name || "Unnamed Plant"}</div>
                <div>Type: {plant?.type || "Unknown"}</div>
                <div>Stage: {plant?.growthStage ?? 0} / 3</div>
              </HoverCardContent>
            </HoverCard>
          )
        ) : (
          <span className="text-black-400 text-sm">Plant Here</span>
        )}
      </CardContent>
    </Card>
  );
}
