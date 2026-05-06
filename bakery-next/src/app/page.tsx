import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import StorySection from "@/components/StorySection";
import ProcessSection from "@/components/ProcessSection";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      <Hero />
      <FeaturedProducts />
      <StorySection />
      <ProcessSection />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
