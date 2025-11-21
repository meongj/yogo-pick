import { usePaginatedQuery } from "convex/react";
import BowlCard from "../components/BowlCard";
import { api } from "../../convex/_generated/api";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const PAGE_SIZE = 3;

function BowlCardListPage() {
  const observerRef = useRef<HTMLDivElement>(null);
  const { results, status, loadMore } = usePaginatedQuery(
    api.files.listFiles,
    {},
    { initialNumItems: PAGE_SIZE }
  );

  const navigate = useNavigate();

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
    return (
      <div className="col-span-2 py-10 text-center text-gray-500">로딩중..</div>
    );
  }
  if (results.length === 0) {
    return (
      <div className="col-span-2 py-10 text-center text-gray-500">
        저장된 요거트볼이 없습니다
      </div>
    );
  }

  return (
    <div className="mx-auto h-screen max-w-md overflow-y-auto bg-amber-50">
      <Navbar />

      <div className="flex items-center justify-center py-8">
        <h2 className="text-xl font-medium">My YogurtBowl</h2>
      </div>
      <div className="grid grid-cols-2 gap-7 p-20 pt-10">
        {results?.map((bowl) => {
          return (
            <BowlCard
              key={bowl._id}
              id={bowl._id}
              image={bowl.url}
              date={new Date(bowl.createdAt).toLocaleString()}
              onClick={() => navigate(`/detail/${bowl._id}`)}
            />
          );
        })}
        {status === "LoadingMore" && (
          <div className="col-span-2 py-10 text-center">로딩 중...</div>
        )}
      </div>
      <div ref={observerRef} aria-hidden="true" />
    </div>
  );
}

export default BowlCardListPage;
