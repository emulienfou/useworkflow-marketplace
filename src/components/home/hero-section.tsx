import { appConfig } from "@/config/app";

const HeroSection = () => (
  <div className="relative w-full px-6 py-24 md:px-10 lg:px-20 border-b border-border overflow-hidden bg-background">
    <div
      className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    <div
      className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

    <div className="@container max-w-6xl mx-auto relative z-10">
      <div className="flex flex-col gap-8 items-center justify-center text-center">
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground pb-2">
            { appConfig.title }
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            { appConfig.description }
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;
