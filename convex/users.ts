import { v } from "convex/values";
import { mutation } from "./_generated/server";
import bcrypt from "bcrypt";

// 회원가입
export const createUsers = mutation({
  args: {
    nickname: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password, nickname }) => {
    const timestamp = Date.now();
    const hashedPassword = await bcrypt.hash(password, 10);
    return await ctx.db.insert("users", {
      email: email,
      passwordHash: hashedPassword,
      nickname: nickname,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});
