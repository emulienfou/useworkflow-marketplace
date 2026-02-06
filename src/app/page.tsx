import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { SidebarFilters } from "@/components/home/sidebar-filters";
import { IntegrationsGrid } from "@/components/home/integrations-grid";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-background">
      <Header />
      <main className="flex-1 flex flex-col z-10">
        <HeroSection />
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-10 px-6 md:px-10 py-16">
          <SidebarFilters />
          <IntegrationsGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
