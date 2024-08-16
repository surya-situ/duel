import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <Image src="/404.svg" width={400} height={400} alt="404" />
            <Button>
                <Link href="/">Return to Home</Link>
            </Button>
        </div>
    )
}