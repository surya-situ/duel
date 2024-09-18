import Navbar from "@/components/base/Navbar";
import { fetchDuel } from "@/fetch/duelFetch";
import Duel from "@/components/duel/Duel";

export default async function duelItems({params} : {params: {id: string}}) {

    const duel: DuelTypes | null = await fetchDuel(params.id)
    return(
        <div className="container">
            <Navbar />

            <div className="mt-6 px-14">
                <h1 className="text-2xl lg:text-4xl font-extrabold">{ duel?.title }</h1>
                <p className="text-lg">{ duel?.description }</p>
            </div>

            {
                duel && <Duel duel={duel!} />
            }
        </div>
    )
};