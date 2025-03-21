"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
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

type Props = {
  onPlant: (plant: { type: string; name: string }) => void;
};

export default function PlantModal({ onPlant }: Props) {
  const [type, setType] = useState("flower");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    onPlant({ type, name });
    setType("flower");
    setName("");
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Plant a Seed</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Plant Type
          </label>
          <Select onValueChange={(value) => setType(value)} defaultValue="flower">
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
