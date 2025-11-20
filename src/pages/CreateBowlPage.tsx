import { useRef, useState } from "react";
import { ToppingSelector } from "../components/ToppingSelector";
import { YogurtBowl } from "../components/YogurtBowl";
import type { Topping } from "../types/Topping";
import { CaptureButton } from "../components/CaptureButton";
import { useNavigate } from "react-router-dom";

function CreateBowlPage() {
  const [selectedTopping, setSelectedTopping] = useState<Topping | null>(null);
  const [toppingNames, setToppingNames] = useState<string[]>([]);
  const captureRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const onToppingSelect = (topping: Topping) => {
    setSelectedTopping(topping);
  };

  const handleToppingPlaced = (name: string) => {
    setToppingNames((prev) => {
      if (prev.includes(name)) {
        return prev;
      }
      return [...prev, name];
    });
  };

  return (
    <div className="z-0 w-screen overflow-x-hidden">
      <ToppingSelector onToppingSelect={onToppingSelect} />
      <YogurtBowl
        selectedTopping={selectedTopping}
        ref={captureRef}
        onToppingPlaced={handleToppingPlaced}
      />
      <CaptureButton
        ref={captureRef}
        onClick={() => navigate("/album")}
        ingredients={toppingNames}
      />
    </div>
  );
}

export default CreateBowlPage;
