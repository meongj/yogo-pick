import toppingIcon from "../../public/images/icons/toppingIcon.svg";
import calendarIcon from "../../public/images/icons/calendarIcon.svg";
import descriptionIcon from "../../public/images/icons/descriptionIcon.svg";
import editIcon from "../../public/images/icons/editIcon.svg";
import deleteIcon from "../../public/images/icons/deleteIcon.svg";
import previousIcon from "../../public/images/icons/previousIcon.svg";

import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

function BowlDetailPage() {
  const { id } = useParams();
  const bowlDetail = useQuery(api.yogurtBowls.getYogurtBowlDetail, {
    id: id as Id<"yogurtBowls">,
  });

  console.log("bowlDetail", bowlDetail);

  return (
    <div className="mx-auto h-screen max-w-md overflow-y-auto bg-amber-50 px-18 py-10">
      <div className="pb-5">
        <button className="flex gap-1 border-4 bg-white px-2 py-1 shadow-xl">
          <img src={previousIcon} alt="이전 아이콘" />
          <span className="text-sm">BACK</span>
        </button>
      </div>

      <div className="flex items-center justify-center pb-5">
        <image alt="요거트볼 이미지">
          <div className="h-[300px] w-[300px] bg-neutral-400"></div>
        </image>
      </div>

      <div className="mb-8 flex flex-col">
        <h1 className="pb-2 text-xl">요거트볼 이미지 제목</h1>
        <div className="flex items-center gap-2">
          <img src={calendarIcon} alt="달력 아이콘" />
          <span className="text-sm">2025.11.19</span>
        </div>
      </div>

      <div className="mb-10">
        <div className="mb-3 flex items-center gap-1">
          <img src={toppingIcon} alt="재료 아이콘" className="h-5 w-5" />
          <span className="font-medium">INGREDIENTS</span>
        </div>
        <div className="flex gap-1">
          <span className="rounded-full border-3 border-gray-300 bg-gray-200 px-3 py-1 text-sm shadow">딸기</span>
          <span className="rounded-full border-3 border-gray-300 bg-gray-200 px-3 py-1 text-sm shadow">블루베리</span>
          <span className="rounded-full border-3 border-gray-300 bg-gray-200 px-3 py-1 text-sm shadow">망고</span>
          <span className="rounded-full border-3 border-gray-300 bg-gray-200 px-3 py-1 text-sm shadow">그래놀라</span>
        </div>
      </div>

      <div className="pb-15">
        <div className="pixel-font mb-3 flex items-center gap-2">
          <img src={descriptionIcon} alt="설명 아이콘" className="h-5 w-5" />
          <span className="font-medium">INFO</span>
        </div>
        <div className="border-3 bg-gray-200 p-3 shadow-md">
          <p className="leading-relaxed">요거트 볼에 대한 설명입니다. 요거트 볼에 대한 설명입니다. 요거트 볼에 대한 설명입니다. 요거트 볼에 대한 설명입니다. ...</p>
        </div>
      </div>

      <div className="flex justify-between">
        <button className="flex items-center gap-2 border-3 border-black bg-purple-700 px-4 py-1 whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-xl">
          <img src={editIcon} alt="수정 아이콘" className="h-5 w-5" />
          <span className="text-sm text-white">EDIT</span>
        </button>

        <button className="flex items-center gap-2 border-3 border-black bg-red-600 px-4 py-1 whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-xl">
          <img src={deleteIcon} alt="삭제 아이콘" className="h-5 w-5" />
          <span className="text-sm text-white">DELETE</span>
        </button>
      </div>
    </div>
  );
}

export default BowlDetailPage;
