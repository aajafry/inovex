import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const userSchema = z.object({ 
    name: z
      .string({
        required_error: "name is required",
        invalid_type_error: "name must be a string",
      })
      .min(3, { message: "name must be contain at least 3 characters" })
      .max(16, { message: "name must be contain at most 16 characters" }),
    email: z
      .string({
        required_error: "email is required",
        invalid_type_error: "email must be a string",
      })
      .email({ message: "invalid email address" }),
    password: z
    .string()
    .min(8, { message: "password must be contain at least 8 characters long" })
    .max(32, { message: "password must be contain at most 32 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/, {
      message: "password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    }),
    country: z
      .string({
        required_error: "country name is required",
        invalid_type_error: "country name must be a string",
       })
      .min(3, { message: "country name must be contain at least 3 characters" })
      .max(16, { message: "country name must be contain at most 16 characters" }),
    city: z
      .string({
        required_error: "country name is required",
        invalid_type_error: "country name must be a string",
       })
      .min(3, { message: "country name must be contain at least 3 characters" })
      .max(16, { message: "country name must be contain at most 16 characters" }),
    state: z
      .string({
        required_error: "state name is required",
        invalid_type_error: "country name must be a string",
       })
      .min(3, { message: "state name must be contain at least 3 characters" })
      .max(16, { message: "state name must be contain at most 16 characters" }),
    zip: z
      .string({
        required_error: "zip code is required",
        invalid_type_error: "zip code must be a number",
      })
      .regex(/^[1-9]\d{0,4}$/, {
        message: "zip code must be a positive number",
      }),
    role: z
      .enum(["Super Admin", "Admin", "Moderator", "Client", "User"]),
    image: z
      .any()
      .refine(
        (files) => !files || (files?.length === 1),
         { message: "Image is required." }
      )
      .refine(
        (files) => !files || (files?.[0]?.size && files?.[0]?.size <= MAX_FILE_SIZE),
          { message: "Max file size is 5MB." }
      )
      .refine(
        (files) => !files || (files?.[0]?.type && ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type)),
          { message: ".jpg, .jpeg, and .png files are accepted." }
      ),    
 })

export { userSchema };

