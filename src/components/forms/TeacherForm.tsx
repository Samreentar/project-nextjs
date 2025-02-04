"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  name: z.string().min(1, { message: "Full name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  contactNumber: z.string().min(1, { message: "Phone number is required!" }),
  classes: z
    .string()
    .min(1, { message: "At least one class is required!" })
    .transform((value) => value.split(",")), // Convert comma-separated string to array
  subjects: z
    .string()
    .min(1, { message: "At least one subject is required!" })
    .transform((value) => value.split(",")), // Convert comma-separated string to array
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
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
      email: data?.email || "",
      contactNumber: data?.contactNumber || "",
      classes: data?.classes?.join(",") || "", // Convert array to comma-separated string for editing
      subjects: data?.subjects?.join(",") || "", // Convert array to comma-separated string for editing
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const apiUrl =
        type === "create"
          ? "http://localhost:8080/api/admin/teacher"
          : `http://localhost:8080/api/admin/teacherupdate/${data._id}`;
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
        throw new Error(errorData.message || "Failed to save teacher information.");
      }

      const result = await response.json();
      console.log("Success:", result);

      if (type === "create") {
        alert(
          `Teacher created successfully!\n\nUsername: ${result.teacher.username}\nPassword: ${result.teacher.password}`
        );
      } else {
        alert("Teacher updated successfully!");
      }
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.message || "An error occurred while saving the teacher.");
    }
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a New Teacher" : "Update Teacher"}
      </h1>
      <div className="flex flex-wrap gap-4">
        <InputField
          label="Teacher Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Teacher Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors.email}
        />
        <InputField
          label="Teacher Phone Number"
          name="contactNumber"
          defaultValue={data?.contactNumber}
          register={register}
          error={errors.contactNumber}
        />
        <InputField
          label="Teacher Classes (comma-separated)"
          name="classes"
          defaultValue={data?.classes?.join(",")}
          register={register}
          error={errors.classes}
        />
        <InputField
          label="Teacher Subjects (comma-separated)"
          name="subjects"
          defaultValue={data?.subjects?.join(",")}
          register={register}
          error={errors.subjects}
        />
      </div>
      <button className="bg-bgpurple text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
