"use client";
import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

type Prop = {
  src?: string | StaticImport | null
  alt?: string | null
  className?: string
  isUser?: boolean
} & Omit<ImageProps, "src" | "alt">


export default function ImageFallBack({
  src,
  alt,
  className,
  isUser = false,
  ...rest // Capture all other ImageProps
}: Prop) {
  const [imgSrc, setImgSrc] = useState(src);
  const userFallBack = "/placeholder/user-placeholder.jpg";
  const fallBackImage = "/placeholder/images-placeholder.png";

  const handleError = () => {
    setImgSrc(isUser ? userFallBack : fallBackImage);
  };

  return (
    <Image
      src={imgSrc || fallBackImage}
      alt={alt || ""}
      onError={handleError}
      className={cn(rest.fill ? "relative" : "object-cover", className)}
      {...rest}
    />
  );
}
