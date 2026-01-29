import { Link } from "react-router-dom";
import { Link as LinkIcon, Code } from "lucide-react"; // Added Code icon
import { formatDistanceToNow } from "date-fns";
import { PixelCard } from "@/components/reactbits/PixelCard";
import { SectionReveal } from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Repository } from "@/hooks/useRepositories";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface RepositoryListProps {
  repositories: Repository[];
  isLoading: boolean;
  error: Error | null;
}

export const RepositoryList = ({ repositories, isLoading, error }: RepositoryListProps) => {
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="w-full aspect-[4/3] rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-fluid-lg text-destructive">
          {t("common.errorLoadingContent")}: {error.message}
        </p>
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-fluid-lg text-muted-foreground">
          {t("common.noRepositoriesFound")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 grid-auto-rows-fr">
      {repositories.map((repo, index) => (
        <SectionReveal key={repo.id} delay={index * 0.05}>
          <PixelCard
            imageUrl={`https://opengraph.githubassets.com/1/${repo.owner_login}/${repo.name}`} // GitHub OpenGraph image
            imageAlt={`${repo.name} repository preview`}
            title={
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                {repo.name}
              </a>
            }
            subtitle={repo.description || t("repositoryDetailPage.noDescriptionProvided")}
            footer={
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <Code className="h-4 w-4 text-primary" />
                      {repo.language}
                    </span>
                  )}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    {t("repositoriesPage.github")}
                  </a>
                </div>
                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {repo.topics.map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  {t("repositoriesPage.updated")} {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to={`/repositories/${repo.owner_login}/${repo.name}`}>
                      {t("common.viewDetails")}
                    </Link>
                  </Button>
                  <Button variant="default" size="sm" className="w-full" asChild>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="h-4 w-4" />
                      {t("common.viewOnGitHub")}
                    </a>
                  </Button>
                </div>
              </div>
            }
            className="h-full flex flex-col"
            noFocus
          />
        </SectionReveal>
      ))}
    </div>
  );
};

RepositoryList.displayName = "RepositoryList";