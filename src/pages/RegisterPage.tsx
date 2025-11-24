import FormInput from "../components/FormInput";

function RegisterPage() {
  return (
    <div className="mx-auto h-screen max-w-md overflow-y-auto bg-amber-50 px-18 py-10">
      <div className="flex items-center justify-center p-12">
        <h1 className="text-4xl">Register</h1>
      </div>

      <form>
        <div className="flex flex-col gap-8 border-2 bg-white p-5">
          <FormInput name="이메일" type="email" placeholder="이메일을 입력하세요" />
          <FormInput name="비밀번호" type="password" placeholder="8자 이상 입력하세요" />
          <FormInput name="비밀번호 확인" type="password" placeholder="8자 이상 입력하세요" />
          <FormInput name="닉네임" type="text" placeholder="닉네임을 입력하세요" />

          <div className="mt-2 flex items-center justify-center border-2 bg-indigo-300 p-3">
            <button>가입하기</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
