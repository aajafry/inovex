import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const quotationSchema = z.object({ 
    client: z
      .string({
        required_error: "client name is required",
        invalid_type_error: "client name be a string",
      }),
    service: z
      .string({
        required_error: "service name is required",
        invalid_type_error: "service name must be a string",
      }),
    manager: z
      .string({
        required_error: "manager name is required",
        invalid_type_error: "manager name must be a string",
      }),
    brif: z
      .string({
        required_error: "quotation brif is required",
        invalid_type_error: "quotation brif must be a string",
      }),
    attachment: z
      .any()
      .refine(
        (files) => !files || (files?.length === 1),
         { message: "quotation attachment is required." }
       )
      .refine(
        (files) => !files || (files?.[0]?.size && files?.[0]?.size <= MAX_FILE_SIZE),
         { message: "Max file size is 5MB." }
       )
      .refine(
        (files) => !files || (files?.[0]?.type && ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type)),
          { message: ".jpg, .jpeg, and .png files are accepted." }
      ),
    openedAt: z
      .string({
        required_error: "opened at is required",
        invalid_type_error: "opened at must be date formate",
      })
      .regex(/^(?:(?:19|20)\d{2})-(?:(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8]))|(?:(?:0[13-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31)|(?:02-29))$/,{
        message: "opened at must be DD/MM/YYYY formate"
      }),
    completedAt: z
      .string({
        required_error: "completed at is required",
        invalid_type_error: "completed at must be date formate",
      })
      .regex(/^(?:(?:19|20)\d{2})-(?:(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8]))|(?:(?:0[13-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31)|(?:02-29))$/,{
        message: "completed at must be DD/MM/YYYY formate"
      }),
    quantity: z
      .string({
        required_error: "quantity is required",
        invalid_type_error: "quantity must be a number",
      })
      .regex(/^[1-9]\d*$/, {
        message: "quantity must be a positive number",
      }),
    budget: z
      .string({
        required_error: "budget is required",
        invalid_type_error: "budget must be a number",
      })
      .regex(/^[1-9]\d*$/, {
        message: "budget must be a positive number",
      }),
})

export { quotationSchema };
