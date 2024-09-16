import NextAuth, { ISODateString } from "next-auth";
import { authOptions } from "./options";


export type CustomSession = {
    user?: CustomUser;
    expires: ISODateString
};

export type CustomUser = {
    id?: string | null 
    name?: string | null 
    email?: string | null 
    token?: string | null 
}


const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };

export default NextAuth(authOptions)