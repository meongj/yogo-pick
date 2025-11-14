import {useRef, useState} from "react";
import "./App.css";
import {ToppingSelector} from "./components/ToppingSelector";
import {YogurtBowl} from "./components/YogurtBowl";
import type {Topping} from "./types/Topping";
import {CaptureButton} from "./components/CaptureButton";

function App() {
  const [selectedTopping, setSelectedTopping] = useState<Topping | null>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const onToppingSelect = (topping: Topping) => {
    setSelectedTopping(topping);
  };

  return (
    <div className="z-0 w-screen overflow-x-hidden">
      <ToppingSelector onToppingSelect={onToppingSelect} />
      <YogurtBowl selectedTopping={selectedTopping} ref={captureRef} />
      <CaptureButton ref={captureRef} />
    </div>
  );
}

export default App;
