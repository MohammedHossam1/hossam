"use client";

import React from "react";
import { cn } from "@/lib/utils"; // لو بتستخدم tailwind-merge أو clsx

type AuthDisplayInfoProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
};

const AuthDisplayInfo: React.FC<AuthDisplayInfoProps> = ({
  title = "Welcome Back!",
  description = "Securely login and manage your account.",
  icon = "👋",
  className = "",
}) => {
  return (
    <div
      className={cn(
        "bg-primary min-h-[70vh] text-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center",
        className
      )}
    >
      <div className="mb-4">{icon}</div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm opacity-90">{description}</p>
    </div>
  );
};

export default AuthDisplayInfo;
