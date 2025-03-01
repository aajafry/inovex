import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const serviceSchema = z.object({
  name: z
    .string({
      required_error: "service name is required",
      invalid_type_error: "service name must be a string",
    })
    .min(8, { message: "service name must be contain at least 8 characters" })
    .max(32, { message: "service name must be contain at most 32 characters" }),
  brif: z.string({
    required_error: "service brif is required",
    invalid_type_error: "service brif must be a string",
  }),
  attachment: z
    .any()
    .refine((files) => !files || files?.length === 1, {
      message: "Image is required.",
    })
    .refine(
      (files) =>
        !files || (files?.[0]?.size && files?.[0]?.size <= MAX_FILE_SIZE),
      { message: "Max file size is 5MB." }
    )
    .refine(
      (files) =>
        !files ||
        (files?.[0]?.type && ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type)),
      { message: ".jpg, .jpeg, and .png files are accepted." }
    ),
  paymentTerm: z.enum(["Pay with Invoice", "Pay with Instalment"]),
  price: z
    .string({
      required_error: "price is required",
      invalid_type_error: "price must be a number",
    })
    .regex(/^[1-9]\d*$/, {
      message: "price must be a positive number",
    }),
  duration: z
    .string({
      required_error: "duration is required",
      invalid_type_error: "duration must be a string",
    })
    .min(4, {
      message: "duration must be contain at least 4 characters",
    }),
});

export { serviceSchema };
