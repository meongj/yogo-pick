import BowlCard from "../components/BowlCard";

function BowlCardListPage() {
  return (
    <div className="h-screen overflow-y-auto">
      <div className="flex justify-center items-center py-8">
        <h2 className="text-xl font-medium">My YogurtBowl</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 p-10">
        <BowlCard />
        <BowlCard />
        <BowlCard />
        <BowlCard />
        <BowlCard />
        <BowlCard />
      </div>
    </div>
  );
}

export default BowlCardListPage;
