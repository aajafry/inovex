import * as z from "zod";

const loginSchema = z.object({ 
    email: z
      .string({
        required_error: "email is required",
        invalid_type_error: "email must be a string",
      })
      .email({ message: "invalid email address" })
      .nonempty({ message: "email is required" }),
    password: z
      .string({
        required_error: "password is required",
        invalid_type_error: "invalid password",
      })
      .nonempty({ message: "password is required" }),
})

export { loginSchema };

