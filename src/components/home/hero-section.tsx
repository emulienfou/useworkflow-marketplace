import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="w-full px-6 py-12 md:px-10 lg:px-20 border-b">
      <div className="max-w-6xl mx-auto">
        <div className="flex min-h-[320px] flex-col gap-6 items-center justify-center text-center">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h1 className="text-foreground text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Automate anything with{" "}
              <span className="text-primary">AI Plugins</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-normal">
              The central hub for AI Workflow integrations. Connect LLMs, Vector
              DBs, and your favorite tools in seconds.
            </p>
          </div>
          <div className="w-full max-w-2xl mt-4">
            <div className="flex h-14 md:h-16 w-full items-stretch rounded-xl border overflow-hidden">
              <div className="text-muted-foreground flex bg-background items-center justify-center pl-6">
                <Search className="size-5" />
              </div>
              <input
                className="flex w-full min-w-0 flex-1 border-none bg-background text-foreground focus:ring-0 focus:outline-none h-full placeholder:text-muted-foreground px-4 text-base md:text-lg"
                placeholder="Search for Pinecone, OpenAI, Salesforce..."
              />
              <div className="flex items-center justify-center bg-background pr-2">
                <Button className="h-10 md:h-12 rounded-lg px-6 font-bold text-sm md:text-base">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
