import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    resources: [
      {
        type: String,
      }
    ],
    videoUrl: {
      type: String, // Note: In GraphQL schema this is a custom type 'videoUrl', adjust if needed
    },
    duration: {
      type: Number,
      required: true,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isPreview: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

// Add index on position within a section for ordering
schema.index({ section: 1, position: 1 });

export const Lecture = mongoose.model("Lecture", schema);
