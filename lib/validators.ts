import { z } from "zod";

export const collegeQuerySchema = z.object({
  search: z.string().trim().optional().default(""),
  city: z.string().trim().optional().default(""),
  type: z.enum(["PUBLIC", "PRIVATE", "DEEMED"]).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(24).default(12),
  sort: z.enum(["rating", "tuition", "ranking", "recent"]).default("rating"),
});

export const compareSchema = z.object({
  ids: z.array(z.string().min(1)).min(1).max(3),
});

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export const reviewSchema = z.object({
  collegeId: z.string().min(1),
  title: z.string().min(4).max(120),
  content: z.string().min(20).max(1200),
  rating: z.coerce.number().int().min(1).max(5),
});
