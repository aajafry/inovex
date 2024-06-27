import * as z from "zod";

const signupSchema = z.object({ 
    name: z
      .string({
        required_error: "name is required",
        invalid_type_error: "name must be a string",
      })
      .min(3, { message: "name must be contain at least 3 characters" })
      .max(16, { message: "name must be contain at most 16 characters" })
      .nonempty({ message: "name is required" }),
    email: z
      .string({
        required_error: "email is required",
        invalid_type_error: "email must be a string",
      })
      .email({ message: "invalid email address" })
      .nonempty({ message: "email is required" }),
    password: z
      .string()
      .min(8, { message: "password must be contain at least 8 characters long" })
      .max(32, { message: "password must be contain at most 32 characters long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/, {
         message: "password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      })
      .nonempty({ message: "password is required" }),
 })

export { signupSchema };

