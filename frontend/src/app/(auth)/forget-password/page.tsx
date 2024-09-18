import ForgetPassword from "@/components/auth/ForgetPassword";


export default function forgetPassword () {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[550px] bg-white rounded-xl px-10 py-5 shadow-md">
                <h1 className="text-center text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text">Duel</h1>
                <div className="text-2xl font-bold mt-4">Forget password</div>
                <p>Enter your email below</p>

                <ForgetPassword />               
            </div>
        </div>
    )
}