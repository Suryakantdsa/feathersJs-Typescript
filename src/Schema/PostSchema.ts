import { z } from 'zod';
import { Types } from 'mongoose';

// Helper to validate MongoDB ObjectIds
const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});

// Reusable title and description schemas
const titleSchema = z
                    .string()
                    .min(5, "Title must be at least 5 characters long")
                    .max(100, "Title can be up to 100 characters long");
const descriptionSchema = z
                            .string()
                            .min(10, "Description must be at least 10 characters long")
                            .max(500, "Description can be up to 500 characters long");


// Post_Post schema
const PostPostSchema = z.object({
  user: objectIdSchema,
  title: titleSchema,
  description: descriptionSchema,
  likeCount: z.number().optional(),
  commentCount: z.number().optional(),
});

// Post_Patch schema
const PostPatchSchema = z.object({
  user: objectIdSchema.optional(),
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
  likeCount: z.number().optional(),
  commentCount: z.number().optional(),
});


// Exporting schemas
export {  PostPostSchema, PostPatchSchema, };