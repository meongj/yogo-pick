import toppingIcon from "../../public/images/icons/toppingIcon.svg";
import calendarIcon from "../../public/images/icons/calendarIcon.svg";
import descriptionIcon from "../../public/images/icons/descriptionIcon.svg";
import editIcon from "../../public/images/icons/editIcon.svg";
import deleteIcon from "../../public/images/icons/deleteIcon.svg";
import previousIcon from "../../public/images/icons/previousIcon.svg";
import trashIcon from "../../public/images/icons/trashIcon.svg";

import { useNavigate, useParams } from "react-router-dom";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useEffect, useRef, useState } from "react";
import { toast } from "../components/Toaster";
import { LoadingOverlay } from "@/components/LoadingOverlay";

function BowlDetailPage() {
  const { id } = useParams();
  const bowlDetail = useQuery(api.yogurtBowls.getYogurtBowlDetail, {
    id: id as Id<"yogurtBowls">,
  });

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const updateYogurtBowl = useMutation(api.yogurtBowls.updateYogurtBowlTitle);
  //삭제 모달 열렸는지 여부
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteYogurtBowl = useMutation(api.yogurtBowls.deleteYogurtBowl);

  const { isAuthenticated } = useConvexAuth();

  // 로그인 안되어 있는 경우 메인 페이지로 팅겨냄
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // 초기값 설정
  useEffect(() => {
    if (bowlDetail) {
      setEditedTitle(bowlDetail.title);
      setEditedDescription(bowlDetail.description);
    }
  }, [bowlDetail]);

  // 편집 모드로 전환되면 제목 input에 focus
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    if (isEditing) {
      // 저장 모드: API 호출
      try {
        await updateYogurtBowl({
          id: id as Id<"yogurtBowls">,
          title: editedTitle,
          description: editedDescription,
        });
        toast.success("저장되었습니다");
        setIsEditing(false);
      } catch (error) {
        console.error("저장 실패:", error);
        toast.error("저장에 실패했습니다.");
      }
    } else {
      // 편집 모드로 전환
      setIsEditing(true);
    }
    setIsLoading(false);
  };

  // 삭제 모달
  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await deleteYogurtBowl({ id: id as Id<"yogurtBowls"> });
      toast.success("삭제 되었습니다");
      setIsDeleteModalOpen(false);
      navigate("/album");
    } catch (err) {
      console.error("Network or server error:", err);
      toast.error("네트워크 오류가 발생했어요. 다시 시도해주세요!");
      navigate("/album");
    } finally {
      setIsLoading(false);
    }
  };

  if (bowlDetail === undefined) {
    return <LoadingOverlay text="Loading..." />;
  }

  if (bowlDetail === null) {
    return (
      <div className="mx-auto h-screen max-w-md overflow-y-auto bg-amber-50 px-18 py-10">
        <p>해당 요거트 볼을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto h-screen max-w-md overflow-y-auto bg-amber-50 px-18 py-10">
        <div className="pb-5">
          <button
            className="flex gap-1 border-4 bg-white px-2 py-1 shadow-xl hover:scale-110 hover:cursor-pointer hover:shadow-lg"
            onClick={() => {
              navigate(-1);
            }}
            aria-label="이전 버튼"
            type="button"
          >
            <img src={previousIcon} alt="이전 아이콘" />
            <span className="text-sm">BACK</span>
          </button>
        </div>

        <div className="flex items-center justify-center pb-5">
          {bowlDetail.imageUrl ? (
            <img src={bowlDetail.imageUrl} alt="요거트볼 이미지" className="h-[300px] w-[300px] border-3 object-cover" />
          ) : (
            <div className="h-[300px] w-[300px] bg-neutral-400"></div>
          )}
        </div>

        <div className="mb-8 flex flex-col">
          {isEditing ? (
            <h1 className="pb-2 text-xl">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full rounded border-2 border-gray-300 px-2 py-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="제목을 입력해주세요"
                ref={inputRef}
              />
            </h1>
          ) : (
            <h1 className="pb-2 text-xl">{bowlDetail.title}</h1>
          )}
          <div className="flex items-center gap-2">
            <img src={calendarIcon} alt="달력 아이콘" />
            <span className="text-l flex items-center">{bowlDetail.createdAt}</span>
          </div>
        </div>

        <div className="mb-10">
          <div className="mb-3 flex items-center gap-1">
            <img src={toppingIcon} alt="재료 아이콘" className="h-5 w-5" />
            <span className="font-medium">INGREDIENTS</span>
          </div>
          <div className="flex gap-1">
            {bowlDetail.ingredients.length === 0 ? (
              <span className="rounded-full border-3 border-gray-300 bg-gray-200 px-3 py-1 text-sm shadow">NONE</span>
            ) : (
              bowlDetail.ingredients.map((topping, index) => (
                <span key={index} className="rounded-full border-3 border-gray-300 bg-gray-200 px-3 py-1 text-sm shadow">
                  {topping}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="pb-15">
          <div className="pixel-font mb-3 flex items-center gap-2">
            <img src={descriptionIcon} alt="설명 아이콘" className="h-5 w-5" />
            <span className="font-medium">INFO</span>
          </div>

          <div className="border-3 bg-gray-200 p-3 shadow-md">
            <textarea
              value={isEditing ? editedDescription : bowlDetail.description}
              onChange={isEditing ? (e) => setEditedDescription(e.target.value) : undefined}
              readOnly={!isEditing}
              className={
                isEditing
                  ? "min-h-[100px] w-full resize-none rounded bg-transparent outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  : "min-h-[100px] w-full resize-none bg-transparent outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-200 focus:outline-none"
              }
              placeholder="설명을 입력해주세요"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            className="flex items-center gap-2 border-3 border-black bg-purple-700 px-4 py-1 whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:cursor-pointer hover:shadow-xl"
            aria-label="수정 버튼"
            type="submit"
          >
            <img src={editIcon} alt="수정 아이콘" className="h-5 w-5" />
            <span className="text-sm text-white">{isEditing ? "SAVE" : "EDIT"}</span>
          </button>

          <button
            className="flex cursor-pointer items-center gap-2 border-3 border-black bg-red-600 px-4 py-1 whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-xl"
            aria-label="삭제 버튼"
            type="button"
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
          >
            <img src={deleteIcon} alt="삭제 아이콘" className="h-5 w-5" />
            <span className="text-sm text-white">DELETE</span>
          </button>
        </div>
      </div>

      {/* 삭제 모달 */}
      {isDeleteModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50" onClick={() => setIsDeleteModalOpen(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="modal-text" className="w-sm border-3 bg-white p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-center pb-10">
              <img src={trashIcon} alt="삭제 아이콘" />
            </div>
            <div className="flex items-center justify-center pb-10 text-xl">
              <h3 id="modal-text"> 요거트 볼을 삭제하시겠어요?</h3>
            </div>
            <div className="flex items-center justify-center gap-6">
              <button
                className="flex cursor-pointer items-center gap-2 border-3 border-black bg-red-600 px-4 py-1 whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-xl"
                onClick={handleDelete}
                type="button"
              >
                네
              </button>
              <button
                className="flex cursor-pointer items-center gap-2 border-3 border-black bg-gray-400 px-4 py-1 whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-xl"
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && <LoadingOverlay text="처리 중..." />}
    </form>
  );
}

export default BowlDetailPage;
