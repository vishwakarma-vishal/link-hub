import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    sharing: boolean;
    sharing_token: string;
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    sharing: {
        type: Boolean,
        default: false
    },
    sharing_token: {
        type: String
    }
});

const User = mongoose.model("User", UserSchema);

export default User;