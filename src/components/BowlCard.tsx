interface BowlCardProps {
  id: string;
  image: string | null;
  date: string;
}

function BowlCard({id, image, date}: BowlCardProps) {
  return (
    <div className="aspect-square w-full overflow-hidden border-2 border-gray-200 rounded-lg shadow-md">
      <img src={image || ""} alt="요거트볼 이미지" className="w-full h-full object-cover" />
    </div>
  );
}

export default BowlCard;
