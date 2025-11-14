import html2canvas from "html2canvas";
import type {RefObject} from "react";
import saveBtn from "../../public/images/icons/saveBtn.png";
import {useMutation} from "convex/react";
import {api} from "../../convex/_generated/api";

interface CaptureButtonProps {
  ref: RefObject<HTMLDivElement | null>;
}

export function CaptureButton({ref}: CaptureButtonProps) {
  const generateUploadUrl = useMutation(api.yogurtBowls.generateUploadUrl);
  const saveYogurtBowl = useMutation(api.yogurtBowls.saveYogurtBowl);

  const handleClick = async () => {
    if (!ref.current) return;

    // 캡처
    const canvas = await html2canvas(ref.current);

    // Blob 변환
    const blob = await new Promise<Blob>((resolve) => canvas.toBlob((blob) => resolve(blob!)));

    // 업로드 url 생성 (convex storage가 presigned URL 생성)
    const uploadUrl = await generateUploadUrl();

    // Storage 업로드
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: {"Content-Type": blob.type},
      body: blob,
    });

    const {storageId} = await result.json();

    // DB 저장
    await saveYogurtBowl({imageStorageId: storageId});

    alert("저장이 완료되었습니다");
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
