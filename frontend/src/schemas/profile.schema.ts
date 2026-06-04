import { z } from "zod";

export const createProfileSchema = z.object({
  bio: z.string().max(500).optional(),

  avatar_url: z
    .string()
    .url("Invalid URL")
    .optional()
    .or(z.literal("")),
});

export type CreateProfileFormData =
  z.infer<typeof createProfileSchema>;