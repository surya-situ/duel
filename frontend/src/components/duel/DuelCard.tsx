"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import DuelCardMenu from "./DuelCardMeu";
import Link from "next/link";

  

export default function DuelCard({duel, token}: {duel: DuelTypes, token: string}) {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>{ duel.title }</CardTitle>

                {/* Menu */}
                <DuelCardMenu duel={duel} token={token}/>
            </CardHeader>

            <CardContent className="h-[300px]">
                {
                    duel?.image && <Image src={getImageUrl(duel.image)} alt={duel.title} width={500} height={500} className="rounded-md w-full h-[220px] object-contain" />
                }
                <p>{ duel.description }</p>
                <p> 
                    <strong>
                        Expire at:
                    </strong>
                    {
                        new Date(duel.expire_at).toDateString()
                    }
                </p>
            </CardContent>

            <CardFooter>
                <Link href={`/duel/items/${duel.id}`}>
                    <Button>Items</Button>
                </Link>
            </CardFooter>
        </Card>
      
    )
}