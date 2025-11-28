import FormInput from "../components/FormInput";
import { useForm } from "react-hook-form";
import { useConvexAuth } from "convex/react";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "@convex-dev/auth/react";
import { useEffect, useState } from "react";
import { BottomNav } from "../components/BottomNav";

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({ mode: "onBlur" });

  const navigate = useNavigate();
  const { signIn } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 회원가입 성공 시 홈으로 이동
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      await signIn("password", {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        flow: "signUp",
      });
      alert("회원가입 성공!");
    } catch (error) {
      console.error("회원가입 실패:", error);

      // 에러 메시지 추출
      const errorMessage = (error as Error)?.message || "";

      // 이미 존재하는 계정 에러 처리
      if (errorMessage.includes("already exists")) {
        alert("이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.");
        return;
      }

      // 중복 닉네임 에러 처리
      if (errorMessage.includes("nickname") && errorMessage.includes("duplicate")) {
        alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해주세요.");
        return;
      }

      // 기타 에러
      const message = (error as { data?: string })?.data || errorMessage || "회원가입에 실패했습니다.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const password = watch("password");

  return (
    <div className="mx-auto h-screen max-w-md overflow-y-auto bg-amber-50 px-18 py-10">
      <div className="flex items-center justify-center p-12">
        <h1 className="text-4xl">Register</h1>
      </div>

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
            placeholder="8자 이상 입력하세요"
            register={register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 8,
                message: "8자 이상 입력해주세요",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                message: "영문, 숫자 포함 8자 이상 입력해주세요",
              },
            })}
            error={errors.password?.message as string}
          />
          <FormInput
            name="비밀번호 확인"
            type="password"
            placeholder="8자 이상 입력하세요"
            register={register("confirmPassword", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 8,
                message: "8자 이상 입력해주세요",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                message: "영문, 숫자 포함 8자 이상 입력해주세요",
              },
              validate: (value) => value === password || "비밀번호가 일치하지 않습니다",
            })}
            error={errors.confirmPassword?.message as string}
          />
          <FormInput
            name="닉네임"
            type="text"
            placeholder="닉네임을 입력하세요"
            register={register("nickname", {
              required: "닉네임을 입력해주세요",
              minLength: {
                value: 2,
                message: "2자 이상 입력해주세요",
              },
              maxLength: {
                value: 20,
                message: "20자 이하로 입력해주세요",
              },
              pattern: {
                value: /^[가-힣a-zA-Z0-9]+$/,
                message: "한글, 영문, 숫자만 입력 가능합니다",
              },
            })}
            error={errors.nickname?.message as string}
            maxLength={20}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex cursor-pointer items-center justify-center border-2 bg-indigo-300 p-3 hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "가입 중..." : "가입하기"}
          </button>
        </div>
      </form>

      <BottomNav isActive="Home" />
    </div>
  );
}

export default RegisterPage;
