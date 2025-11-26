import FormInput from "../components/FormInput";
import googleIcon from "../../public/images/icons/google.svg";
import { useForm } from "react-hook-form";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";

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

  const login = useAction(api.users.login);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      alert("로그인 성공!");
    } catch (error) {
      console.error("로그인 실패:", error);
      // ConvexError의 경우 data 속성에 메시지가 있음
      const message = (error as { data?: string })?.data || (error as Error)?.message || "로그인에 실패했습니다.";
      alert(message);
    }
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
              <button type="submit" className="mt-2 flex cursor-pointer items-center justify-center border-2 bg-indigo-300 p-3 hover:bg-indigo-400">
                로그인
              </button>
              <button className="flex cursor-pointer items-center justify-center border-2 bg-gray-100 p-3 hover:bg-gray-200" type="button" onClick={() => navigate("/register")}>
                회원가입
              </button>
            </div>
          </div>
        </form>

        <div className="flex flex-col items-center justify-center gap-5">
          <p className="text-xl">or</p>
          <button className="flex w-full cursor-pointer items-center justify-center gap-1 border-2 bg-gray-100 p-3 hover:bg-gray-200" type="button">
            <img src={googleIcon} alt="구글 아이콘" className="pointer-events-none h-5 w-5" />
            구글로 계속하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
