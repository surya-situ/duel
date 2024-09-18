"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useFormState } from "react-dom";
import { signIn } from "next-auth/react"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/actions/authActions";
import { SubmitBtn } from "../common/SubmitBtn";

export default function Login () {

    const initState = {
        status: 0,
        message: "",
        errors: {},
        data: {}
    };

    const [state, formAction] = useFormState(loginAction, initState);

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
            signIn("credentials", {
                email: state.data?.email,
                password: state.data?.password,
                redirect: true,
                callbackUrl: "/dashboard"
            });
        }
    }, [state]);


    return (
        <form action={formAction}>
            <div className="mt-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" placeholder="Enter email address" />
                <span className="text-red-500 text-sm">{state.errors?.email}</span>
            </div>

            <div className="mt-4">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" placeholder="Enter password" />
                <span className="text-red-500 text-sm">{state.errors?.password}</span>
            </div>

            <div className="text-right font-semibold mt-3">
                <Link href="forget-password">Forgot password ?</Link>
            </div>

            <div className="mt-4">
                <SubmitBtn />
            </div>
        </form>
    )
};