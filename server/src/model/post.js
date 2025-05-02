import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    caption: {
      type: String,
      trim: true,
      required: [true, "Caption is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    media: {
      type: [String],
      required: [true, "Media files are required"],
    },
    mediaPublicIds: {
      type: [String],
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    savedBy: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

export default Post;
