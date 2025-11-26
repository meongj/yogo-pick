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
  // authTables의 users 테이블 확장 (커스텀 필드 추가)
  users: defineTable({
    // Convex Auth 기본 필드
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    image: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),

    // 커스텀 필드
    nickname: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  })
    .index("email", ["email"])
    .index("nickname", ["nickname"]),
});
