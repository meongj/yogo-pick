import type { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  maxLength?: number;
}

function FormInput({ name, type, placeholder, register, error, maxLength }: FormInputProps) {
  return (
    <div className="flex flex-col">
      <label className="pb-2">{name}</label>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"} w-full border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
      />

      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
    </div>
  );
}

export default FormInput;
