import {useEffect, useState} from "react";
import yogartBowl from "../../public/images/bowl/yogartBowl.png";
import type {Topping} from "../types/Topping";
import pop from "../../public/sound/pop.mp3";
import {useSound} from "../hooks/useSound";

interface YogurtBowlProps {
  selectedTopping: Topping | null;
  ref?: React.Ref<HTMLDivElement>;
}

export function YogurtBowl({selectedTopping, ref}: YogurtBowlProps) {
  // 마우스 위치
  const [mousePos, setMousePos] = useState({x: 0, y: 0});
  // 클릭한 위치와 어떤 이미지 인지
  const [placedImages, setPlacedImages] = useState<{x: number; y: number; id: string; image: string}[]>([]);

  const playPlaceSound = useSound(pop);

  // 마우스무브 이벤트리스너 추가
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({x: e.clientX, y: e.clientY});
    };

    window.addEventListener("mousemove", handleMouseMove);
    // cleanup: 다른 페이지로 이동하면서 컴포넌트가 사라질 때 이벤트 리스너도 함께 제거(메모리 누수 방지)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedTopping) return; // null 체크
    setPlacedImages([
      ...placedImages,
      {x: e.clientX, y: e.clientY, id: crypto.randomUUID(), image: selectedTopping.image},
    ]);

    playPlaceSound();
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden" ref={ref}>
      <img
        src={yogartBowl}
        alt="Yogurt Bowl"
        className="pointer-events-none w-full h-screen object-contain -translate-y-7"
      />
      <div
        className="absolute inset-0 cursor-pointer"
        style={{clipPath: "circle(23% at 50% 46%)"}}
        onClick={handleClick}
      />
      <div>
        {selectedTopping && (
          <img
            key={selectedTopping.id}
            src={selectedTopping.image}
            alt={selectedTopping.name}
            className="object-contain w-[70px] h-[70px] z-50"
            style={{
              position: "fixed",
              left: `${mousePos.x - 10}px`, // 커서 왼쪽으로 10px
              top: `${mousePos.y - 10}px`, // 커서 위로 10px
              pointerEvents: "none", // 마우스 이벤트 차단 방지
            }}
            data-html2canvas-ignore="true"
          />
        )}
      </div>

      {placedImages.map((img) => (
        <img
          key={img.id}
          src={img.image}
          alt="배치된 토핑"
          className="fixed w-[70px] h-[70px] object-contain pointer-events-none scale-100"
          style={{
            left: `${img.x}px`,
            top: `${img.y}px`,
          }}
        />
      ))}
    </div>
  );
}
