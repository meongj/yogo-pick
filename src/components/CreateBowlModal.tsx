import { useNavigate } from "react-router-dom";
import lockIcon from "../../public/images/icons/lockIcon.svg";

interface CreateBowlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateBowlModal({ isOpen, onClose }: CreateBowlModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="modal-text" className="w-sm border-3 bg-white p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center pt-5 pb-10">
          <img src={lockIcon} alt="잠금 아이콘" />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 pb-10 text-xl">
          <h3 id="modal-text">로그인하면 저장할 수 있어요💕</h3>
          <h4 className="flex justify-start text-sm"> 3초면 끝나요!</h4>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <button
            className="flex w-48 cursor-pointer items-center justify-center gap-2 border-3 border-black bg-violet-400 px-4 py-1 whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-xl"
            onClick={() => navigate("/login")}
            type="button"
          >
            로그인 하기
          </button>
          <button
            className="flex w-48 cursor-pointer items-center justify-center gap-2 border-3 border-black bg-gray-300 px-4 py-1 whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-xl"
            type="button"
            onClick={() => navigate("/register")}
          >
            회원가입 하기
          </button>
          <button className="mt-1 cursor-pointer text-sm" onClick={onClose}>
            다음에 할게요...😭
          </button>
        </div>
      </div>
    </div>
  );
}
