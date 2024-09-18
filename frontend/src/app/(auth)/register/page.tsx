import Register from "@/components/auth/Register";
import Link from "next/link";

const register = () =>{
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[550px] bg-white rounded-xl px-10 py-5 shadow-md">
                <h1 className="text-center text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text">Duel</h1>
                <div className="text-2xl font-bold mt-2">Register</div>
                <p>Hi there!</p>

                {/* - Form register to show toaster in the client side - */}
                <Register />

                <div className="mt-3">
                    Already have an account ? <strong className="font-semibold"><Link href="login">login</Link></strong> 
                </div>
            </div>
        </div>
    )
}

export default register;