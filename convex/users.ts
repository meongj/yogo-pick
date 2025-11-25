import { v } from "convex/values";
import { action, internalMutation } from "./_generated/server";
import { ConvexError } from "convex/values";
import { internal } from "./_generated/api";
import bcrypt from "bcryptjs";

// 회원가입
export const signup = action({
  args: {
    nickname: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password, nickname }): Promise<any> => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await ctx.runMutation(internal.users.createUser, {
      email: email,
      nickname: nickname,
      passwordHash: hashedPassword,
    });
  },
});

// 내부 mutation: 사용자 생성
export const createUser = internalMutation({
  args: {
    nickname: v.string(),
    email: v.string(),
    passwordHash: v.string(),
  },
  handler: async (ctx, { email, passwordHash, nickname }) => {
    // 이메일 중복 체크
    const existingEmail = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", email))
      .first();
    if (existingEmail) {
      throw new ConvexError("이미 사용 중인 이메일입니다.");
    }

    // 닉네임 중복 체크
    const existingNickname = await ctx.db
      .query("users")
      .withIndex("nickname", (q) => q.eq("nickname", nickname))
      .first();
    if (existingNickname) {
      throw new ConvexError("이미 사용 중인 닉네임입니다.");
    }

    const timestamp = Date.now();

    return await ctx.db.insert("users", {
      email: email,
      passwordHash: passwordHash,
      nickname: nickname,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});
