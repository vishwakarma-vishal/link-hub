import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authenticateUser";
import { StatusCode } from "../constants/statusCodes";
import Content, { IContent } from "../models/Content";
import mongoose from "mongoose";

interface UpdateContentRequest extends Partial<IContent> { }

const createContent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { title, link } = req.body;
    const userId = req.token?.id;

    if (!title || !link ) {
        res.status(StatusCode.BadRequest).json({
            success: false,
            message: "Please provide all the required information"
        });
        return;
    }

    try {
        await Content.create({
            title,
            link,
            userId
        });

        res.status(StatusCode.Created).json({
            success: true,
            message: "Link is added successfully"
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);

            if ((error as any).code === 11000) {
                res.status(StatusCode.Conflict).json({
                    success: false,
                    message: "Content with this title already exists."
                });
                return;
            }
        } else {
            console.log("Unknown Error:", error);
        }

        res.status(StatusCode.Error).json({
            success: false,
            message: process.env.NODE_ENV === "development"
                ? error instanceof Error ?
                    error.message
                    : "Unknow error occurred"
                : "Something went wrong"
        })
    }
}

const getAllContent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.token?.id;

    try {
        const contentInDb = await Content.find({ userId });

        if (contentInDb.length === 0) {
            res.status(StatusCode.NotFound).json({
                success: true,
                message: "There is no content for this user."
            });
            return;
        }

        res.status(StatusCode.Success).json({
            success: true,
            message: "Fetched all the content successfully.",
            content: contentInDb
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

const updateContent = async (req: AuthenticatedRequest & { body: UpdateContentRequest }, res: Response): Promise<void> => {
    const { title, link, category } = req.body;
    const { id } = req.params;
    const userId = req.token?.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(StatusCode.BadRequest).json({
            success: false,
            message: "Invalid content ID format."
        });
        return;
    }

    try {
        const contentInDb: IContent | null = await Content.findById(id);

        if (!contentInDb) {
            res.status(StatusCode.NotFound).json({
                success: false,
                message: "The content not found"
            });
            return;
        }

        if (contentInDb?.userId.toString() !== userId) {
            res.status(StatusCode.Unauthorized).json({
                success: false,
                message: "You are not authorized to change this content."
            });
            return;
        }

        const updates = {
            title: title === undefined ? contentInDb.title : title,
            link: link === undefined ? contentInDb.link : link,
            category: category === undefined ? contentInDb.category : category,
        }

        const updatedContent:IContent | null = await Content.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        res.status(StatusCode.Success).json({
            success: true,
            message: "The content is updated successfully.",
            updatedContent: updatedContent
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
                    error.message
                    : "Unknown error occured."
                : "Something went wrong."
        });
    }
}

const deleteContent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.token?.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(StatusCode.BadRequest).json({
            success: false,
            message: "Invalid content ID format."
        });
        return;
    }

    try {
        const contentInDb: IContent | null = await Content.findById(id);

        if (!contentInDb) {
            res.status(StatusCode.NotFound).json({
                success: false,
                message: "The content not found"
            });
            return;
        }

        if (contentInDb.userId.toString() !== userId) {
            res.status(StatusCode.Unauthorized).json({
                success: false,
                message: "You are not authorized to delete this content."
            });
            return;
        }

        const deletedContent = await Content.findByIdAndDelete(id);

        if (!deletedContent) {
            res.status(StatusCode.Error).json({
                success: false,
                message: "Failed to delete content. Please try again."
            });
            return;
        }


        res.status(StatusCode.Success).json({
            success: true,
            message: "The content has been deleted.",
            updatedContent: deletedContent._id
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
                    error.message
                    : "Unknown error occured."
                : "Something went wrong."
        });
    }
}

export { createContent, getAllContent, updateContent, deleteContent };