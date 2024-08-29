"use client"

import { useFormState } from "react-dom";

import { registerAction } from "@/actions/authActions";
import { SubmitBtn } from "@/components/common/SubmitBtn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register () {

    const initState = {
        status: 0,
        message: "",
        errors: {}
    }

    const [state, formAction] = useFormState(registerAction, initState)
    return (
        <form action={formAction}>
            <div className="mt-4">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="name" name="name" placeholder="John Doe" />
                        <span className="text-red-500">{}</span>

                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" placeholder="Enter email address" />

                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" name="password" placeholder="Enter password" />
                       
                        <Label htmlFor="cpassword">Confirm password</Label>
                        <Input id="cpassword" type="password" name="confirm_password" placeholder="Enter confirm password" />
            </div>

            <div className="mt-4">
                <SubmitBtn />
            </div>
        </form>
    )
}