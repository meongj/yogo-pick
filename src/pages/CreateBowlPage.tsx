import { useRef, useState } from "react";
import { ToppingSelector } from "../components/ToppingSelector";
import { YogurtBowl } from "../components/YogurtBowl";
import type { Topping } from "../types/Topping";
import { CaptureButton } from "../components/CaptureButton";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import { useConvexAuth } from "convex/react";
import { CreateBowlModal } from "../components/CreateBowlModal";

function CreateBowlPage() {
  const [selectedTopping, setSelectedTopping] = useState<Topping | null>(null);
  const [toppingNames, setToppingNames] = useState<string[]>([]);
  const captureRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated } = useConvexAuth();

  const onToppingSelect = (topping: Topping) => {
    setSelectedTopping(topping);
  };

  const handleToppingPlaced = (name: string) => {
    setToppingNames((prev) => {
      if (prev.includes(name)) {
        return prev;
      }
      return [...prev, name];
    });
  };

  return (
    <div className="z-0 mx-auto h-screen max-w-md overflow-x-hidden overflow-y-hidden bg-amber-50">
      <ToppingSelector onToppingSelect={onToppingSelect} />
      <YogurtBowl selectedTopping={selectedTopping} ref={captureRef} onToppingPlaced={handleToppingPlaced} />
      <CaptureButton
        ref={captureRef}
        onClick={() => navigate("/album")}
        ingredients={toppingNames}
        isAuthenticated={isAuthenticated}
        onUnauthorized={() => {
          setShowModal(true);
          setSelectedTopping(null);
        }}
      />
      <BottomNav isActive="Make" />

      {showModal && <CreateBowlModal isOpen={showModal} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default CreateBowlPage;
