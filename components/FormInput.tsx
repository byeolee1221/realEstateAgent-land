interface FormInputProps {
  id: string;
  type: string;
  title: string;
  placeholder?: string;
  register: any;
  error: any;
}

const FormInput = ({ id, type, title, placeholder, register, error }: FormInputProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id} className="text-xs text-gray-500">
        {title}
      </label>
      <input
        {...register(id)}
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent"
      />
      {error && <p className="error-text-start">{error.message}</p>}
    </div>
  );
};

export default FormInput;
