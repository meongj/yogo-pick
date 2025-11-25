import { v } from "convex/values";
import { action, internalMutation, internalQuery } from "./_generated/server";
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
  handler: async (ctx, { email, password, nickname }): Promise<string> => {
    // 새로 생성된 id 반환
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

// 로그인
export const login = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<{ userId: string; email: string }> => {
    // 이메일로 사용자 있는지 조회
    const user = await ctx.runQuery(internal.users.findByEmail, {
      email: args.email,
    });

    if (!user) {
      throw new ConvexError("존재하지 않는 이메일입니다.");
    }

    // 비밀번호 비교
    const isPasswordValid = await bcrypt.compare(args.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new ConvexError("비밀번호가 올바르지 않습니다");
    }

    return {
      userId: user._id,
      email: user.email,
    };
  },
});

export const findByEmail = internalQuery({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .first();

    return user;
  },
});
