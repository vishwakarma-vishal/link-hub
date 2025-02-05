import mongoose, { Types } from "mongoose";

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        enum: ["youtube", "twitter"],
        required: true
    },
    tags: [{
        type: Types.ObjectId,
        ref: 'Tag'
    }],
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Content = mongoose.model("Content", contentSchema);

export default Content;