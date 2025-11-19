import toppingIcon from "../../public/images/icons/toppingIcon.svg";
import calendarIcon from "../../public/images/icons/calendarIcon.svg";
import descriptionIcon from "../../public/images/icons/descriptionIcon.svg";
import editIcon from "../../public/images/icons/editIcon.svg";
import deleteIcon from "../../public/images/icons/deleteIcon.svg";
import previousIcon from "../../public/images/icons/previousIcon.svg";

function BowlDetailPage() {
  return (
    <div className="px-18 py-10 bg-amber-50 max-w-md mx-auto h-screen overflow-y-auto">
      <div className="pb-5">
        <button className="border-4 flex px-2 py-1 gap-1 shadow-xl bg-white ">
          <img src={previousIcon} alt="이전 아이콘" />
          <span className="text-sm">BACK</span>
        </button>
      </div>

      <div className="flex items-center justify-center pb-5">
        <image alt="요거트볼 이미지">
          <div className="bg-neutral-400  w-[300px] h-[300px]"></div>
        </image>
      </div>

      <div className="flex flex-col mb-8">
        <h1 className="text-xl pb-2">요거트볼 이미지 제목</h1>
        <div className="flex gap-2 items-center">
          <img src={calendarIcon} alt="달력 아이콘" />
          <span className="text-sm">2025.11.19</span>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex gap-1 mb-3 items-center">
          <img src={toppingIcon} alt="재료 아이콘" className="w-5 h-5" />
          <span className="font-medium">INGREDIENTS</span>
        </div>
        <div className="flex gap-1">
          <span className="border-3 border-gray-300 bg-gray-200 px-3 py-1 text-sm shadow rounded-full">딸기</span>
          <span className="border-3 border-gray-300 bg-gray-200 px-3 py-1 text-sm shadow rounded-full">블루베리</span>
          <span className="border-3 border-gray-300 bg-gray-200 px-3 py-1 text-sm shadow rounded-full">망고</span>
          <span className="border-3 border-gray-300 bg-gray-200 px-3 py-1 text-sm shadow rounded-full">그래놀라</span>
        </div>
      </div>

      <div className="pb-15">
        <div className="flex gap-2 mb-3 items-center pixel-font">
          <img src={descriptionIcon} alt="설명 아이콘" className="w-5 h-5" />
          <span className="font-medium">INFO</span>
        </div>
        <div className=" bg-gray-200 p-3 shadow-md border-3">
          <p className="leading-relaxed">요거트 볼에 대한 설명입니다. 요거트 볼에 대한 설명입니다. 요거트 볼에 대한 설명입니다. 요거트 볼에 대한 설명입니다. ...</p>
        </div>
      </div>

      <div className=" flex justify-between">
        <button className="flex gap-2 px-4 py-1 bg-purple-700 border-3 hover:shadow-xl whitespace-nowrap items-center border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <img src={editIcon} alt="수정 아이콘" className="w-5 h-5" />
          <span className="text-sm text-white ">EDIT</span>
        </button>

        <button className="flex gap-2 px-4 py-1 bg-red-600 border-3  hover:shadow-xl whitespace-nowrap items-center border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <img src={deleteIcon} alt="삭제 아이콘" className="w-5 h-5" />
          <span className="text-sm text-white ">DELETE</span>
        </button>
      </div>
    </div>
  );
}

export default BowlDetailPage;
