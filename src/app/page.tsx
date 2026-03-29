import WhatsAppShowcase from "@/components/landing/WhatsAppShowcase";
import Products from "@/components/landing/Products";
import Stats from "@/components/landing/Stats";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function Home() {
  return (
    <main>
      <WhatsAppShowcase />
      <AnimateOnScroll>
        <Products />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Stats />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <HowItWorks />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Testimonials />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <CTA />
      </AnimateOnScroll>
    </main>
  );
}
