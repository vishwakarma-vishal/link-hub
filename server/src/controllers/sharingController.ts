import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Content from "../models/Content";
import { StatusCode } from "../constants/statusCodes";
import crypto from "crypto";
import { AuthenticatedRequest } from "../middleware/authenticateUser";

// Generate a unique hash for every user
const generateUniqueHash = async (): Promise<string> => {
    const newHash = crypto.randomBytes(16).toString("hex");
    const existingUser = await User.findOne({ sharing_token: newHash });

    return existingUser ? generateUniqueHash() : newHash;
};

const toggleSharing = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.token?.id;

    try {
        const userInDb = await User.findById(userId);

        if (!userInDb) {
            res.status(StatusCode.NotFound).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        if (userInDb.sharing) {
            userInDb.sharing = false;
            userInDb.sharing_token = null;
        } else {
            userInDb.sharing = true;
            userInDb.sharing_token = await generateUniqueHash();
        }

        await userInDb.save();

        res.status(StatusCode.Success).json({
            success: true,
            message: userInDb.sharing
                ? "Sharing enabled successfully."
                : "Sharing disabled successfully.",
            token: userInDb.sharing ? userInDb.sharing_token : null
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log("Unknown error: ", error);
        }

        res.status(StatusCode.Error).json({
            success: false,
            message: process.env.NODE_ENV === "development" ?
                error instanceof Error ?
                    error.message :
                    "Unknown error occurred."
                : "Something went wrong."
        });
    }
}

const getUserData = async (req: Request, res: Response): Promise<void> => {
    const { hash } = req.query;

    try {
        const userInDb = await User.findOne({ sharing_token: hash });

        if (!userInDb || !userInDb.sharing) {
            res.status(400).json({
                success: false,
                message: "User hasn't shared their links."
            });
            return;
        }

        const userId = userInDb._id;
        const links = await Content.find({ userId });

        res.status(200).json({
            success: true,
            message: "Successfully fetched the user links.",
            data: links
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log("Unknown error: ", error);
        }

        res.status(StatusCode.Error).json({
            success: false,
            message: process.env.NODE_ENV === "development" ?
                error instanceof Error ?
                    error.message :
                    "Unknown error occurred."
                : "Something went wrong."
        });
    }
}

export { toggleSharing, getUserData };