interface BowlCardProps {
  id: string;
  image: string | null;
  date: string;
  onClick: () => void;
  isRevealed?: boolean;
  onImageLoad?: () => void;
}

function BowlCard({ image, onClick, isRevealed = true, onImageLoad }: BowlCardProps) {
  return (
    <div
      className="aspect-square w-full cursor-pointer overflow-hidden border-3 shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
      onClick={() => {
        onClick();
      }}
    >
      {image ? (
        <>
          {!isRevealed && (
            <div className="relative h-full w-full overflow-hidden bg-gray-200">
              <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          )}
          <img src={image} alt="생성된 요거트볼" className={`h-full w-full object-cover ${isRevealed ? "" : "hidden"}`} onLoad={onImageLoad} />
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-200">
          <span className="text-gray-400">이미지 없음</span>
        </div>
      )}
    </div>
  );
}

export default BowlCard;
