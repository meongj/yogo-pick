// 로그인한 유저의 요거트볼 목록 가져오기

import {paginationOptsValidator} from "convex/server";
import {query} from "./_generated/server";
import {getAuthUserId} from "@convex-dev/auth/server";

// 이미지 리스트 조회 (페이지네이션)
export const listFiles = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    // 인증 확인
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("로그인이 필요합니다.");
    }

    const paginationResult = await ctx.db
      .query("yogurtBowls")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .paginate(args.paginationOpts);

    // 각 bowl의 이미지 URL 가져오기
    const bowlsWithUrls = await Promise.all(
      paginationResult.page.map(async (bowl) => ({
        ...bowl,
        url: await ctx.storage.getUrl(bowl.imageStorageId),
      }))
    );

    return {
      ...paginationResult,
      page: bowlsWithUrls,
    };
  },
});
