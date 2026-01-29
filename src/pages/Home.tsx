import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/SectionReveal";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import LiquidEtherBackground from "@/components/reactbits/LiquidEtherBackground";
import { SplitText } from "@/components/reactbits/SplitText";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useProfile } from "@/hooks/useProfile";
import { useBrandIdentity } from "@/hooks/useBrandIdentity"; // Import new hook
import { useNarrativeBlock } from "@/hooks/useNarrativeBlocks"; // Import new hook
import { useTranslation } from "react-i18next"; // Import useTranslation
import { useRepositories } from "@/hooks/useRepositories";
import { RepositoryList } from "@/components/repositories/RepositoryList";
import { useEffect } from "react";

const Home = () => {
  const { t } = useTranslation();
  const { data: brandIdentity } = useBrandIdentity(); // Fetch brand identity
  const { data: heroDescriptionBlock } = useNarrativeBlock("home_hero_description"); // Fetch specific narrative block
  const { data: repositories = [], isLoading: repositoriesLoading, error: repositoriesError } = useRepositories();

  const { data: profile } = useProfile();

  // Use brandIdentity data, falling back to profile or hardcoded defaults
  const siteName = brandIdentity?.name || profile?.full_name || "Monynha Softwares";
  const siteTagline = brandIdentity?.tagline || profile?.headline || t("homePage.tagline");
  const heroDescription = heroDescriptionBlock?.content || profile?.bio || t("homePage.heroDescription");
  const featuredRepositories = repositories.slice(0, 3);
  const featuredRepositoriesTitle = t("homePage.featuredRepositoriesTitle");
  const [featuredTitlePrimary, ...featuredTitleRest] = featuredRepositoriesTitle.split(" ");
  const featuredTitleHighlight = featuredTitleRest.join(" ");

  useEffect(() => {
    document.title = `${siteName} | ${siteTagline}`;
  }, [siteName, siteTagline]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6">
        <LiquidEtherBackground />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="motion-reduce:scale-100 motion-reduce:transition-none"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="mb-6 motion-reduce:animate-none"
            >
              <span className="inline-flex flex-wrap items-center gap-2 rounded-full border border-border/50 bg-surface-1/50 px-3 py-1 text-[clamp(0.85rem,3.2vw,0.95rem)] text-muted-foreground backdrop-blur-md whitespace-normal">
                <Sparkles className="h-4 w-4 text-primary" />
                {siteTagline}
              </span>
            </motion.div>

            <SplitText
              as="h1"
              text={[siteName, siteTagline].join("\n")}
              className="mb-6 text-[clamp(2.25rem,8vw,3.75rem)] font-bold leading-[1.1] break-words text-balance items-center"
            />

            <p className="mx-auto mb-8 max-w-2xl text-[clamp(1rem,3.4vw,1.15rem)] text-muted-foreground leading-relaxed text-balance text-center">
              {heroDescription}
            </p>

            <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link to="/repositories" className="w-full sm:w-auto">
                <Button variant="hero" size="lg" className="group w-full">
                  {t("homePage.repositoriesButton")}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="glass" size="lg" className="w-full">
                  {t("homePage.contactUsButton")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 motion-reduce:animate-none"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-border/50 p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-primary motion-reduce:animate-none"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Repositories Preview */}
      <section className="bg-gradient-to-b from-surface-0 to-surface-1/20 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <SectionReveal>
            <div className="text-center mb-16">
              <h2 className="mb-4 text-[clamp(1.85rem,6vw,3.25rem)] font-bold leading-tight text-balance">
                {featuredTitlePrimary}{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {featuredTitleHighlight}
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-[clamp(1rem,3.4vw,1.15rem)] text-muted-foreground leading-relaxed text-balance">
                {t("homePage.featuredRepositoriesSubtitle")}
              </p>
            </div>
          </SectionReveal>

          <ErrorBoundary>
            <RepositoryList repositories={featuredRepositories} isLoading={repositoriesLoading} error={repositoriesError} />
          </ErrorBoundary>

          <SectionReveal delay={0.3}>
            <div className="mt-12 text-center">
              <Link to="/repositories">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {t("homePage.viewAllRepositories")}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;