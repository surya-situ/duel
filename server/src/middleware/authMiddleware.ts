import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = ( req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if( !authHeader ||  authHeader === undefined || authHeader === null ) {
        return res.status(401).json({
            message: "Unauthorize"
        });
    };

    // - Extracting token 
    const token = authHeader.split(" ")[1];

    // - Verify token
    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if( err ) {
            return res.status(401).json({
                message: "Unauthorize"
            }); 
        }

        // - form customTypes.d.ts
        req.user = user as AuthUser

        next();
    })
};

export default authMiddleware;