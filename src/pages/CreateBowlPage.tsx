import {useRef, useState} from "react";
import {ToppingSelector} from "../components/ToppingSelector";
import {YogurtBowl} from "../components/YogurtBowl";
import type {Topping} from "../types/Topping";
import {CaptureButton} from "../components/CaptureButton";
import {useQuery} from "convex/react";
import {api} from "../../convex/_generated/api";
import {useNavigate} from "react-router-dom";

function CreateBowlPage() {
  const [selectedTopping, setSelectedTopping] = useState<Topping | null>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const onToppingSelect = (topping: Topping) => {
    setSelectedTopping(topping);
  };

  return (
    <div className="z-0 w-screen overflow-x-hidden">
      <ToppingSelector onToppingSelect={onToppingSelect} />
      <YogurtBowl selectedTopping={selectedTopping} ref={captureRef} />
      <CaptureButton ref={captureRef} onClick={() => navigate("/album")} />
    </div>
  );
}

export default CreateBowlPage;
