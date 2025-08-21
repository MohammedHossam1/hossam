"use client";

import CustomInput from "@/components/shared/custom-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
} from "@/components/ui/form";
import { SignInInput } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { passwordSchema, phoneSchema } from "../schemas";


export function SignInForm() {
  const t = useTranslations("auth");
  const errors = useTranslations("errors");
  const requiredMessage = errors("required");
  const inputs: SignInInput[] = [
    {
      id: "phone",
      name: "phone",
      lable: t("phone"),
      type: "tel",
    },
    {
      id: "password",
      name: "password",
      lable: t("password"),
      type: "password",
    },
  ];

  const formSchema = z.object({
    phone: phoneSchema(requiredMessage, errors("invalidPhone")),
    password: passwordSchema(requiredMessage, errors("minPassword")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <Link href="/forgot-password" className="text-sm block">
            {t("forgotPassword")}
          </Link>
          <Button
            loading={form.formState.isSubmitting}
            type="submit"
            className="w-full text-lg font-semibold h-14 rounded-lg "
          >
            {t("signIn")}
          </Button>
          <div className="text-center text-sm flex items-center justify-center gap-1">
            <p className="text-[#595959]">{t("noAccount")}</p>
            <Link href="/sign-up" className="font-bold">
              {t("signUp")}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
