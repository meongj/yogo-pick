import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  yogurtBowls: defineTable({
    imageStorageId: v.string(), // Convex Storage ID
    title: v.string(),
    ingredients: v.array(v.string()),
    description: v.string(),
    createdAt: v.string(), // YYYY.MM.DD 형식
  }),
  // Convex Auth 기본 필드 + 커스텀 필드
  users: defineTable({
    // Convex Auth가 자동으로 채우는 필드들 (Google OAuth)
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    image: v.optional(v.string()), // 구글 프로필 이미지
    name: v.optional(v.string()), // 구글 이름

    // 커스텀 필드
    nickname: v.string(), // 사용자 닉네임
    createdAt: v.number(), // 생성 시간 (timestamp)
    updatedAt: v.number(), // 수정 시간
    // 비밀번호는 convex auth가 알아서 처리함
  })
    .index("nickname", ["nickname"])
    .index("email", ["email"]),
});
