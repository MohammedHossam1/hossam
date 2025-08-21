"use server";

import { cookies } from "next/headers";


const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  const cookie = await cookies();
  return cookie.get(COOKIE_NAME)?.value;
}

export async function setUserLocale(locale: "en" | "ar") {
  const cookie = await cookies();
  cookie.set(COOKIE_NAME, locale);
}

export async function getCookie(cookieName: string) {
  const cookie = await cookies();
  return cookie.get(cookieName)?.value;
}

export async function setCookie(cookieName: string, value: string) {
  const cookie = await cookies();
  cookie.set(cookieName, value);
}
export async function deleteCookie(cookieName: string) {
  const cookie = await cookies();
  cookie.delete(cookieName);
}
