import { useEffect, useState } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { useRepositories } from "@/hooks/useRepositories";
import { RepositoryList } from "@/components/repositories/RepositoryList";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

type OwnerFilter = "all" | "marcelo-m7" | "Monynha-Softwares";

const Repositories = () => {
  const [ownerFilter, setOwnerFilter] = useState<OwnerFilter>("all");
  const { data: repositories = [], isLoading, error } = useRepositories({ owner: ownerFilter });

  useEffect(() => {
    document.title = "Repositories • Monynha Softwares";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 sm:px-6">
        {/* Header */}
        <SectionReveal>
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-[clamp(2rem,7vw,3.5rem)] font-bold leading-tight text-balance">
              Open Source <span className="bg-gradient-primary bg-clip-text text-transparent">Repositories</span>
            </h1>
            <p className="mx-auto max-w-2xl text-[clamp(1rem,3.4vw,1.15rem)] text-muted-foreground leading-relaxed text-balance">
              Repositories maintained by Monynha Softwares & Marcelo M7
            </p>
          </div>
        </SectionReveal>

        {/* Owner Filters */}
        <SectionReveal delay={0.1}>
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-fluid-xl font-semibold text-foreground">Filter by Owner</h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Button
                variant={ownerFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setOwnerFilter("all")}
                className="transition-all motion-reduce:transition-none"
              >
                All Repositories
              </Button>
              <Button
                variant={ownerFilter === "Monynha-Softwares" ? "default" : "outline"}
                size="sm"
                onClick={() => setOwnerFilter("Monynha-Softwares")}
                className="transition-all motion-reduce:transition-none"
              >
                Monynha Softwares
              </Button>
              <Button
                variant={ownerFilter === "marcelo-m7" ? "default" : "outline"}
                size="sm"
                onClick={() => setOwnerFilter("marcelo-m7")}
                className="transition-all motion-reduce:transition-none"
              >
                marcelo-m7
              </Button>
            </div>
          </div>
        </SectionReveal>

        {/* Repository List */}
        <RepositoryList repositories={repositories} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default Repositories;
