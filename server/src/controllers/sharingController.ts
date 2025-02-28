import { Request, Response } from "express";
import User from "../models/User";
import Content from "../models/Content";
import { IUser } from "../models/User";
import { AuthenticatedRequest } from "../middleware/authenticateUser";
import { StatusCode } from "../constants/statusCodes";
import crypto from "crypto";

//generate unique hash for every user
const generateUniqueHash = async (): Promise<string> => {
    let newHash: string = "";
    let isUnique = false;

    while (!isUnique) {
        newHash = crypto.randomBytes(16).toString("hex"); 
        const existingUser = await User.findOne({ sharing_token: newHash });
        if (!existingUser) {
            isUnique = true;
        }
    }

    return newHash;
};

const toggleSharing = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.token?.id;

    try {
        const userInDb = await User.findById(userId);

        if (!userInDb) {
            res.status(StatusCode.NotFound).json({
                success: false,
                message: "user not found"
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
            token: userInDb.sharing ? userInDb.sharing_token : undefined
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
        const userInDb = await User.findOne({ sharing_token: hash }) as IUser | null;

        if (!userInDb || !userInDb.sharing) {
            res.status(StatusCode.Unauthorized).json({
                success: false,
                message: "User hasn't shared their links."
            });
            return;
        }

        const userId = userInDb._id.toString();
        const links = await Content.find({ userId });

        res.status(StatusCode.Success).json({
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