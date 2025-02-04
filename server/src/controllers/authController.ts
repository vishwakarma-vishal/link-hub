import { Response, Request } from "express"

const signupHandler = (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "User registered successfully"
    });
}

const signinHandler = (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Login successfully"
    });
}

export { signupHandler, signinHandler };