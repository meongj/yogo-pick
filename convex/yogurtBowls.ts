import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Storage 업로드 URL 생성
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// 요거트볼 저장
export const saveYogurtBowl = mutation({
  args: {
    imageStorageId: v.string(),
    ingredients: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 01, 02..
    const day = String(today.getDate()).padStart(2, "0");
    const date = `${year}.${month}.${day}`;

    const yogurtBowlId = await ctx.db.insert("yogurtBowls", {
      imageStorageId: args.imageStorageId,
      title: "오늘의 요거트볼",
      ingredients: args.ingredients,
      description: "",
      createdAt: date,
    });
    return yogurtBowlId;
  },
});

// 요거트볼 상세데이터 조회
export const getYogurtBowlDetail = query({
  args: { id: v.id("yogurtBowls") },
  handler: async (ctx, args) => {
    const bowl = await ctx.db.get(args.id);
    if (!bowl) {
      return null;
    }

    if (!bowl.imageStorageId) {
      return {
        ...bowl,
        imageUrl: null,
      };
    }
    // 이미지 URL 가져오기
    const imageUrl = await ctx.storage.getUrl(bowl.imageStorageId);

    return {
      ...bowl,
      imageUrl,
    };
  },
});

// 수정하기
export const updateYogurtBowlTitle = mutation({
  args: {
    id: v.id("yogurtBowls"),
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      title: args.title,
      description: args.description,
    });
  },
});

export const deleteYogurtBowl = mutation({
  args: { id: v.id("yogurtBowls") },
  handler: async (ctx, args) => {
    const bowl = await ctx.db.get(args.id);
    if (bowl?.imageStorageId) {
      await ctx.storage.delete(bowl.imageStorageId);
    }
    await ctx.db.delete(args.id);
  },
});

// 개발용: 모든 요거트볼 데이터 삭제
export const deleteAllYogurtBowls = mutation({
  args: {},
  handler: async (ctx) => {
    const allBowls = await ctx.db.query("yogurtBowls").collect();
    for (const bowl of allBowls) {
      await ctx.db.delete(bowl._id);
    }
    return { deleted: allBowls.length };
  },
});
