import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const { signOut } = useAuthActions();
  const user = useQuery(api.users.currentUser);
  const { isAuthenticated } = useConvexAuth();
  const navigate = useNavigate();
  const bowlCounts = useQuery(api.yogurtBowls.getUserYogurtBowlCount);

  // 로그인 안되어 있는 경우 메인 페이지로 팅겨냄
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="mx-auto h-screen max-w-md overflow-y-auto bg-amber-50">
      <Navbar />
      <div className="m-6">
        <div className="mt-20 border-4 bg-gray-100 p-3">
          <div className="m-2 flex border-b border-gray-300 pb-6">
            <div className="w-1/3 border-3 p-1">
              <img src={user?.image} alt="유저 프로필 사진" className="h-full w-full object-cover" />
            </div>
            <div className="flex w-2/3 flex-col items-start justify-center p-4">
              <div className="text-2xl font-bold">{user?.nickname}</div>
              <div className="text-xl text-gray-600">{user?.email}</div>
            </div>
          </div>

          <div className="flex pt-4 pb-4">
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold">{bowlCounts ?? 0}</div>
              <div className="text-sm">만든 볼</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm">즐겨찾기</div>
            </div>
          </div>
        </div>

        <button onClick={() => signOut()} className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1 border-3 border-black bg-red-400 p-3 py-4 text-white hover:bg-red-500">
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default MyPage;
