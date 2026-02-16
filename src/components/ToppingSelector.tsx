import strawberry from "../../public/images/toppings/strawberry.png";
import banana from "../../public/images/toppings/banana.png";
import pineapple from "../../public/images/toppings/pineapple.png";
import blueberry from "../../public/images/toppings/blueberry.png";
import cherry from "../../public/images/toppings/cherry.png";
import cashew from "../../public/images/toppings/cashew.png";
import mango from "../../public/images/toppings/mango.png";
import choco from "../../public/images/toppings/choco.png";
import kiwi from "../../public/images/toppings/kiwi.png";
import orange from "../../public/images/toppings/orange.png";
import raspberry from "../../public/images/toppings/raspberry.png";
import { useState } from "react";
import type { Topping } from "../types/Topping";
import { useSound } from "../hooks/useSound";
import hover from "../../public/sound/hover.mp3";
import { useSetAtom } from "jotai";
import { selectedToppingAtom } from "@/stores/createBowl";

const toppings = [
  { id: "strawberry", name: "딸기", image: strawberry },
  { id: "banana", name: "바나나", image: banana },
  { id: "pineapple", name: "파인애플", image: pineapple },
  { id: "blueberry", name: "블루베리", image: blueberry },
  { id: "cherry", name: "체리", image: cherry },
  { id: "cashew", name: "캐슈넛", image: cashew },
  { id: "mango", name: "망고", image: mango },
  { id: "choco", name: "초코", image: choco },
  { id: "kiwi", name: "키위", image: kiwi },
  { id: "orange", name: "오렌지", image: orange },
  { id: "raspberry", name: "라즈베리", image: raspberry },
];

// 토핑 선택 버튼들 (가로로 슬라이더)
// 토핑은 1개씩만 선택할 수 있다
export function ToppingSelector() {
  // 선택한 토핑 set
  const setSelectedTopping = useSetAtom(selectedToppingAtom);
  const [hoverTopping, setHoverTopping] = useState<string>(""); // id

  const playSelectSound = useSound(hover);

  const handleSelect = (topping: Topping) => {
    setSelectedTopping(topping);
    playSelectSound();
  };

  return (
    <div className="relative z-50 flex w-full flex-row flex-nowrap gap-1 overflow-x-scroll overflow-y-hidden px-1" aria-label="토핑 선택">
      {toppings.map((topping) => (
        <div
          key={topping.id}
          className={`relative flex min-w-20 shrink-0 flex-col items-center rounded-lg p-2 ${hoverTopping === topping.id ? "scale-120" : "scale-100"}`}
          onMouseEnter={() => {
            setHoverTopping(topping.id);
          }}
          onMouseLeave={() => {
            setHoverTopping("");
          }}
        >
          <button className="cursor-pointer rounded-full bg-transparent p-2 hover:scale-105 hover:bg-amber-50" onClick={() => handleSelect(topping)} aria-label={`${topping.name} 토핑 선택`}>
            <img src={topping.image} alt={topping.name} className="h-13 w-13 object-contain" />
          </button>
          <span className={`z-50 mt-1 text-sm ${hoverTopping === topping.id ? "visible" : "invisible"} absolute bottom-0`}>{topping.name}</span>
        </div>
      ))}
    </div>
  );
}
