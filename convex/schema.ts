import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  yogurtBowls: defineTable({
    imageStorageId: v.string(), // Convex Storage ID
    title: v.string(),
    ingredients: v.array(v.string()),
    description: v.string(),
    createdAt: v.string(), // YYYY.MM.DD 형식
  }),
});
