"use client";

import { NoteEditSchema } from "@/app/consultingNote/[id]/edit/constants";
import { NoteFormArr } from "@/lib/formConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { EditableMap } from "@/lib/EditableMap";
import FormInput from "@/components/FormInput";
import { useEffect, useState } from "react";
import { INote } from "@/components/consultingNote/[id]/NoteItemList";

const EditForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const noteId = pathname.split("/")[2];
  const [note, setNote] = useState<INote>();

  const methods = useForm<z.infer<typeof NoteEditSchema>>({
    resolver: zodResolver(NoteEditSchema),
    mode: "all",
    defaultValues: {
      customerName: "",
      customerNumber: "",
      purposeUse: "",
      kind: "",
      transactionType: "",
      date: "",
      content: "",
      location: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof NoteEditSchema>) => {
    try {
      const response = await axios.post(`/api/consultingNote/noteEdit?url=${pathname}`, {
        currentUser: session?.user?.email,
        customerName: values.customerName,
        customerNumber: values.customerNumber,
        purposeUse: values.purposeUse,
        kind: values.kind,
        transactionType: values.transactionType,
        date: values.date,
        content: values.content,
        location: values.location,
      });

      if (response.status === 200) {
        methods.reset();
        router.push(`/consultingNote/${response.data}`);
      }
    } catch (error) {
      console.error("consultingNote noteEdit POST에서 API 오류 발생", error);
      if (axios.isAxiosError(error)) {
        return toast("오류 발생", {
          description: error.response?.data,
        });
      }
    }
  };

  useEffect(() => {
    const getNote = async () => {
      try {
        const response = await axios.get(`/api/consultingNote/noteEdit`, {
          params: {
            noteId,
          },
        });

        if (response.status === 200) {
          setNote(response.data);
        }
      } catch (error) {
        console.error("consultingNote noteEdit GET에서 API 오류 발생", error);
        if (axios.isAxiosError(error)) {
          return toast("오류 발생", {
            description: error.response?.data,
          });
        }
      }
    };

    getNote();
  }, []);

  useEffect(() => {
    methods.reset({
      customerName: note?.customerName,
      customerNumber: note?.customerNumber,
      purposeUse: note?.purposeUse,
      kind: note?.kind,
      transactionType: note?.transactionType,
      date: note?.date,
      content: note?.content,
      location: note?.location,
    });
  }, [note, methods.reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col space-y-3 text-sm">
        {NoteFormArr.map((item) => (
          <FormInput key={item.id} {...item} location="note" />
        ))}
        <div className="flex flex-col space-y-1">
          <label htmlFor="content" className="text-xs text-gray-500">
            상담내용
          </label>
          <textarea
            {...methods.register("content")}
            id="content"
            rows={10}
            className="border p-1 focus:outline-none focus:border-blue-500 bg-transparent resize-none"
          />
        </div>
        <EditableMap type="note" location={note?.location} />
        <div className="flex items-center justify-end space-x-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500 text-white px-3 py-2 rounded-md transition-colors"
            disabled={methods.formState.isSubmitting}
          >
            {methods.formState.isSubmitting ? "수정중" : "수정하기"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="border border-blue-500 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditForm;
