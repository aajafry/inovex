import * as z from "zod";

const ticketSchema = z.object({ 
    client: z
      .string({
        required_error: "client name is required",
        invalid_type_error: "client name be a string",
      }),
    order: z
     .string({
        required_error: "order id is required",
        invalid_type_error: "order id must be a string",
      }),
    subject: z
      .string({
        required_error: "ticket subject is required",
        invalid_type_error: "ticket subject must be a string",
      })
      .min(8, { message: "ticket subject must be contain at least 8 characters" })
      .max(32, { message: "ticket subject must be contain at most 32 characters" }),
    manager: z
     .string({
        required_error: "manager name is required",
        invalid_type_error: "manager name must be a string",
      }),
    brif: z 
    .string({
        required_error: "ticket brif is required",
        invalid_type_error: "ticket brif must be a string",
    }),
    status: z
     .enum(["Open","Hold","Close"]),
    priority: z
     .enum(["Urgent","Regular","Normal"]),
})

export { ticketSchema };

