import { Response, Request } from "express"
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { StatusCode } from "../constants/statusCodes";
import SECRET from "..";

type SignupRequestBody = {
    name: string,
    email: string,
    password: string
}

type SigninRequestBody = {
    email: string,
    password: string
}

const signupHandler = async (req: Request<{}, {}, SignupRequestBody>, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(StatusCode.BadRequest).json({
            success: false,
            message: "Please provide all the required information."
        });
        return;
    }

    try {
        const userInDb: IUser | null = await User.findOne({ email });

        if (userInDb) {
            res.status(StatusCode.BadRequest).json({
                success: false,
                message: "Email already exist, log in"
            });
            return;
        }

        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser: IUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            sharing: false,
            sharing_token: ""
        });

        res.status(StatusCode.Created).json({
            success: true,
            message: "User registered successfully",
            user: newUser
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log("Unknown error:", error);
        }

        res.status(StatusCode.Error).json({
            success: false,
            message: process.env.NODE_ENV === "development"
                ? error instanceof Error
                    ? error.message
                    : "Unknown error occured"
                : "Something went wrong"
        });
    }
}

const signinHandler = async (req: Request<{}, {}, SigninRequestBody>, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(StatusCode.BadRequest).json({
            success: false,
            message: "Please provide all the required info"
        });
        return;
    }

    try {
        const userInDb: IUser | null = await User.findOne({ email });

        if (!userInDb) {
            res.status(StatusCode.NotFound).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, userInDb.password);

        if (!isPasswordValid) {
            res.status(StatusCode.Unauthorized).json({
                success: false,
                message: "Invalid credentials"
            });
            return;
        }

        const token = jwt.sign({ email: userInDb.email, id:userInDb._id }, SECRET, { expiresIn: "1h" });

        res.status(StatusCode.Success).json({
            success: true,
            message: "Login successfully",
            token
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log("Unknown error:", error);
        }

        res.status(StatusCode.Error).json({
            success: false,
            message: process.env.NODE_ENV === "development"
                ? error instanceof Error
                    ? error.message
                    : "Unknown error occured"
                : "Something went wrong"
        });
    }
}

export { signupHandler, signinHandler };