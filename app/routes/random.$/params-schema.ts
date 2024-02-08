import z from "zod";
import validator from "validator";

export const paramsSchema = z.tuple([
  z
    .string()
    .transform((val) => `#${val}`)
    .refine(validator.isHexColor),
  z.enum(["dashboard", "cards"]),
]);
