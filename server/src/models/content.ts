import mongoose, { Types, Document, Schema } from "mongoose";

export interface IContent extends Document {
    title: string;
    link: string;
    category: "youtube" | "twitter";
    tags: Types.ObjectId[];
    userId: Types.ObjectId;
}

const contentSchema = new Schema<IContent>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["youtube", "twitter"],
        required: true
    },
    tags: {
        type: [Schema.Types.ObjectId],
        ref: 'Tag'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Content = mongoose.model("Content", contentSchema);

export default Content;