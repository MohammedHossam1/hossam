import { Input } from "@/components/ui/input";
import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useLocale } from "next-intl";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  field: object;
  type?: string;
  placeholder: string;
  inputStyle?: string;
  isEditing?: boolean;
}

const CustomInput = ({
  label,
  id,
  field,
  type = "text",
  inputStyle,
  isEditing = true,
  placeholder,
  ...props
}: CustomInputProps) => {
  const locale = useLocale();
  return (
    <>
      <FormItem className="relative w-full">
        <FormControl>
          <div className="flex flex-col space-y-2">
            <FormLabel
              htmlFor={id}
              className="text-[#050708] text-base font-normal"
            >
              {label}
            </FormLabel>
            <Input
              dir={locale == "ar" ? "rtl" : "ltr"}
              id={id}
              disabled={!isEditing}
              type={type}
              className={`!p-3 !py-6 text-base border-[1px] focus-visible:ring-1  focus-visible:ring-black !border-[#E1DCDC] !rounded-lg placeholder:text-[#A6A6A6] " ${inputStyle} ${
                isEditing ? "border" : "bg-[#F2F2F2] border border-[#F2F2F2]"
              }`}
              {...field}
              placeholder={placeholder}
              {...props}
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </>
  );
};
export default CustomInput;