import strawberry from "../../public/images/toppings/strawberry.png";
import banana from "../../public/images/toppings/banana.png";
import pineapple from "../../public/images/toppings/pineapple.png";
import blueberry from "../../public/images/toppings/blueberry.png";
import cherry from "../../public/images/toppings/cherry.png";
import cashew from "../../public/images/toppings/cashew.png";
import mango from "../../public/images/toppings/mango.png";
import {useState} from "react";
import type {Topping} from "../types/Topping";
import {useSound} from "../hooks/useSound";
import hover from "../../public/sound/hover.mp3";

interface ToppingSelectorProps {
  onToppingSelect: (topping: Topping) => void;
}

const toppings = [
  {id: "strawberry", name: "딸기", image: strawberry},
  {id: "banana", name: "바나나", image: banana},
  {id: "pineapple", name: "파인애플", image: pineapple},
  {id: "blueberry", name: "블루베리", image: blueberry},
  {id: "cherry", name: "체리", image: cherry},
  {id: "cashew", name: "캐슈넛", image: cashew},
  {id: "mango", name: "망고", image: mango},
];

// 토핑 선택 버튼들 (가로로 슬라이더)
// 토핑은 1개씩만 선택할 수 있다
export function ToppingSelector({onToppingSelect}: ToppingSelectorProps) {
  const [hoverTopping, setHoverTopping] = useState<string>(""); // id

  const playHover = useSound(hover);

  const handleSelect = (topping: Topping) => {
    onToppingSelect(topping);
    playHover();
  };

  return (
    <div
      className="flex flex-row gap-1 px-1 z-50 relative overflow-x-auto overflow-y-hidden flex-nowrap w-full"
      aria-label="토핑 선택">
      {toppings.map((topping) => (
        <div
          key={topping.id}
          className={`flex flex-col items-center p-2 rounded-lg relative flex-shrink-0 min-w-[80px] ${hoverTopping === topping.id ? "scale-120" : "scale-100"}`}
          onMouseEnter={() => {
            setHoverTopping(topping.id);
          }}
          onMouseLeave={() => {
            setHoverTopping("");
          }}>
          <button
            className="bg-transparent hover:bg-amber-50 rounded-full p-2 cursor-pointer"
            onClick={() => handleSelect(topping)}
            aria-label={`${topping.name} 토핑 선택`}>
            <img src={topping.image} alt={topping.name} className="w-13 h-13 object-contain" />
          </button>
          <span
            className={`mt-1 text-sm z-50 ${hoverTopping === topping.id ? "visible" : "invisible"} absolute bottom-0 `}>
            {topping.name}
          </span>
        </div>
      ))}
    </div>
  );
}
