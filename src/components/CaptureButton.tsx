import html2canvas from "html2canvas";
import type { RefObject } from "react";
import saveBtn from "../../public/images/icons/saveBtn.png";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "../components/Toaster";

interface CaptureButtonProps {
  ref: RefObject<HTMLDivElement | null>;
  onClick?: () => void;
  ingredients: string[];
  isAuthenticated: boolean;
  onUnauthorized: () => void;
}

export function CaptureButton({ ref, onClick, ingredients, isAuthenticated, onUnauthorized }: CaptureButtonProps) {
  const generateUploadUrl = useMutation(api.yogurtBowls.generateUploadUrl);
  const saveYogurtBowl = useMutation(api.yogurtBowls.saveYogurtBowl);

  const handleClick = async () => {
    try {
      // 로그인 되어 있지 않다면 저장할 수 없다
      if (!isAuthenticated) {
        onUnauthorized?.();
        return;
      }

      if (!ref.current) {
        toast.error("저장할 수 없습니다");
        return;
      }

      // 캡처
      const canvas = await html2canvas(ref.current);

      // Blob 변환
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((blob) => {
          // blob null 체크
          if (blob) resolve(blob);
          else reject(new Error("Failed to create blob"));
        })
      );

      // 업로드 url 생성 (convex storage가 presigned URL 생성)
      const uploadUrl = await generateUploadUrl();

      // Storage 업로드
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": blob.type },
        body: blob,
      });

      const { storageId } = await result.json();

      // DB 저장
      await saveYogurtBowl({
        imageStorageId: storageId,
        ingredients: ingredients,
      });

      toast.success("저장이 완료되었습니다");

      // 저장 후 navigate
      onClick?.();
    } catch (error) {
      console.error("저장 중 오류 발생", error);
      toast.error("저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <button className="absolute bottom-20 left-1/2 z-50 -translate-x-1/2 cursor-pointer px-3 py-2 transition-all duration-300 hover:scale-105 hover:drop-shadow-2xl" onClick={handleClick}>
      <img src={saveBtn} className="h-40 w-40" alt="완성 버튼" />
    </button>
  );
}
