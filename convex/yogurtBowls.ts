import {v} from "convex/values";
import {mutation} from "./_generated/server";

// Storage 업로드 URL 생성
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// 요거트볼 저장
export const saveYogurtBowl = mutation({
  args: {
    imageStorageId: v.string(),
  },
  handler: async (ctx, args) => {
    const yogurtBowlId = await ctx.db.insert("yogurtBowls", {
      imageStorageId: args.imageStorageId,
      createdAt: Date.now(),
    });
    return yogurtBowlId;
  },
});
