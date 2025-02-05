import { Response, Request } from "express"
import User from "../models/User";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

type userType = { 
    name: String,
    email: String,
    password: String,
    createdAt : Date,
    _id: Types.ObjectId
}

const signupHandler = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({
            success: false,
            message: "Please provide all the required information."
        });
        return;
    }

    try {
        const userInDb = await User.findOne({ email });

        if (userInDb) {
            res.status(400).json({
                success: false,
                message: "Email already exist, log in"
            });
            return;
        }

        const newUser = await User.create({
            name: name,
            email: email,
            password: password
        });

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

const signinHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "Please provide all the required info"
        });
        return;
    }

    try {
        const userInDb = await User.findOne({ email });

        if (!userInDb) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        if (userInDb?.password !== password) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
            return;
        }

        const secret = process.env.SECRET;
        
        if(!secret) {
            throw new Error("Jwt secret is not define in env file.");
        }

        const token = jwt.sign({email}, secret)

        res.status(200).json({
            success: true,
            message: "Login successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

export { signupHandler, signinHandler };