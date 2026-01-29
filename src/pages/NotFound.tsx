import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    document.title = `404 ${t("common.pageNotFound")} • Monynha Softwares`;
  }, [location.pathname, t]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="space-y-4 text-center text-foreground">
        <h1 className="text-4xl font-bold text-primary">404</h1>
        <p className="text-lg text-muted-foreground text-balance">
          {t("common.pageNotFoundDescription")}
        </p>
        <Button asChild>
          <Link to="/">{t("common.returnToHome")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;