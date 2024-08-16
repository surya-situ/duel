import Image from "next/image";
import { Button } from "../ui/button";
import Link from 'next/link';

const HeroSection = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div>
                <Image src="/public-banner.svg" alt="banner" width={400} height={400}/>
            </div>

            <div className="text-center mt-4">
                <h1 className="text-6xl md:text-7xl lg:text-9xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text">Duel</h1>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center"> Discover the better choice, together</p>

                <Link href="/login">
                    <Button className="mt-6"> Start here </Button>
                </Link>
            </div>
        </div>
    )
};

export default HeroSection;