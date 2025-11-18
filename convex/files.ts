// 업로드된 모든 요거트볼 목록 가져오기

import {paginationOptsValidator} from "convex/server";
import {query} from "./_generated/server";

// 이미지 리스트 조회 (페이지네이션)
export const listFiles = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const paginationResult = await ctx.db.query("yogurtBowls").order("desc").paginate(args.paginationOpts);

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
