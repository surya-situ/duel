import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const register = () =>{
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[550px] bg-white rounded-xl px-10 py-5 shadow-md">
                <h1 className="text-center text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text">Duel</h1>
                <div className="text-2xl font-bold mt-2">Register</div>
                <p>Hi there!</p>

                <form>
                    <div className="mt-4">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="name" name="name" placeholder="John Doe" />

                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" placeholder="Enter email address" />

                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" name="password" placeholder="Enter password" />
                       
                        <Label htmlFor="cpassword">Confirm password</Label>
                        <Input id="cpassword" type="password" name="confirm_password" placeholder="Enter confirm password" />
                    </div>

                    <div className="mt-4">
                        <Button className="w-full">Submit</Button>
                    </div>
                </form>

                <div className="mt-3">
                    Already have an account ? <strong className="font-semibold"><Link href="login">login</Link></strong> 
                </div>
            </div>
        </div>
    )
}

export default register;