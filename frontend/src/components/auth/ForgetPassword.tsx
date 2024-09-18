"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";
import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgetPasswordAction } from "@/actions/authActions";
import { SubmitBtn } from "../common/SubmitBtn";

export default function ForgetPassword () {

    const initState = {
        status: 0,
        message: "",
        errors: {}
    };

    const [state, formAction] = useFormState(forgetPasswordAction, initState);

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
        }
    }, [state]);


    return (
        <form action={formAction}>
            <div className="mt-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" placeholder="example@email.com" />
                <span className="text-red-500 text-sm">{state.errors?.email}</span>
            </div>

            <div className="mt-4">
                <SubmitBtn />
            </div>
        </form>
    )
};