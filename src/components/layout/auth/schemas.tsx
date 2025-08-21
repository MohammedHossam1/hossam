import { z } from "zod";

export const nameSchema = (
  msgRequired: string,
  msgMin: string,
  msgMax: string
) =>
  z
    .string()
    .nonempty(msgRequired)
    .min(3, { message: msgMin })
    .max(40, { message: msgMax });

export const phoneSchema = (msg: string, msgInvalid: string) => z.string().nonempty(msg).regex(/^01[0-9]{9}$/, {
  message: msgInvalid, // الرسالة عند عدم تطابق النمط
});

export const passwordSchema = (msgRequired: string, msgMin: string) =>
  z.string().nonempty(msgRequired).min(8, msgMin);


export const emailSchema = (msgRequired: string, msgInvalid: string) =>
  z.string().nonempty(msgRequired).email(msgInvalid);

export const codeSchema = (msgRequired: string, msgInvalid: string) =>
  z
    .string()
    .nonempty(msgRequired)
    .regex(/^\d{6}$/, msgInvalid);
