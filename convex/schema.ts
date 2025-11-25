import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  yogurtBowls: defineTable({
    imageStorageId: v.string(), // Convex Storage ID
    title: v.string(),
    ingredients: v.array(v.string()),
    description: v.string(),
    createdAt: v.string(), // YYYY.MM.DD 형식
  }),
  users: defineTable({
    nickname: v.string(), // 사용자 닉네임
    email: v.string(), // 이메일
    passwordHash: v.string(), // 비밀번호 해시
    createdAt: v.number(), // 생성 시간 (timestamp)
    updatedAt: v.number(), // 수정 시간
  })
    .index("nickname", ["nickname"])
    .index("email", ["email"]),
});
