import { HeroSection } from "@/components/HeroSection";
import { StatsStrip } from "@/components/StatsStrip";
import { QASection } from "@/components/QASection";
import { AISection } from "@/components/AISection";
import { PageBackground } from "@/components/PageBackground";

export default function Home() {
  return (
    <>
      <PageBackground
        desktopSrc="/images/backgrounds/home-desktop.jpg"
        mobileSrc="/images/backgrounds/home-mobile.jpg"
        alt=""
      />
      <HeroSection />
      <StatsStrip />
      <QASection />
      <AISection />
    </>
  );
}
