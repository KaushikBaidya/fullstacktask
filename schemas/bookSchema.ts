import { z } from "zod";


export const bookSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  publishedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format" }), 
  genres: z
    .array(z.string().min(1, { message: "Each genre must be non-empty" }))
    .min(1, { message: "At least one genre is required" }),
  image: z.string().url({ message: "Invalid URL format" }),
  description: z.string().optional(),
});

export type BookFormValues = z.infer<typeof bookSchema>;
