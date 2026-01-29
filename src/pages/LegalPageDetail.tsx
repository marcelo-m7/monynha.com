import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/SectionReveal";
import { ArrowLeft } from "lucide-react";
import { useLegalPage } from "@/hooks/useLegalPages";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const LegalPageDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: page, isLoading, error } = useLegalPage(slug || "");
  const { t } = useTranslation();

  useEffect(() => {
    if (page) {
      document.title = `${page.title} • Monynha Softwares`;
    } else if (!isLoading) {
      document.title = `${t("common.legalPageNotFound")} • Monynha Softwares`;
    }
  }, [page, isLoading, t]);

  if (isLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <Skeleton className="h-10 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen overflow-x-hidden pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-4 text-[clamp(1.75rem,6vw,2.75rem)] font-bold leading-tight">{t("common.legalPageNotFound")}</h1>
          <p className="text-muted-foreground mb-8">
            {error?.message || t("legalPageDetailPage.legalPageNotExists")}
          </p>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t("common.backToHome")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* Back Button */}
        <SectionReveal>
          <Link to="/">
            <Button variant="ghost" className="mb-8 group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              {t("common.backToHome")}
            </Button>
          </Link>
        </SectionReveal>

        {/* Page Content */}
        <SectionReveal delay={0.1}>
          <h1 className="mb-6 text-[clamp(2rem,7vw,3.5rem)] font-bold leading-tight text-balance">
            {page.title}
          </h1>
          <div
            className={cn("prose prose-invert max-w-none mt-8")}
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </SectionReveal>
      </div>
    </div>
  );
};

export default LegalPageDetail;