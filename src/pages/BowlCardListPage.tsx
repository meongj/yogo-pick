import { useConvexAuth, usePaginatedQuery } from "convex/react";
import BowlCard from "../components/BowlCard";
import { api } from "../../convex/_generated/api";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import { LoadingOverlay } from "@/components/LoadingOverlay";

const PAGE_SIZE = 4;
const INITIAL_SIZE = 10;

function BowlCardListPage() {
  const observerRef = useRef<HTMLDivElement>(null);
  const { results, status, loadMore } = usePaginatedQuery(api.files.listFiles, {}, { initialNumItems: INITIAL_SIZE });

  const navigate = useNavigate();
  const { isAuthenticated } = useConvexAuth();

  // 로그인 안되어 있는 경우 메인 페이지로 팅겨냄
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && status === "CanLoadMore") {
          // 데이터 로드
          loadMore(PAGE_SIZE);
        }
      },
      {
        threshold: 0.1, // 10% 보이면
        rootMargin: "0px 0px 300px 0px", //하단영역  300px 전에 미리 로드
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    // cleanup
    return () => observer.disconnect();
  }, [status, loadMore]);

  // 첫 페이지 로딩시
  if (status === "LoadingFirstPage") {
    return <div className="col-span-2 py-10 text-center text-gray-500">로딩중..</div>;
  }

  return (
    <div className="mx-auto h-screen max-w-md overflow-y-auto bg-amber-50">
      <div className="flex items-center justify-center py-8">
        <h2 className="mt-10 text-3xl font-medium">My YogurtBowl</h2>
      </div>

      {results.length === 0 && <div className="col-span-2 py-10 text-center text-gray-500">저장된 요거트볼이 없습니다</div>}

      <div className="grid grid-cols-2 gap-4 p-4 pt-4">
        {results?.map((bowl) => {
          return <BowlCard key={bowl._id} id={bowl._id} image={bowl.url} date={new Date(bowl.createdAt).toLocaleString()} onClick={() => navigate(`/detail/${bowl._id}`)} />;
        })}
        {status === "LoadingMore" && <LoadingOverlay text="로딩 중..." />}
      </div>
      <div ref={observerRef} aria-hidden="true" />

      <BottomNav isActive="Album" />
    </div>
  );
}

export default BowlCardListPage;
