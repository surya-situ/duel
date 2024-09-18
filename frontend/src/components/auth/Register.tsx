"use client"

import { useEffect } from "react";
import { useFormState } from "react-dom";

import { registerAction } from "@/actions/authActions";
import { SubmitBtn } from "@/components/common/SubmitBtn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Register () {

    const initState = {
        status: 0,
        message: "",
        errors: {}
    }

    const [state, formAction] = useFormState(registerAction, initState);

    useEffect(() => {
        if (state.status === 500) {
            toast.error(state.message);
        } else if (state.status === 422) {
            // Email specific error
            if (state.errors?.email) {
                toast.error(state.errors.name);
            } else {
                // Handling other validation errors for name, password, and confirmPassword
                if (state.errors?.name) {
                    toast.error(state.errors.name);  // name-specific error
                }
                if (state.errors?.password) {
                    toast.error(state.errors.password);  // password-specific error
                }
                if (state.errors?.confirmPassword) {
                    toast.error(state.errors.confirmPassword);  // confirmPassword-specific error
                }
            }
        } else if (state.status === 200) {
            toast.success(state.message);
        }
    }, [state]);
    

    return (
        <form action={formAction}>
            <div className="mt-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="name" name="name" placeholder="John Doe" />
                <span className="text-red-500 text-sm">{state.errors?.name}</span>
            </div>

            <div className="mt-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" placeholder="Enter email address" />
                <span className="text-red-500 text-sm">{state.errors?.email}</span>
            </div>

            <div className="mt-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" placeholder="Enter password" />
                <span className="text-red-500 text-sm">{state.errors?.password}</span>
            </div>
                       
            <div className="mt-2">
                <Label htmlFor="cpassword">Confirm password</Label>
                <Input id="cpassword" type="password" name="confirmPassword" placeholder="Enter confirm password" />
                <span className="text-red-500 text-sm">{state.errors?.confirmPassword}</span>
            </div>

            <div className="mt-4">
                <SubmitBtn />
            </div>
        </form>
    )
}