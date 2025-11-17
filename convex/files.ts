// 업로드된 모든 요거트볼 목록 가져오기

import {query} from "./_generated/server";

export const listFiles = query({
  handler: async (ctx) => {
    // yogurtBowls 테이블에서 모든 레코드 가져오기
    const bowls = await ctx.db.query("yogurtBowls").collect();

    // 각 bowl의 이미지 URL 가져오기
    const bowlsWithUrls = await Promise.all(
      bowls.map(async (bowl) => ({
        ...bowl,
        url: await ctx.storage.getUrl(bowl.imageStorageId as any),
      }))
    );

    return bowlsWithUrls;
  },
});
