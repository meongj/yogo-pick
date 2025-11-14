import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
  yogurtBowls: defineTable({
    imageStorageId: v.string(), // Convex Storage ID
    createdAt: v.number(), // timestamp
  }),
});
