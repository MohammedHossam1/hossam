"use client";
import { useLocale } from "next-intl";
import { Button } from "../ui/button";
import { useState } from "react";
import { setUserLocale } from "@/services";

export default function LangSwitcher() {
  const locale = useLocale();
  const [isLoading,setIsLoading]=useState(false)
  const changeLanguage = async () => {
    setIsLoading(true)
    const other_lang: "ar" | "en" = locale == "ar" ? "en" : "ar";
   await setUserLocale(other_lang);
    setIsLoading(false)
  };
  return (
    <Button
      onClick={changeLanguage}
      variant={"outline"}
      loading={isLoading}
      className="text-main rounded-lg font-bold w-10  flex items-center justify-center text-center leading-none"
      >
      {locale == "ar" ? "EN" :"ع"}
    </Button>
  );
}
