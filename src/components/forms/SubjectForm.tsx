"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Subject name must be at least 3 characters long!" })
    .max(50, { message: "Subject name must be at most 50 characters long!" }),
  teacher: z
    .string()
    .min(2, { message: "Teacher's name must be at least 2 characters long!" })
    .max(50, { message: "Teacher's name must be at most 50 characters long!" }),
});

type Inputs = z.infer<typeof schema>;

const SubjectForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data?.name || "",
      teacher: data?.teacher || "",
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const apiUrl =
        type === "create"
          ? "http://localhost:8080/api/admin//subjects"
          : `http://localhost:8080/api/admin/subjectupdate/${data._id}`;
      const method = type === "create" ? "POST" : "PUT";

      const response = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save subject.");
      }

      const result = await response.json();
      console.log("Success:", result);
      alert(`Subject ${type === "create" ? "created" : "updated"} successfully!`);
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.message || "An error occurred while saving the subject.");
    }
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new subject" : "Update subject"}
      </h1>
      <div className="flex flex-wrap gap-4">
        <InputField
          label="Subject Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Teacher's Name"
          name="teacher"
          defaultValue={data?.teacher}
          register={register}
          error={errors.teacher}
        />
      </div>
      <button className="bg-bgpurple text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
