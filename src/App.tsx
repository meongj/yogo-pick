import {useState} from "react";
import "./App.css";
import {ToppingSelector} from "./components/ToppingSelector";
import {YogurtBowl} from "./components/YogurtBowl";
import type {Topping} from "./types/Topping";

function App() {
  const [selectedTopping, setSelectedTopping] = useState<Topping | null>(null);

  const onToppingSelect = (topping: Topping) => {
    setSelectedTopping(topping);
  };

  return (
    <div className="z-0">
      <ToppingSelector onToppingSelect={onToppingSelect} />
      <YogurtBowl selectedTopping={selectedTopping} />
    </div>
  );
}

export default App;
