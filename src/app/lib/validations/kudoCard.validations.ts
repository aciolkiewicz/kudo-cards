import * as z from "zod";

export const UserValidation = z.object({
  cardTitle: z.string().min(3).max(30),
  cardColor: z.string().min(3).max(30),
  to: z.string().min(2).max(40),
  for: z.string().min(3).max(250),
  from: z.string().max(40),
  gifUrl: z.string().max(400),
  hearts: z.number(),
  created: z.string(),
});
