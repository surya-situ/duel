import { getServerSession } from "next-auth";
import Link from "next/link";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Login from "@/components/auth/Login";
import { redirect } from "next/navigation";

const login = async () =>{

    // check session for user logIn
    const session = await getServerSession(authOptions);

    // - redirect to dashboard page if the user is already loggedIn
    if(session) {
        redirect("/dashboard")
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[550px] bg-white rounded-xl px-10 py-5 shadow-md">
                <h1 className="text-center text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text">
                    {/* <Link href="/"> */}
                        Duel
                    {/* </Link> */}
                </h1>
                <div className="text-2xl font-bold mt-2">Login</div>
                <p>Welcome back</p>

                {/* - Login component to perform login action using client side */}
                <Login />

                <div className="mt-3">
                    Don't have an account ? <strong className="font-semibold"><Link href="register">Register</Link></strong> 
                </div>
            </div>
        </div>
    )
}

export default login;