import { convexAuth } from "@convex-dev/auth/server";
import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { DataModel } from "./_generated/dataModel";

const CustomPassword = Password<DataModel>({
  profile(params) {
    // 회원가입 시 추가 필드 처리
    return {
      email: params.email as string,
      nickname: params.nickname as string,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  },
});

// google auth 활성화
export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Google({
      profile(profile) {
        // Google OAuth 로그인 시 사용자 정보 저장
        return {
          id: profile.sub, // Google 사용자 고유 ID (필수!)
          email: profile.email,
          name: profile.name,
          nickname: profile.name, // Google 이름을 닉네임으로 사용
          image: profile.picture,
          emailVerificationTime: profile.email_verified ? Date.now() : undefined,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
      },
    }),
    CustomPassword, // 비밀번호 인증 자동 지원
  ],
});
