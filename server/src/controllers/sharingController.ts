import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Content from "../models/Content";

const generateHash = () => {
    return Math.random().toString(36).substring(2, 15);
}

const toggleSharing = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body;

    try {
        const userInDb = await User.findOne({ userId });

        if (!userInDb) {
            res.status(404).json({
                success: false,
                message: "user not found"
            });
            return;
        }

        if (userInDb.sharing) {
            userInDb.sharing = false;
            userInDb.sharing_token = "";
            await userInDb.save();

            res.status(200).json({
                success: true,
                message: "Turned off sharing successfully."
            });
        } else {
            const hash = generateHash();
            userInDb.sharing = true;
            userInDb.sharing_token = hash;
            await userInDb.save();

            res.status(200).json({
                success: true,
                message: "Turned on sharing successfully.",
                token: hash
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export { toggleSharing, getUserData };