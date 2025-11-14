import html2canvas from "html2canvas";
import type {RefObject} from "react";
import saveBtn from "../../public/images/icons/saveBtn.png";

interface CaptureButtonProps {
  ref: RefObject<HTMLDivElement | null>;
}

export function CaptureButton({ref}: CaptureButtonProps) {
  const handleClick = async () => {
    if (!ref.current) return;

    const canvas = await html2canvas(ref.current);

    const link = document.createElement("a");
    link.download = "screenshot.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <button
      className="fixed bottom-10 right-10 z-50 px-3 py-2 transition-all duration-300 hover:scale-105 hover:drop-shadow-2xl cursor-pointer"
      onClick={() => {
        console.log(ref.current);
        handleClick();
      }}>
      <img src={saveBtn} className="w-40 h-40" />
    </button>
  );
}
