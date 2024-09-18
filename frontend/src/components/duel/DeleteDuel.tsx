"use client";

import { Dispatch, SetStateAction, useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";
import { DUEL_URL } from "@/lib/apiEndPoints";
import { clearCache } from "@/actions/commonActions";

export default function DeleteDuel({ open, setOpen, id, token }: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, id: string, token: string}) {

    const [loading, setLoading] = useState(false); // For loading (delete)

    const deleteDuel = async () => {
        try {
            setLoading(true);
            const {data} = await axios.delete(`${DUEL_URL}/${id}`, {
                headers: {
                    Authorization: token
                }
            })

            if(data?.message) {
                setLoading(false);
                clearCache("dashboard");
                toast.success(data?.message);
            }

        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong, please try again.")
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="bg-white rounded-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>You are about to delete duel!</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will delete the duel permanently.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-400 rounded-lg" disabled={loading} onClick={deleteDuel} >
                        {
                            loading ? "Processing..." : "Continue"
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
