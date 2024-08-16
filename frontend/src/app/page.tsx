'use client'

import HeroSection from "@/components/base/HeroSection";
import { Button } from "@/components/ui/button";

export default function Home() {

  const Alert = () => {
    alert('This is a alert notification');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <HeroSection />
    </main>
  );
}
