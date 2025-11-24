interface FormInputProps {
  name: string;
  type: string;
  placeholder: string;
}

function FormInput({ name, type, placeholder }: FormInputProps) {
  return (
    <div className="flex flex-col">
      <span className="pb-2">{name}</span>
      <input type={type} placeholder={placeholder} className="w-full border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
    </div>
  );
}

export default FormInput;
