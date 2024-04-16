import * as z from "zod";

export const UserValidation = z.object({
  cardTitle: z.string().min(3).max(30),
  cardColor: z.string().min(3).max(30),
  to: z.string().min(2).max(20),
  for: z.string().min(3).max(300),
  from: z.string().max(20),
  created: z.string(),
  id: z.string(),
});
