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
        instructor: {
            // GraphQL schema lists instructor as String, but in the database we store a ref to User
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        price: {
            type: Number,
            default: 0,
        },
        category: {
            type: String,
        },
        subCategory: {
            type: String,
        },
        level: {
            type: String,
        },
        language: {
            type: String,
        },
        wahtYouWillLearn: [
            {
                type: String,
            },
        ],
        requirements: [
            {
                type: String,
            },
        ],
        targetAudience: [
            {
                type: String,
            },
        ],
        isPublished: {
            type: Boolean,
            default: false,
        },
        isFree: {
            type: Boolean,
            default: false,
        },
        coverImage: {
            type: String,
            required: true,
        },
        previewVideo: {
            type: String,
        },
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        isPopular: {
            type: Boolean,
            default: false,
        },
        istrending: {
            type: Boolean,
            default: false,
        },
        isBestseller: {
            type: Boolean,
            default: false,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        ratingAverage: {
            type: Number,
            default: 0,
        },
        ratingQuantity: {
            type: Number,
            default: 0,
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
        isRejected: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Course = mongoose.model("Course", schema);