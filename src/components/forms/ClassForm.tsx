"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import InputField from "../InputField";
import { z } from "zod";
 
const schema = z.object({
  className: z
    .string()
    .min(3, { message: "Subject name must be at least 3 characters long!" })
    .max(50, { message: "Subject name must be at most 50 characters long!" }),
  teacherName: z
    .string()
    .min(2, { message: "Teacher's name must be at least 2 characters long!" })
    .max(50, { message: "Teacher's name must be at most 50 characters long!" }),
    grade:z
    .string(),
});
type Inputs = z.infer<typeof schema>;
const ClassForm = ({
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
      className: data?.className || "",
      teacherName: data?.teacherName || "",
      grade: data?.grade|| "",
    },
  });

 

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const apiUrl =
        type === "create"
          ? "http://localhost:8080/api/admin//classes"
          : `http://localhost:8080/api/admin/class/${data._id}`;
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
      alert(`Class ${type === "create" ? "created" : "updated"} successfully!`);
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.message || "An error occurred while saving the subject.");
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a New Class" : "Update the Class"}
      </h1>

      <div className="flex flex-wrap gap-4">
        <InputField
          label="Class Name"
          name="className"
          defaultValue={data?.className}
          register={register}
          error={errors.className}
        />
        {errors.className && (
          <p className="text-xs text-red-400">Class name is required</p>
        )}

        <InputField
          label="Teacher Name"
          name="teacherName"
          defaultValue={data?.teacherName}
          register={register}
          error={errors.teacherName}
        />
        {errors.teacherName && (
          <p className="text-xs text-red-400">Teacher name is required</p>
        )}

        <InputField
          label="Grade"
          name="grade"
          defaultValue={data?.grade}
          register={register}
          error={errors.grade}
        />
        {errors.grade && (
          <p className="text-xs text-red-400">Grade is required</p>
        )}
      </div>

      <button type="submit" className="bg-bgpurple text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ClassForm;
