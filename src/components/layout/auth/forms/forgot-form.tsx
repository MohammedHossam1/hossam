"use client";

import CustomInput from "@/components/shared/custom-input";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { phoneSchema } from "../schemas";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function ForgotForm() {
  const t = useTranslations("auth");
  const errors = useTranslations("errors");
  const requiredMessage = errors("required");
  const formSchema = z.object({
    phone: phoneSchema(requiredMessage, errors("invalidPhone")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
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
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <CustomInput
                id="phone"
                label={t("phone")}
                field={field}
                placeholder={t("phone")}
                type="tel"
              />
            )}
          />
       
          <Button
            type="submit"
            loading={form.formState.isSubmitting}
            className="w-full text-lg font-semibold h-14 rounded-lg "
          >
            {t("send")}
          </Button>
          
        </form>
      </Form>
    </div>
  );
}
