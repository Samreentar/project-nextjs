"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address!" }),
  fullName: z.string().min(1, { message: "Full name is required!" }),
  phoneNumber: z.string().min(1, { message: "Phone is required!" }),
  studentClass: z.string().min(1, { message: "Class is required!" }),
  subjects: z.string().min(1, { message: "Subjects are required!" }), // For simplicity, we'll keep this as a string for now.
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({
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
      fullName: data?.fullName || "",
      email: data?.email || "",
      phoneNumber:data?.phoneNumber || "",
      studentClass: data?.studentClass || "",
      subjects: data?.subjects || "",
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const apiUrl =
        type === "create"
          ? "http://localhost:8080/api/admin/students"
          : `http://localhost:8080/api/admin/studentupdate/${data._id}`;
      const method = type === "create" ? "POST" : "PUT";
      console.log("API URL:", apiUrl); 
      console.log("Data passed to form:", data);

      const response = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error( errorData.message || "Failed to save student.");
      }

      const result = await response.json();
      console.log("Success:", result);
      alert(`Student ${type === "create" ? "created" : "updated"} successfully!`);
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
          label="Student Name"
          name="fullName"
          defaultValue={data?.fullName}
          register={register}
          error={errors.fullName}
        />
        <InputField
          label="Student Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors.email}
        />
        <InputField
          label="Student phoneNumber"
          name="phoneNumber"
          defaultValue={data?.phoneNumber}
          register={register}
          error={errors.phoneNumber}
        />
        <InputField
          label="Student class"
          name="studentClass"
          defaultValue={data?.studentClass}
          register={register}
          error={errors.studentClass}
        />
         <InputField
          label="Student subjects"
          name="subjects"
          defaultValue={data?.subjects}
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

export default StudentForm;
