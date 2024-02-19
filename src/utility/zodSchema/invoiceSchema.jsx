import * as z from "zod";

const invoiceSchema = z.object({ 
    client: z
      .string({
        required_error: "client name is required",
        invalid_type_error: "client name be a string",
      }),
    service: z
      .string({
         required_error: "service name is required",
         invalid_type_error: "service name be a string",
       }),
    order: z
     .string({
        required_error: "order id is required",
        invalid_type_error: "order id be a string",
      }),
    country: z
      .string({
        required_error: "country name is required",
        invalid_type_error: "country name must be a string",
      })
      .min(3, { message: "country name must be contain at least 4 characters" })
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
    payableAmt: z
      .number({
        required_error: "payable amount is required",
        invalid_type_error: "payable amount must be a number",
      })
      .positive(),
    discAmt: z
      .string({
        required_error: "discount amount is required",
        invalid_type_error: "discount amount must be a number",
      })
      .regex(/^[0-9]\d*$/, {
        message: "discount amount must be a positive number",
      }),
    paidAmt: z
      .string({
        required_error: "paid amount is required",
        invalid_type_error: "paid amount must be a number",
      })
      .regex(/^[0-9]\d*$/, {
        message: "paid amount must be a positive number",
      }),
    dueAmt: z
      .number({
        required_error: "due amount is required",
        invalid_type_error: "due amount must be a number",
      }),
    totalAmt: z
     .number({
        required_error: "total amount is required",
        invalid_type_error: "total amount must be a number",
      }),
    status: z
      .enum(["Paid", "Unpaid"]),
    note: z
    .string({
        required_error: "note is required",
        invalid_type_error: "note must be a string",
      })
    .optional(), 
})

export { invoiceSchema };

