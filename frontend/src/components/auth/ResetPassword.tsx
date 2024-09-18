"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";
import { useFormState } from "react-dom";
import { useSearchParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPasswordAction } from "@/actions/authActions";
import { SubmitBtn } from "../common/SubmitBtn";

export default function ResetPassword () {

    const initState = {
        status: 0,
        message: "",
        errors: {}
    };

    const [state, formAction] = useFormState(resetPasswordAction, initState);
    const searchParams = useSearchParams();

    // - navigation
    const router = useRouter();

    useEffect(() => {
        if (state.status === 500) {
            toast.error(state.message);
        } else if (state.status === 422) {
            // Email specific error
            if (state.errors?.email) {
                toast.error(state.errors.email);
            } else {
                if (state.errors?.password) {
                    // password-specific error
                    toast.error(state.errors.password);
                }
            }
        } else if (state.status === 200) {
            toast.success(state.message);
            // - redirect to login page after successfully updating password
            setTimeout(() => {
                router.replace("/login")
            }, 1000)
        }
    }, [state]);


    return (
        <form action={formAction}>
            <div className="mt-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" placeholder="example@email.com" readOnly value={searchParams.get("email") ?? ""} />
                <span className="text-red-500 text-sm">{state.errors?.email}</span>
            </div>

            <div className="mt-4">
                <Label htmlFor="email">Password</Label>
                <Input id="password" type="password" name="password" placeholder="enter new password" />
                <span className="text-red-500 text-sm">{state.errors?.password}</span>
            </div>
            <div className="mt-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input id="confirmPassword" type="password" name="confirmPassword" placeholder="Enter confirm password" />
                <span className="text-red-500 text-sm">{state.errors?.confirmPassword}</span>
            </div>

            {/* - HIDDEN TOKEN INPUT TO RESET PASSWORD - */}
            <input type="hidden" name="token" value={searchParams.get("token") ?? ""}/>

            <div className="mt-4">
                <SubmitBtn />
            </div>
        </form>
    )
};