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
        {files?.map((bowl) => {
          return (
            <BowlCard key={bowl._id} id={bowl._id} image={bowl.url} date={new Date(bowl.createdAt).toLocaleString()} />
          );
        })}
      </div>
    </div>
  );
}

export default BowlCardListPage;
