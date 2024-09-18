import Navbar from "@/components/base/Navbar";
import AddDuel from "@/components/duel/AddDuel";
import { CustomSession } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { authOptions} from "../api/auth/[...nextauth]/options";
import { fetchDuels } from "../../fetch/duelFetch";
import DuelCard from "@/components/duel/DuelCard";


export default async function dashboard () {

    const session: CustomSession | null = await getServerSession(authOptions);
    const duels:Array<DuelTypes> | [] = await fetchDuels(session?.user?.token!);
    
    return (
        <div className="container">
            <Navbar />

            <div className="p-10 text-end">
                <AddDuel user={ session?.user! } />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-14">
                {
                    duels.length > 0 && duels.map((item, index) => <DuelCard duel={item} key={index} token={session?.user?.token!} />)
                }
            </div>
        </div>
    )
}