import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(400).json({
                success: false,
                message: "Token is required"
            });
            return;
        }

        const secret = process.env.SECRET;

        if (!secret) {
            throw new Error ("Jwt is not define in enviornment variable");
        }

        const decodedToken = jwt.verify(token, secret) as JwtPayload;

        req.body.token = decodedToken;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export default authenticateUser;