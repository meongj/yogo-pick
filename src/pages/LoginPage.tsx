import FormInput from "../components/FormInput";
import googleIcon from "../../public/images/icons/google.svg";

function LoginPage() {
  return (
    <div className="mx-auto h-screen max-w-md overflow-y-auto bg-amber-50 px-18 py-10">
      <div className="flex items-center justify-center p-12">
        <h1 className="text-4xl">Login</h1>
      </div>

      <div className="flex flex-col gap-5">
        <form>
          <div className="flex flex-col gap-8 border-2 bg-white p-5">
            <FormInput name="이메일" type="email" placeholder="이메일을 입력하세요" />
            <FormInput name="비밀번호" type="password" placeholder="8자 이상 입력하세요" />

            <div className="flex flex-col gap-3">
              <div className="mt-2 flex items-center justify-center border-2 bg-indigo-300 p-3">
                <button>로그인</button>
              </div>
              <div className="flex items-center justify-center border-2 bg-gray-100 p-3">
                <button>회원가입</button>
              </div>
            </div>
          </div>
        </form>

        <div className="flex flex-col items-center justify-center gap-5">
          <p className="text-xl">or</p>
          <div className="flex w-full items-center justify-center gap-1 border-2 bg-gray-100 p-3">
            <img src={googleIcon} alt="구글 아이콘" className="h-5 w-5" />
            <button>구글로 계속하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
