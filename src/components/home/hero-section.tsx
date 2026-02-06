import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="relative w-full px-6 py-24 md:px-10 lg:px-20 border-b border-border overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      
      <div className="@container max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col gap-8 items-center justify-center text-center">
          <div className="flex flex-col gap-6 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-foreground pb-2">
              Best app & software plugins
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Optimize your workflows with these top software plugins. Seamlessly move and transform data between different apps with Workflow Marketplace.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" className="h-12 px-8 text-base rounded-full">
              Start Building
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full">
              View Documentation
            </Button>
          </div>

          {/*<div className="flex flex-wrap justify-center gap-8 pt-8 opacity-60">*/}
          {/*  <span className="text-muted-foreground text-sm font-mono flex items-center gap-2">*/}
          {/*    <span className="material-symbols-outlined text-base">*/}
          {/*      check_circle*/}
          {/*    </span>{" "}*/}
          {/*    500+ Plugins*/}
          {/*  </span>*/}
          {/*  <span className="text-muted-foreground text-sm font-mono flex items-center gap-2">*/}
          {/*    <span className="material-symbols-outlined text-base">bolt</span>{" "}*/}
          {/*    Instant Deploy*/}
          {/*  </span>*/}
          {/*  <span className="text-muted-foreground text-sm font-mono flex items-center gap-2">*/}
          {/*    <span className="material-symbols-outlined text-base">code</span>{" "}*/}
          {/*    Open Source*/}
          {/*  </span>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}
