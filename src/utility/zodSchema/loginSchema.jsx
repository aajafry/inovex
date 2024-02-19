import * as z from "zod";

const loginSchema = z.object({ 
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
      })
})

export { loginSchema };

