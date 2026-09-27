import { Hero } from "@/components/sections/Hero";
import { FilmPeel } from "@/components/sections/FilmPeel";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { Calculator } from "@/components/sections/Calculator";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyUs } from "@/components/sections/WhyUs";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <FilmPeel />
      <Stats />
      <Services />
      <Pricing />
      <Calculator />
      <HowItWorks />
      <WhyUs />
      <Faq />
      <FinalCta />
    </>
  );
}
