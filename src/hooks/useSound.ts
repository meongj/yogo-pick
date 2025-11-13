import {useCallback, useRef} from "react";

export const useSound = (soundFile: string) => {
  // Audio 객체를 저장할 ref 생성
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 처음 한번만 Audio 객체 생성
  if (!audioRef.current) {
    audioRef.current = new Audio(soundFile);
  }

  // 재생 함수을 메모이제이션
  const play = useCallback(() => {
    if (audioRef.current) {
      // 초기화
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error("Sound play failed", error);
      });
    }
  }, []);

  // 재생 함수 반환
  return play;
};
