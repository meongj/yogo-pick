import {useQuery} from "convex/react";
import BowlCard from "../components/BowlCard";
import {api} from "../../convex/_generated/api";

function BowlCardListPage() {
  const files = useQuery(api.files.listFiles);

  return (
    <div className="h-screen overflow-y-auto">
      <div className="flex justify-center items-center py-8">
        <h2 className="text-xl font-medium">My YogurtBowl</h2>
      </div>
      <div className="grid grid-cols-2 gap-7 p-20">
        {files === undefined ? (
          <div className="col-span-2 text-center py-10">로딩 중...</div>
        ) : files.length === 0 ? (
          <div className="col-span-2 text-center py-10 text-gray-500">저장된 요거트볼이 없습니다</div>
        ) : (
          files?.map((bowl) => {
            return (
              <BowlCard
                key={bowl._id}
                id={bowl._id}
                image={bowl.url}
                date={new Date(bowl.createdAt).toLocaleString()}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default BowlCardListPage;
