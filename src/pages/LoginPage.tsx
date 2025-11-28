import FormInput from "../components/FormInput";
import googleIcon from "../../public/images/icons/google.svg";
import { useForm } from "react-hook-form";
import { useConvexAuth } from "convex/react";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "@convex-dev/auth/react";
import { useEffect, useState } from "react";
import { BottomNav } from "../components/BottomNav";
import { toast } from "../components/Toaster";

interface LoginFormData {
  email: string;
  password: string;
}

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ mode: "onBlur" });

  const navigate = useNavigate();
  const { signIn } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();
  const [isLoading, setIsLoading] = useState(false);

  // 로그인 성공시 home으로 이동
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await signIn("password", {
        email: data.email,
        password: data.password,
        flow: "signIn",
      });
      toast.success("로그인 성공");
    } catch (error) {
      console.error("로그인 실패:", error);

      // 에러 메시지 추출
      const errorMessage = (error as Error)?.message || "";

      // InvalidAccountId 에러 처리
      if (errorMessage.includes("InvalidAccountId")) {
        toast.error("존재하지 않는 계정입니다. 이메일을 확인해주세요.");
        return;
      }

      // 비밀번호 불일치 에러 처리
      if (errorMessage.includes("Invalid") || errorMessage.includes("Credentials")) {
        toast.error("이메일 또는 비밀번호가 일치하지 않습니다.");
        return;
      }

      // 기타 에러
      const message = (error as { data?: string })?.data || errorMessage || "로그인에 실패했습니다.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  return (
    <div className="mx-auto h-screen max-w-md overflow-y-auto bg-amber-50 px-18 py-10">
      <div className="flex items-center justify-center p-12">
        <h1 className="text-4xl">Login</h1>
      </div>

      <div className="flex flex-col gap-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8 border-2 bg-white p-5">
            <FormInput
              name="이메일"
              type="email"
              placeholder="이메일을 입력하세요"
              register={register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "올바른 이메일 형식이 아닙니다",
                },
              })}
              error={errors.email?.message}
            />
            <FormInput
              name="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              register={register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 8,
                  message: "8자 이상 입력해주세요",
                },
              })}
              error={errors.password?.message}
            />

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex cursor-pointer items-center justify-center border-2 bg-indigo-300 p-3 hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "로그인 중..." : "로그인"}
              </button>
              <button className="flex cursor-pointer items-center justify-center border-2 bg-gray-100 p-3 hover:bg-gray-200" type="button" onClick={() => navigate("/register")} disabled={isLoading}>
                회원가입
              </button>
            </div>
          </div>
        </form>

        <div className="flex flex-col items-center justify-center gap-5">
          <p className="text-xl">or</p>
          <button
            className="flex w-full cursor-pointer items-center justify-center gap-1 border-2 bg-gray-100 p-3 hover:bg-gray-200 disabled:opacity-50"
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <img src={googleIcon} alt="구글 아이콘" className="pointer-events-none h-5 w-5" />
            구글로 계속하기
          </button>
        </div>
      </div>
      <BottomNav isActive="Home" />
    </div>
  );
}

export default LoginPage;
