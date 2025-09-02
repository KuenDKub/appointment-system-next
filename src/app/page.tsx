import { HeroSection } from "@/client/components/pages/HeroSection";
import { ServiceShowcase } from "@/client/components/pages/ServiceShowcase";
import { HowItWorks } from "@/client/components/pages/HowItWorks";
import { Testimonials } from "@/client/components/pages/Testimonials";
import { ContactSection } from "@/client/components/pages/ContactSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServiceShowcase />
      <HowItWorks />
      <Testimonials />
      <ContactSection />
    </main>
  );
}
