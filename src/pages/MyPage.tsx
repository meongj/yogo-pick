import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function MyPage() {
  const { signOut } = useAuthActions();
  const user = useQuery(api.users.currentUser);
  const { isAuthenticated } = useConvexAuth();

  return (
    <div>
      <div className="bg-white p-4">
        <p>인증 상태: {isAuthenticated ? "✅ 로그인됨" : "❌ 로그인 안됨"}</p>
        <p>User 객체: {user === null ? "null" : user === undefined ? "undefined" : "존재함"}</p>
        <p>이메일: {user?.email || "없음"}</p>
        <p>닉네임: {user?.nickname || "없음"}</p>
      </div>

      <button onClick={() => signOut()} className="flex w-full cursor-pointer items-center justify-center gap-1 border-2 bg-gray-100 p-3 hover:bg-gray-200">
        로그아웃
      </button>
    </div>
  );
}

export default MyPage;
