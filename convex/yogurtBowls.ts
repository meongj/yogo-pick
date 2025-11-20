import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
