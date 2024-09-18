"use client"

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../common/UserAvatar";
import LogoutModel from "../auth/LogoutModel";
  

export default function Navbar() {

    const [ open, setOpen ] = useState(false);

    return (
        <>
            <LogoutModel open={open} setOpen={setOpen} />
            <nav className="w-full flex justify-between items-center h-14 py-10 px-10">
                {/* logo */}
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text">
                    Duel
                </h1>

                {/* menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <UserAvatar />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setOpen(true) }>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </nav>
        </>
    )
};