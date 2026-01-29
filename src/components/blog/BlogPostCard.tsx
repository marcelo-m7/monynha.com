import { Link } from "react-router-dom";
import { SectionReveal } from "@/components/SectionReveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { BlogPost } from "@/integrations/supabase/supabase.types";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface BlogPostCardProps {
  post: BlogPost;
  delay?: number;
  className?: string;
}

export const BlogPostCard = ({ post, delay = 0, className }: BlogPostCardProps) => {
  const { t } = useTranslation();
  return (
    <SectionReveal delay={delay} className={cn("h-full", className)}>
      <Link to={`/thoughts/${post.slug}`} className="block h-full">
        <Card className="group flex h-full flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader>
            <p className="mb-2 text-sm text-muted-foreground">
              {format(new Date(post.date), "PPP")} • {post.author}
            </p>
            <CardTitle className="text-fluid-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <div className="flex flex-wrap gap-2">
              {(post.tags ?? []).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
              {t("common.readMore")} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </CardFooter>
        </Card>
      </Link>
    </SectionReveal>
  );
};

BlogPostCard.displayName = "BlogPostCard";