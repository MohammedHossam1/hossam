"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";



{/* 
   1-UI of the form
      * label
      * input
      * error
   2-Validation (schema)
      * primative validation
      * custom validation (refine)
      * zod resolver
      * infer
   3-useForm (register, handleSubmit, formState)
        * formState => errors , isSubmitting
        * 
  */}
       
interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showToggle?: boolean;
  toggleHandler?: () => void;
}

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof schema>;

const CustomInput = ({
  label,
  error,
  showToggle,
  toggleHandler,
  type,
  ...props
}: IInputProps) => {
  return (
    <div className=" ">
      <label className="block mb-1 font-medium">{label}</label>
      <div className="relative">
        <input
          {...props}
          type={type}
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {showToggle && toggleHandler && (
          <button
            type="button"
            onClick={toggleHandler}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {type === "password" ? "Show" : "Hide"}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Signup failed");

      toast.success("Signup successful!", {
        description: "Your account has been created successfully.",
        icon: "✅",
      });

      reset(); 
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-1/2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full space-y-4"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <CustomInput
          {...register("name")}
          label="Name"
          error={errors.name?.message}
          type="text"
        />

        <CustomInput
          {...register("email")}
          label="Email"
          error={errors.email?.message}
          type="email"
        />

        <CustomInput
          {...register("password")}
          label="Password"
          error={errors.password?.message}
          type={showPassword ? "text" : "password"}
          showToggle
          toggleHandler={() => setShowPassword((prev) => !prev)}
        />

        <CustomInput
          {...register("confirmPassword")}
          label="Confirm Password"
          error={errors.confirmPassword?.message}
          type={showConfirmPassword ? "text" : "password"}
          showToggle
          toggleHandler={() => setShowConfirmPassword((prev) => !prev)}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
