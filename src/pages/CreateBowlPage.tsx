import { useRef, useState } from "react";
import { ToppingSelector } from "../components/ToppingSelector";
import { YogurtBowl } from "../components/YogurtBowl";
import { CaptureButton } from "../components/CaptureButton";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import { CreateBowlModal } from "../components/CreateBowlModal";
import { LoadingOverlay } from "@/components/LoadingOverlay";

function CreateBowlPage() {
  const captureRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="z-0 mx-auto h-screen max-w-md overflow-x-hidden overflow-y-hidden bg-amber-50">
      <ToppingSelector />
      <YogurtBowl ref={captureRef} />
      <CaptureButton ref={captureRef} onClick={() => navigate("/album")} onLoadingChange={setIsLoading} />
      <BottomNav isActive="Make" />

      <CreateBowlModal />
      {isLoading && <LoadingOverlay text="저장 중...👩🏻‍🍳" />}
    </div>
  );
}

export default CreateBowlPage;
