interface BowlCardProps {
  id: string;
  image: string | null;
  date: string;
  onClick: () => void;
}

function BowlCard({ image, onClick }: BowlCardProps) {
  return (
    <div
      className="aspect-square w-full cursor-pointer overflow-hidden border-3 shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
      onClick={() => {
        onClick();
      }}
    >
      <img
        src={image || ""}
        alt="요거트볼 이미지"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default BowlCard;
