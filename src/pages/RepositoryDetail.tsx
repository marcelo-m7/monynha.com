import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/SectionReveal";
import { ArrowLeft, Star, GitFork, Bug, CalendarDays, Code, User, Globe } from "lucide-react"; // Added Globe icon
import { useRepository } from "@/hooks/useRepository";
import { Skeleton } from "@/components/ui/skeleton";
import { GlassIcon } from "@/components/reactbits/GlassIcon";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const RepositoryDetail = () => {
  const { owner, repoName } = useParams<{ owner: string; repoName: string }>();
  const { data: repository, isLoading, error } = useRepository(owner || "", repoName || "");

  if (isLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <Skeleton className="aspect-[16/9] rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-6 w-1/2" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !repository) {
    return (
      <div className="min-h-screen overflow-x-hidden pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-4 text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">Repository Not Found</h1>
          <p className="text-muted-foreground mb-8">
            {error?.message || "The repository you're looking for doesn't exist or is private."}
          </p>
          <Link to="/repositories">
            <Button variant="outline">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Repositories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Back Button */}
        <SectionReveal>
          <Link to="/repositories">
            <Button variant="ghost" className="mb-8 group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Repositories
            </Button>
          </Link>
        </SectionReveal>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Repository Image/Preview */}
          <SectionReveal>
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-lg">
                <img
                  src={`https://opengraph.githubassets.com/1/${repository.ownerLogin}/${repository.name}`}
                  alt={`${repository.fullName} OpenGraph image`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <a href={repository.htmlUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    View on GitHub
                    <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                  </Button>
                </a>
                {repository.homepageUrl && (
                  <a href={repository.homepageUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      View Live Demo
                      <Globe className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </SectionReveal>

          {/* Details */}
          <div className="space-y-8">
            <SectionReveal delay={0.1}>
              <div>
                <h1 className="mb-4 text-[clamp(1.85rem,6vw,3.25rem)] font-bold leading-tight text-balance">
                  {repository.name}
                </h1>
                <p className="text-[clamp(1rem,3.4vw,1.15rem)] text-muted-foreground leading-relaxed">
                  {repository.description || "No description provided."}
                </p>
                {repository.topics.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {repository.topics.map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <GlassIcon
                  icon={<Star className="w-6 h-6" />}
                  title="Stars"
                  description={repository.stargazersCount.toLocaleString()}
                />
                <GlassIcon
                  icon={<GitFork className="w-6 h-6" />}
                  title="Forks"
                  description={repository.forksCount.toLocaleString()}
                />
                <GlassIcon
                  icon={<Bug className="w-6 h-6" />}
                  title="Open Issues"
                  description={repository.openIssuesCount.toLocaleString()}
                />
                {repository.language && (
                  <GlassIcon
                    icon={<Code className="w-6 h-6" />}
                    title="Language"
                    description={repository.language}
                  />
                )}
                <GlassIcon
                  icon={<CalendarDays className="w-6 h-6" />}
                  title="Last Updated"
                  description={format(new Date(repository.updatedAt), "PPP")}
                />
                <GlassIcon
                  icon={<User className="w-6 h-6" />}
                  title="Owner"
                  description={repository.ownerLogin}
                  href={repository.ownerHtmlUrl}
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetail;
