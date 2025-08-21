"use client";
import CustomInput from "@/components/shared/custom-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
} from "@/components/ui/form";
import { SignUpInput } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { emailSchema, nameSchema, passwordSchema, phoneSchema } from "../schemas";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";


export function SignUpForm() {
  const t = useTranslations("auth");
  const errors = useTranslations("errors");
  const requiredMessage = errors("required");
  const inputs: SignUpInput[] = [
    {
      id: "name",
      name: "name",
      lable: t("name"),
      type: "text",
    },
    {
      id: "email",
      name: "email",
      lable: t("email"),
      type: "email",
    },
    {
      id: "phone",
      name: "phone",
      lable: t("phone"),
      type: "tel",
    },
  ];
  const passwords: SignUpInput[] = [
    {
      id: "password",
      name: "password",
      lable: t("password"),
      type: "password",
    },
    {
      id: "repassword",
      name: "password_confirmation",
      lable: t("rePassword"),
      type: "password",
    },
  ];

  const formSchema = z
    .object({
      name:nameSchema(requiredMessage, errors("minName"), errors("maxName")),
      email: emailSchema(requiredMessage, errors("invalidEmail")),
      phone: phoneSchema(requiredMessage, errors("invalidPhone")),
      password:passwordSchema(requiredMessage, errors("minPassword")),
      password_confirmation: passwordSchema(requiredMessage, errors("minPassword")),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: errors("passwordMismatch"),
      path: ["password_confirmation"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast("Event has been created", {
      icon: <CheckCircle className="text-green-600 " />,
      className: " !gap-5",
      description: "Sunday, December 03, 2023 at 9:00 AM",
      closeButton: true,
      position: "top-center",
    })
    console.log(values);
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* name email phone  */}
          {inputs.map((input) => (
            <FormField
              key={input.id}
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <CustomInput
                  id={input.id}
                  label={input.lable}
                  field={field}
                  placeholder={input.lable}
                  type={input.type}
                />
              )}
            />
          ))}

      

          {/* password and repassword */}
          {passwords.map((input) => (
            <FormField
              key={input.id}
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <CustomInput
                  id={input.id}
                  label={input.lable}
                  field={field}
                  placeholder={input.lable}
                  type={input.type}
                />
              )}
            />
          ))}
          {/* remeber me */}
          <div className="flex items-center space-x-2">
            <Checkbox id="remberMe" />
            <label
              htmlFor="remberMe"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("rememberMe")}
            </label>
          </div>

          <Button
            type="submit"
            className="w-full text-lg font-semibold h-14 rounded-lg  "
          >
            {t("signUp")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
