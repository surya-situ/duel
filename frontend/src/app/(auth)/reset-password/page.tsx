import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ResetPassword from "@/components/auth/ResetPassword";

export default async function resetPassword () {

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
                    {/* <Link to={}></Link> */}
                    Duel
                </h1>
                <div className="text-2xl font-bold mt-4">Reset password</div>
                <p>Enter new password below</p>

                <ResetPassword />               
            </div>
        </div>
    )
}