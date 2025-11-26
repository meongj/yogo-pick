import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// 현재 로그인한 사용자 정보 가져오기
export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    return await ctx.db.get(userId);
  },
});

// 닉네임 업데이트 (회원가입 후 또는 프로필 수정)
export const updateNickname = mutation({
  args: {
    nickname: v.string(),
  },
  handler: async (ctx, { nickname }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new ConvexError("로그인이 필요합니다.");
    }

    // 닉네임 중복 체크
    const existingNickname = await ctx.db
      .query("users")
      .withIndex("nickname", (q) => q.eq("nickname", nickname))
      .first();

    if (existingNickname && existingNickname._id !== userId) {
      throw new ConvexError("이미 사용 중인 닉네임입니다.");
    }

    await ctx.db.patch(userId, {
      nickname,
      updatedAt: Date.now(),
    });
  },
});

// 이메일 중복 체크 (회원가입 폼에서 사용)
export const checkEmailExists = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", email))
      .first();
    return !!user;
  },
});

// 닉네임 중복 체크
export const checkNicknameExists = query({
  args: { nickname: v.string() },
  handler: async (ctx, { nickname }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("nickname", (q) => q.eq("nickname", nickname))
      .first();
    return !!user;
  },
});
