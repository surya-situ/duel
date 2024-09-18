"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction } from "react";
import { signOut } from "next-auth/react";

export default function LogoutModel({ open, setOpen }: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) {

    const logOutUser = () => {
        signOut({
            callbackUrl: "/login",
            redirect: true
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="bg-white rounded-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>You are about to logout!</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will log you out.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-400 rounded-lg" onClick={logOutUser} >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
