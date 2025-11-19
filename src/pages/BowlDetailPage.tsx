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
        <button className="bg-gray-200 border-3 flex px-2 py-1 gap-1 shadow-xl">
          <img src={previousIcon} alt="이전 아이콘" />
          <span className="text-sm">목록</span>
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
        <div className="flex gap-1 mb-3">
          <img src={toppingIcon} alt="재료 아이콘" />
          <span className="font-medium">사용한 재료</span>
        </div>
        <div className="flex gap-1">
          <span className="rounded-full bg-gray-200 px-3 py-1 text-sm shadow">딸기</span>
          <span className="rounded-full bg-gray-200 px-3 py-1 text-sm shadow">블루베리</span>
          <span className="rounded-full bg-gray-200 px-3 py-1 text-sm shadow">망고</span>
          <span className="rounded-full bg-gray-200 px-3 py-1 text-sm shadow">그래놀라</span>
        </div>
      </div>

      <div className="pb-15">
        <div className="flex gap-2 mb-3">
          <img src={descriptionIcon} alt="설명 아이콘" />
          <span className="font-medium">설명</span>
        </div>
        <div className=" bg-gray-200  rounded-2xl p-3 shadow-md">
          <p className="leading-relaxed">
            요거트 볼에 대한 설명입니다. 요거트 볼에 대한 설명입니다. 요거트 볼에 대한 설명입니다. 요거트 볼에 대한
            설명입니다. ...
          </p>
        </div>
      </div>

      <div className=" flex justify-between">
        <button className="flex gap-2 px-4 py-1 bg-purple-700 border-3 shadow-lg hover:shadow-xl whitespace-nowrap items-center">
          <img src={editIcon} alt="수정 아이콘" />
          <span className="text-sm text-white ">수정하기</span>
        </button>

        <button className="flex gap-2 px-4 py-1 bg-red-600 border-3 shadow-lg hover:shadow-xl whitespace-nowrap items-center">
          <img src={deleteIcon} alt="삭제 아이콘" />
          <span className="text-sm text-white "> 삭제하기</span>
        </button>
      </div>
    </div>
  );
}

export default BowlDetailPage;
