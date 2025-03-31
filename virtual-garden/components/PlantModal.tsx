"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { PlantType } from "@/lib/types"; // ✅ make sure this is exported from your shared types file

type Props = {
  onPlant: (plant: { type: PlantType; name: string }) => void;
};

export default function PlantModal({ onPlant }: Props) {
  const [type, setType] = useState<PlantType>("flower");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!type) return;
    onPlant({ type, name });
    setType("flower");
    setName("");
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Plant a Seed</DialogTitle>
        <DialogDescription>
      Choose a Plant and give your plant a name.
    </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        {/* 🌱 Plant Type Selector */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Plant Type
          </label>
          <Select
            onValueChange={(value) => setType(value as PlantType)}
            defaultValue="flower"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flower">🌼 Flower</SelectItem>
              <SelectItem value="tree">🌳 Tree</SelectItem>
              <SelectItem value="veggie">🥕 Vegetable</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 🏷 Plant Name Input */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Plant Name (optional)
          </label>
          <Input
            placeholder="e.g. Sunny"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <DialogFooter>
        <Button onClick={handleSubmit}>Plant 🌱</Button>
      </DialogFooter>
    </DialogContent>
  );
}
