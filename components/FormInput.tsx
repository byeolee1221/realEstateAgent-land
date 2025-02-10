import { MemoSchema } from "@/app/consultingMemo/write/constants";
import { NoteSchema } from "@/app/consultingNote/write/constants";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

interface FormInputProps {
  id: string;
  type: string;
  title: string;
  placeholder?: string;
  location: "note" | "memo";
}

const FormInput = ({ id, type, title, placeholder, location }: FormInputProps) => {
  type Schema = z.infer<typeof location extends "note" ? typeof NoteSchema : typeof MemoSchema>;

  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id} className="text-xs text-gray-500">
        {title}
      </label>
      <input
        {...register(id as keyof Schema)}
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent"
      />
      {errors[id as keyof Schema] && (
        <p className="error-text-start">{errors[id as keyof Schema]?.message}</p>
      )}
    </div>
  );
};

export default FormInput;
