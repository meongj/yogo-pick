import {usePaginatedQuery} from "convex/react";
import BowlCard from "../components/BowlCard";
import {api} from "../../convex/_generated/api";
import {useEffect, useRef} from "react";

function BowlCardListPage() {
  const observerRef = useRef<HTMLDivElement>(null);
  const {results, status, loadMore} = usePaginatedQuery(api.files.listFiles, {}, {initialNumItems: 2});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && status === "CanLoadMore") {
          // 데이터 로드
          loadMore(2);
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
  });

  if (results.length === 0) {
    return <div className="col-span-2 text-center py-10 text-gray-500">저장된 요거트볼이 없습니다</div>;
  }

  return (
    <div className="h-screen overflow-y-auto max-w-md mx-auto bg-amber-50">
      <div className="flex justify-center items-center py-8">
        <h2 className="text-xl font-medium">My YogurtBowl</h2>
      </div>
      <div className="grid grid-cols-2 gap-7 p-20 pt-10">
        {results?.map((bowl) => {
          return (
            <BowlCard key={bowl._id} id={bowl._id} image={bowl.url} date={new Date(bowl.createdAt).toLocaleString()} />
          );
        })}
        {status === "LoadingMore" && <div className="col-span-2 text-center py-10">로딩 중...</div>}
      </div>
      <div ref={observerRef} className="h-1 " />
    </div>
  );
}

export default BowlCardListPage;
