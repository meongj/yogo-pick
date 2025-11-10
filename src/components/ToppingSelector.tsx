import strawberry from "../../public/images/toppings/strawberry.png";

interface ToppingSelectorProps {
  onToppingSelect: (image: string) => void;
}

// 토핑 선택 버튼들 (가로로 슬라이더)
// 토핑은 1개씩만 선택할 수 있다
export function ToppingSelector({onToppingSelect}: ToppingSelectorProps) {
  const handleSelect = () => {
    onToppingSelect(strawberry);
  };

  return (
    <div className="z-10">
      <button className="bg-transparent hover:bg-gray-200 rounded-full p-2" onClick={handleSelect}>
        <img src={strawberry} alt="딸기" className="w-13 h-13 object-contain" />
      </button>
    </div>
  );
}
