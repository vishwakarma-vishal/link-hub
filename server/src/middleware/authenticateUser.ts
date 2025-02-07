import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { StatusCode } from "../constants/statusCodes";
import SECRET from "..";


export interface AuthenticatedRequest extends Request {
    token?: JwtPayload
}

const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(StatusCode.BadRequest).json({
                success: false,
                message: "Token is required"
            });
            return;
        }

        const decodedToken = jwt.verify(token, SECRET) as JwtPayload;

        req.token = decodedToken;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
            res.status(StatusCode.Unauthorized).json({
                success: false,
                message: "Invalid or expired token."
            });
        } else {
            res.status(StatusCode.Error).json({
                success: false,
                message: "Something went wrong."
            });
        }
    }
}

export default authenticateUser;