"use client";

import { toast } from "sonner";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import DeleteDuel from "./DeleteDuel";
import Env from "@/lib/env";

// Dynamic loading (lazy load):
const EditDuel = dynamic(() => import("./EditDuel"));
  

export default function DuelCardMenu({duel, token}: {duel: DuelTypes, token: string}) {

    const [open, setOpen] = useState(false); // For editing
    const [deleteOpen, setDeleteOpen] = useState(false); // For deleting

    const handleCopy = () => {
        navigator.clipboard?.writeText(`${Env.APP_URL}/duel/${duel.id}`)
        toast.success("Link copied successfully")
    };

    return (

        <>
            {/* loading component and lazy load */}
            {
                open && ( 
                <Suspense fallback={<p>Loading...</p>}>
                    <EditDuel open={open} setOpen={setOpen} duel={duel} token={token}/>
                </Suspense>
            )}

            {/* Delete option */}
            {
                deleteOpen && ( 
                <Suspense fallback={<p>Loading...</p>}>
                    <DeleteDuel open={deleteOpen} setOpen={setDeleteOpen} id={duel.id} token={token}/>
                </Suspense>
            )}

            <DropdownMenu>

                <DropdownMenuTrigger>
                    <EllipsisVertical />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setOpen(true)} >Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopy} >Copy link</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleteOpen(true)} >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>

            </DropdownMenu>
        </>
    )
};