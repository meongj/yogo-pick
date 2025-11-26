import { useNavigate } from "react-router-dom";
import mainImg from "../../public/images/logo/logo1.png";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function MainPage() {
  const navigate = useNavigate();
  const user = useQuery(api.users.currentUser);
  const { isAuthenticated } = useConvexAuth();

  return (
    <div className="mx-auto h-screen max-w-md overflow-y-auto bg-amber-50 px-18 py-10">
      <div className="mt-17 flex items-center justify-center p-12">
        <h1 className="text-7xl">YogoPick</h1>
      </div>

      <div className="mt-3">
        <img src={mainImg} alt="로고" />
      </div>
      <div className="mt-5 flex flex-col items-center justify-center gap-5 p-12">
        <button className="flex w-full cursor-pointer items-center justify-center border-2 bg-indigo-300 p-3 hover:bg-indigo-400 disabled:opacity-50" onClick={() => navigate("/create")}>
          요거트 볼 만들기
        </button>
        {isAuthenticated && user ? (
          <button className="flex w-full cursor-pointer items-center justify-center border-2 bg-gray-100 p-3 hover:bg-gray-200 disabled:opacity-50" onClick={() => navigate("/mypage")}>
            마이페이지
          </button>
        ) : (
          <button className="flex w-full cursor-pointer items-center justify-center border-2 bg-gray-100 p-3 hover:bg-gray-200 disabled:opacity-50" onClick={() => navigate("/login")}>
            로그인
          </button>
        )}
      </div>
    </div>
  );
}
