import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Mail, Settings, ArrowRight, BookText, Briefcase, LayoutGrid } from "lucide-react"; // Added new icons
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { isAdmin, isLoading } = useAuth();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-muted-foreground">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const adminSections = [
    {
      title: t("adminDashboard.exhibitions"),
      description: t("adminDashboard.exhibitionsDescription"),
      icon: Calendar,
      href: "/admin/exhibitions",
      color: "text-blue-500",
    },
    {
      title: t("adminDashboard.experiences"),
      description: t("adminDashboard.experiencesDescription"),
      icon: Briefcase,
      href: "/admin/experiences",
      color: "text-green-500",
    },
    {
      title: t("adminDashboard.skills"),
      description: t("adminDashboard.skillsDescription"),
      icon: LayoutGrid,
      href: "/admin/skills",
      color: "text-yellow-500",
    },
    {
      title: t("adminDashboard.blogPosts"),
      description: t("adminDashboard.blogPostsDescription"),
      icon: BookText,
      href: "/admin/blog-posts",
      color: "text-red-500",
    },
    {
      title: t("adminDashboard.legalPages"),
      description: t("adminDashboard.legalPagesDescription"),
      icon: BookText,
      href: "/admin/legal-pages",
      color: "text-orange-500",
    },
    {
      title: t("adminDashboard.contactMessages"),
      description: t("adminDashboard.contactMessagesDescription"),
      icon: Mail,
      href: "/admin/messages",
      color: "text-pink-500",
    },
    {
      title: t("adminDashboard.settings"),
      description: t("adminDashboard.settingsDescription"),
      icon: Settings,
      href: "/admin/settings",
      color: "text-gray-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-0 to-surface-1 px-4 pt-24 pb-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">{t("adminDashboard.title")}</h1>
          <p className="text-muted-foreground">
            {t("adminDashboard.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminSections.map((section) => (
            <Card key={section.href} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg bg-surface-2 p-3 ${section.color}`}>
                    <section.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link to={section.href}>
                  <Button variant="outline" className="w-full group-hover:border-primary">
                    {t("common.manage")}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t("adminDashboard.backendAccess")}</CardTitle>
            <CardDescription>
              {t("adminDashboard.backendAccessDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {t("adminDashboard.backendAccessNote")}
            </p>
            <a href="https://supabase.com/dashboard/project/hkkgfebdhevcdurpcdgu" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                {t("adminDashboard.goToSupabaseDashboard")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;