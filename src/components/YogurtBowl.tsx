import { useEffect, useRef, useState } from "react";
import yogartBowl from "../../public/images/bowl/yogartBowl.png";
import type { Topping } from "../types/Topping";
import pop from "../../public/sound/pop.mp3";
import { useSound } from "../hooks/useSound";

interface YogurtBowlProps {
  selectedTopping: Topping | null;
  onToppingPlaced?: (name: string) => void;
  ref?: React.Ref<HTMLDivElement>;
}

export function YogurtBowl({ selectedTopping, onToppingPlaced, ref }: YogurtBowlProps) {
  // 마우스 위치
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  // 클릭한 위치와 어떤 이미지 인지
  const [placedImages, setPlacedImages] = useState<{ xPercent: number; yPercent: number; id: string; image: string; name: string }[]>([]);

  // 이미지 크기 상태 추가
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const playPlaceSound = useSound(pop);

  // 마우스무브 이벤트리스너 추가
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    // cleanup: 다른 페이지로 이동하면서 컴포넌트가 사라질 때 이벤트 리스너도 함께 제거(메모리 누수 방지)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // 이미지 로드 후 실제 렌더링 크기 계산
  const handleImageLoad = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setImageSize({ width: rect.width, height: rect.height });
    }
  };

  // 윈도우 리사이즈 시 크기 재계산
  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        setImageSize({ width: rect.width, height: rect.height });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedTopping) return; // null 체크

    // 이미지 래퍼기준 상대 좌표(%)로 계산
    const rect = e.currentTarget.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    setPlacedImages([...placedImages, { xPercent, yPercent, id: crypto.randomUUID(), image: selectedTopping.image, name: selectedTopping.name }]);
    onToppingPlaced?.(selectedTopping.name);

    playPlaceSound();
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* 이미지와 토핑을 감싸는 래퍼 - 이미지 크기에 맞춤 */}
      <div
        style={{
          transform: "scale(2.0)", // 이미지 확대
          transformOrigin: "center center",
          marginTop: "-250px", // 위로 올리기
        }}
      >
        <div
          className="relative"
          ref={ref} // 이 영역만 캡처
          style={{
            width: imageSize.width || "auto",
            height: imageSize.height || "auto",
          }}
        >
          {/* 요거트볼 이미지 */}
          <img src={yogartBowl} alt="Yogurt Bowl" className="pointer-events-none max-w-full object-contain" onLoad={handleImageLoad} />

          {/* 클릭 할 수 있는 영역(래퍼) */}
          <div className="absolute inset-0 cursor-pointer" style={{ clipPath: "circle(26% at 50% 50%)" }} onClick={handleClick} />

          {/* 배치된 토핑들(래퍼) */}
          {placedImages.map((img) => (
            <img
              key={img.id}
              src={img.image}
              alt="배치된 토핑"
              className="pointer-events-none absolute h-10 w-10 object-contain"
              style={{
                left: `calc(${img.xPercent}% - 15px)`,
                top: `calc(${img.yPercent}% - 15px)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 커서에 있는 토핑 */}
      {selectedTopping && (
        <img
          key={selectedTopping.id}
          src={selectedTopping.image}
          alt={selectedTopping.name}
          className="z-50 h-[75px] w-[75px] object-contain"
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
  );
}
