import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { CustomSession } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/components/base/Navbar";
import AddDuelItems from "@/components/duel/AddDuelItems";
import ViewDuelItems from "@/components/duel/ViweDuelItems";
import { fetchDuel } from "@/fetch/duelFetch";
import { getServerSession } from "next-auth";

export default async function duelItems({params} : {params: {id: string}}) {

    const session: CustomSession | null = await getServerSession(authOptions)

    const duel: DuelTypes | null = await fetchDuel(params.id)
    return(
        <div className="container">
            <Navbar />

            <div className="mt-6 px-14">
                <h1 className="text-2xl lg:text-4xl font-extrabold">{ duel?.title }</h1>
                <p className="text-lg">{ duel?.description }</p>
            </div>

            {
                duel?.DuelItem && duel.DuelItem.length > 0 ? 
                <ViewDuelItems duel={duel}/>
                    : 
                <AddDuelItems token={session?.user?.token!} duelId={params.id!} />
            }
        </div>
    )
};