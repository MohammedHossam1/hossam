'use server';
import { getCookie } from "@/services";
import { getLocale } from "next-intl/server";
export const getHeaders = async (
  token: boolean,
  contentType: "json" | "form" = "json"
): Promise<{ [key: string]: string } | null> => {
  const locale = await getLocale();
  const headers: Record<string, string> = {
    "Accept-Language": locale,
  };

  if (contentType === "json") {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    const tokenValue = await getCookie("token");
    if (!tokenValue) return null;
    headers["Authorization"] = `Bearer ${tokenValue}`;
  }

  return headers;
};


// React Query Fetch Method
export const getDataReactQuery = async (args: {
  url: string;
  token?: boolean;
}) => {
  const headers = await getHeaders(args.token || false);
  if (args.token && !headers) {
    throw new Error("Unauthorized: No token provided");
  }
  try {
    const response = await fetch(args.url, headers ? { headers } : {});
    return await response.json();
  } catch (err: any) {
    const message = err?.message || "Unexpected error occurred";
    throw new Error(message);
  }
};

// جلب البيانات العادي
export const getData = async (args: { url: string; token?: boolean; cashed?: boolean }) => {
  const headers = await getHeaders(args.token || false);

  if (args.token && !headers) {
    return { code: 401, success: false };
  }

  const fetchOptions: RequestInit = {
    ...(headers && { headers }),
    ...(args.cashed && { cache: "force-cache" }), 
  };

  try {
    const response = await fetch(args.url, fetchOptions);
    const data = await response.json();
    return { code: 200, success: true, data };
  } catch (err: any) {
    const message = err?.message || "Unexpected error occurred";
    return { code: 400, success: false, data: message };
  }
};


// إرسال البيانات (POST)
export const postData = async (args: {
  url: string;
  token?: boolean;
  data?: any;
  isFormData?: boolean;
}) => {
  const headers = await getHeaders(args.token || false, args.isFormData ? "form" : "json");

  const body = args.isFormData ? getFormData(args.data || {}) : JSON.stringify(args.data || {});

  try {
    const response = await fetch(args.url, {
      method: "POST",
      headers: headers || {},
      body,
    });

    const data = await response.json();
    return { ...data, code: response.status };
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      "Unexpected error occurred";
    return {
      isError: true,
      message,
      code: err?.response?.status || 500,
    };
  }
};



export const putData = async (args: {
  url: string;
  token?: boolean;
  data?: any;
  isFormData?: boolean;
}) => {
  const headers = await getHeaders(args.token || false, args.isFormData ? "form" : "json");
  const body = args.isFormData ? getFormData(args.data || {}) : JSON.stringify(args.data || {});

  try {
    const response = await fetch(args.url, {
      method: "PUT",
      headers: headers || {},
      body,
    });
    const data = await response.json();
    return { ...data, code: response.status };
  } catch (err: any) {
    return {
      isError: true,
      message: err?.message || "Unexpected error occurred",
      code: err?.response?.status || 500,
    };
  }
};

export const deleteData = async (args: {
  url: string;
  token?: boolean;
}) => {
  const headers = await getHeaders(args.token || false);

  try {
    const response = await fetch(args.url, {
      method: "DELETE",
      headers: headers || {},
    });
    const data = await response.json();
    return { ...data, code: response.status };
  } catch (err: any) {
    return {
      isError: true,
      message: err?.message || "Unexpected error occurred",
      code: err?.response?.status || 500,
    };
  }
};


function getFormData(data: any): FormData {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value as any);
  });
  return formData;
}
