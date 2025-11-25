import { v } from "convex/values";
import { mutation } from "./_generated/server";

// 회원가입
export const createUsers = mutation({
  args: {
    nickname: v.string(),
    email: v.string(),
    passwordHash: v.string(),
  },
  handler: async (ctx, { email, passwordHash, nickname }) => {
    const timestamp = Date.now();
    return await ctx.db.insert("users", {
      email,
      passwordHash,
      nickname,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});
