"use client"

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function SubmitBtn() {
    const { pending } = useFormStatus();

    return (
        <Button className="w-full" disabled={pending}>
            {
                pending ? "Processing..." : "Submit"
            }
        </Button>
    )
}