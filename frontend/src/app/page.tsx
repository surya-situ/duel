'use client'

import { getServerSession } from "next-auth";

import HeroSection from "@/components/base/HeroSection";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function Home() {

  const session = await getServerSession(authOptions)

  return (
    <main>
      <HeroSection />
    </main>
  );
}
