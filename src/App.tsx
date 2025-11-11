import {useState} from "react";
import "./App.css";
import {ToppingSelector} from "./components/ToppingSelector";
import {YogurtBowl} from "./components/YogurtBowl";
import strawberry from "../public/images/toppings/strawberry.png";

function App() {
  const [isSelectd, setIsSelectd] = useState<boolean>(false);
  const [toppingImage, setToppingImage] = useState<string>(strawberry);

  const onToppingSelect = (image: string) => {
    setIsSelectd(true);
    setToppingImage(image);
  };

  return (
    <>
      <ToppingSelector onToppingSelect={onToppingSelect} />
      <YogurtBowl isSelectd={isSelectd} toppingImage={toppingImage} />
    </>
  );
}

export default App;
