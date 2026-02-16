import type { Topping } from "@/types/Topping";
import { atom } from "jotai";
// 현재 선택된 토핑
export const selectedToppingAtom = atom<Topping | null>(null);
// 배치된 토핑 이름 목록
export const toppingNamesAtom = atom<string[]>([]);

// 로그인 필요시 모달 표시 여부
export const showModalAtom = atom<boolean>(false);

// 쓰기 only : 중복없이 토핑 이름 추가
export const addToppingNameAtom = atom(null, (get, set, name: string) => {
  const current = get(toppingNamesAtom);
  if (!current.includes(name)) {
    set(toppingNamesAtom, [...current, name]);
  }
});
