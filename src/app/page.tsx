import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import BentoAbout from "@/components/sections/BentoAbout";
import BookingSection from "@/components/sections/BookingSection";
import MusicSection from "@/components/sections/MusicSection";
import ConcertsSection from "@/components/sections/ConcertsSection";
import VipSection from "@/components/sections/VipSection";
import LyricsSection from "@/components/sections/LyricsSection";
import FanZone from "@/components/sections/FanZone";
import EpkSection from "@/components/sections/EpkSection";
import ReferencesSection from "@/components/sections/ReferencesSection";
import MmaSection from "@/components/sections/MmaSection";
import SocialSection from "@/components/sections/SocialSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BentoAbout />
      <BookingSection />
      <MusicSection />
      <ConcertsSection />
      <VipSection />
      <LyricsSection />
      <FanZone />
      <EpkSection />
      <ReferencesSection />
      <MmaSection />
      <SocialSection />
      <Footer />
    </>
  );
}
