interface AuthUser {
    id: number,
    name: string,
    email: string
};

declare namespace Express {
    export interface Request {
        // - optional because for private routes 
        user?: AuthUser
    }
}