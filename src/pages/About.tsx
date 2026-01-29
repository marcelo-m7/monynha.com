import { SectionReveal } from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Instagram, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TextType } from "@/components/reactbits/TextType";
import { StepperTimeline } from "@/components/reactbits/StepperTimeline";
import { useExhibitions } from "@/hooks/useExhibitions";
import { TimelineSkeleton } from "@/components/TimelineSkeleton";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/hooks/useProfile";
import { useExperiences } from "@/hooks/useExperiences";
import { useSkills } from "@/hooks/useSkills";
import { useSiteSetting } from "@/hooks/useSettings";
import { useBrandIdentity } from "@/hooks/useBrandIdentity";
import { useNarrativeBlock } from "@/hooks/useNarrativeBlocks";
import { useCulturalContext } from "@/hooks/useCulturalContext";
import { usePages } from "@/hooks/usePages";
import { useMissionStatements } from "@/hooks/useMissionStatements";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Ensure Skeleton is imported

// Define the expected structure for the 'about' page content JSON
interface AboutPageContent {
  bio?: string;
  profile_image?: string;
  exhibitions_title?: string;
  skills_title?: string;
  mission_title?: string;
  cultural_context_title?: string;
}

const About = () => {
  const { t } = useTranslation();
  const { data: aboutPageData, isLoading: pageLoading } = usePages("about");
  const aboutPage = aboutPageData as Page | null;
  const pageContent = (aboutPage?.content || {}) as AboutPageContent;

  const { data: exhibitions = [], isLoading: exhibitionsLoading, error: exhibitionsError } = useExhibitions();
  const { data: profile, isLoading: profileLoading, error: profileError } = useProfile();
  const { data: experiences = [], isLoading: experienceLoading, error: experienceError } = useExperiences();
  const { data: skills = [], isLoading: skillsLoading, error: skillsError } = useSkills();
  const { data: brandIdentity } = useBrandIdentity();
  const { data: aboutIntroBlock } = useNarrativeBlock("about_intro_paragraph");
  const { data: culturalContext = [], isLoading: culturalContextLoading } = useCulturalContext();
  const { data: missionStatements = [], isLoading: missionLoading } = useMissionStatements();

  const contactInfo = useSiteSetting<{ email?: string; instagram?: string; availability?: string; note?: string }>('contact_info', {});
  
  // Aggregate errors
  const error = exhibitionsError || profileError || experienceError || skillsError;

  const experienceTimeline = experiences.map((exp) => ({
    title: exp.role,
    subtitle: `${exp.organization} · ${exp.location} (${exp.start_date} - ${exp.end_date || t("common.present")})`,
    description: exp.highlights?.join(" • ") || "",
    indicator: exp.start_date.split('-')[0],
  })) || [];

  // Use page data, falling back to narrative blocks, profile, or translations
  const pageTitle = aboutPage?.title || t("aboutPage.title");
  const aboutIntroParagraph = aboutIntroBlock?.content || t("aboutPage.introParagraph");
  const founderName = profile?.full_name || brandIdentity?.name || t("aboutPage.founderDefaultName");
  const founderBio = pageContent.bio || profile?.bio || brandIdentity?.description || t("aboutPage.founderDefaultBio");
  const founderAvatarUrl = pageContent.profile_image || profile?.avatar_url || "/avatar.jpg";
  const founderInstagram = contactInfo?.instagram || "https://instagram.com/marcelo.santos.027";
  const founderEmail = contactInfo?.email || "contact@monynha.com";

  useEffect(() => {
    document.title = `${pageTitle} • Monynha Softwares`;
  }, [pageTitle]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">{t("common.errorLoadingContent")}</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  // Combined loading state for initial page render
  const isInitialLoading = profileLoading || pageLoading || experienceLoading || skillsLoading || culturalContextLoading || missionLoading;

  if (isInitialLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <SectionReveal>
            <div className="mb-14 text-center">
              <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
            </div>
          </SectionReveal>

          <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionReveal delay={0.1}>
              <div className="space-y-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-24 w-full" />
                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <Skeleton className="h-12 w-full sm:w-40" />
                  <Skeleton className="h-12 w-full sm:w-40" />
                </div>
              </SectionReveal>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <Skeleton className="aspect-square w-full rounded-2xl" />
            </SectionReveal>
          </div>

          <SectionReveal delay={0.3}>
            <div className="mx-auto max-w-3xl mb-20">
              <Skeleton className="h-10 w-1/2 mx-auto mb-8" />
              <TimelineSkeleton />
            </div>
          </SectionReveal>

          <SectionReveal delay={0.4}>
            <div className="mx-auto max-w-4xl mb-20">
              <Skeleton className="h-10 w-1/2 mx-auto mb-8" />
              <div className="flex flex-wrap justify-center gap-3">
                {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-8 w-24 rounded-full" />)}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.5}>
            <div className="mx-auto max-w-4xl mb-20">
              <Skeleton className="h-10 w-1/2 mx-auto mb-8" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 rounded-lg border border-border/70 bg-surface-2/60 animate-pulse" />)}
                </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.6}>
            <div className="mx-auto max-w-4xl mb-20">
              <Skeleton className="h-10 w-1/2 mx-auto mb-8" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {[1, 2].map(i => <Skeleton key={i} className="h-32 rounded-lg border border-border/70 bg-surface-2/60 animate-pulse" />)}
                </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <SectionReveal>
          <div className="mb-14 text-center">
            <h1 className="mb-4 text-[clamp(2rem,7vw,3.5rem)] font-bold leading-tight text-balance">
              {pageTitle.split(' ')[0]} <span className="bg-gradient-primary bg-clip-text text-transparent">{pageTitle.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-[clamp(1rem,3.4vw,1.15rem)] text-muted-foreground leading-relaxed text-balance">
              {aboutIntroParagraph}
            </p>
          </div>
        </SectionReveal>

        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Bio */}
          <SectionReveal delay={0.1}>
            <div className="space-y-6">
              <h2 className="text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">{t("aboutPage.meetFounder", { founderName })}</h2>
              <TextType
                className="text-[clamp(1rem,3.3vw,1.1rem)] leading-relaxed"
                text={founderBio}
                speed={15} {/* Adjusted speed here */}
              />
              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap">
                {founderInstagram && (
                  <a
                    href={founderInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      <Instagram className="mr-2 h-5 w-5" />
                      {t("aboutPage.followMarcelo")}
                    </Button>
                  </a>
                )}
                {founderEmail && (
                  <a href={`mailto:${founderEmail}`}>
                    <Button variant="hero" size="lg" className="w-full sm:w-auto">
                      <Mail className="mr-2 h-5 w-5" />
                      {t("aboutPage.emailMarcelo")}
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </SectionReveal>

          {/* Profile Image */}
          <SectionReveal delay={0.2}>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-gradient-mesh shadow-lg">
                <img
                  src={founderAvatarUrl}
                  alt={`${founderName}, ${t("aboutPage.founderTitle")}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
            </div>
          </SectionReveal>
        </div>

        {/* Experience Timeline */}
        {(experienceLoading || (experiences && experiences.length > 0)) && (
          <SectionReveal delay={0.3}>
            <div className="mx-auto max-w-3xl mb-20">
              <h2 className="mb-8 text-center text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">
                {pageContent.exhibitions_title || t("aboutPage.professionalExperience").split(' ')[0]}{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {pageContent.exhibitions_title ? "" : t("aboutPage.professionalExperience").split(' ').slice(1).join(' ')}
                </span>
              </h2>
              {experienceLoading ? (
                <TimelineSkeleton />
              ) : experiences.length > 0 ? (
                <StepperTimeline steps={experienceTimeline} />
              ) : (
                <p className="text-center text-fluid-lg text-muted-foreground">{t("common.noExperiencesYet")}</p>
              )}
            </div>
          </SectionReveal>
        )}

        {/* Skills Section */}
        {(skillsLoading || (skills && skills.length > 0)) && (
          <SectionReveal delay={0.4}>
            <div className="mx-auto max-w-4xl mb-20">
              <h2 className="mb-8 text-center text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">
                {pageContent.skills_title || t("aboutPage.technicalSkills").split(' ')[0]}{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {pageContent.skills_title ? "" : t("aboutPage.technicalSkills").split(' ').slice(1).join(' ')}
                </span>
              </h2>
              {skillsLoading ? (
                <div className="flex flex-wrap justify-center gap-3">
                  {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-8 w-24 rounded-full bg-surface-2 animate-pulse" />)}
                </div>
              ) : skills.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-3">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-4 py-2 text-sm font-medium rounded-full"
                    >
                      {skill.name} ({skill.level})
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-center text-fluid-lg text-muted-foreground">{t("common.noSkillsYet")}</p>
              )}
            </div>
          </SectionReveal>
        )}
        
        {/* Mission Statements Section */}
        {(missionLoading || (missionStatements && missionStatements.length > 0)) && (
          <SectionReveal delay={0.5}>
            <div className="mx-auto max-w-4xl mb-20">
              <h2 className="mb-8 text-center text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">
                {pageContent.mission_title || t("aboutPage.ourMission").split(' ')[0]}{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {pageContent.mission_title ? "" : t("aboutPage.ourMission").split(' ').slice(1).join(' ')}
                </span>
              </h2>
              {missionLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 rounded-lg border border-border/70 bg-surface-2/60 animate-pulse" />)}
                </div>
              ) : missionStatements.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {missionStatements.map((mission, index) => (
                    <div key={mission.id} className="rounded-lg border border-border/70 bg-surface-2/60 p-6 backdrop-blur-xl">
                      <p className="text-fluid-lg font-semibold text-foreground">{mission.statement}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-fluid-lg text-muted-foreground">{t("common.noMissionStatementsYet")}</p>
              )}
            </div>
          </SectionReveal>
        )}

        {/* Cultural Context Section */}
        {(culturalContextLoading || (culturalContext && culturalContext.length > 0)) && (
          <SectionReveal delay={0.6}>
            <div className="mx-auto max-w-4xl mb-20">
              <h2 className="mb-8 text-center text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">
                {pageContent.cultural_context_title || t("aboutPage.culturalContext").split(' ')[0]}{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {pageContent.cultural_context_title ? "" : t("aboutPage.culturalContext").split(' ').slice(1).join(' ')}
                </span>
              </h2>
              {culturalContextLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {[1, 2].map(i => <Skeleton key={i} className="h-32 rounded-lg border border-border/70 bg-surface-2/60 animate-pulse" />)}
                </div>
              ) : culturalContext.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {culturalContext.map((context, index) => (
                    <div key={context.id} className="rounded-lg border border-border/70 bg-surface-2/60 p-6 backdrop-blur-xl">
                      <h3 className="mb-2 text-fluid-lg font-semibold text-foreground">{context.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{context.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-fluid-lg text-muted-foreground">{t("common.noCulturalContextYet")}</p>
              )}
            </div>
          </SectionReveal>
        )}
      </div>
    </div>
  );
};

export default About;