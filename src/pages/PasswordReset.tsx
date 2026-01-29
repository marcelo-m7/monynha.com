import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Supabase automatically handles the session from the URL, no need for hash-specific logic
    // We just need to check if a user is currently logged in (meaning the token was processed)
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsSessionValid(true);
      } else {
        // If no session, it means the reset token might be invalid or expired
        toast.error(t("common.invalidOrExpiredResetLink"));
        navigate("/auth", { replace: true });
      }
    };
    checkSession();
  }, [navigate, t]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password.length < 6) {
      toast.error(t("common.passwordTooShort"));
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t("common.passwordsDoNotMatch"));
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        toast.error(`${t("common.failedToUpdatePassword")}: ${error.message}`);
        setIsLoading(false);
        return;
      }

      toast.success(t("common.passwordUpdatedSuccessfully"));
      navigate("/auth", { replace: true }); // Redirect to login after successful reset
    } catch (error) {
      const err = error as Error;
      toast.error(`${t("common.unexpectedErrorOccurred")}: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSessionValid) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-muted-foreground">{t("common.verifyingResetLink")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t("common.setPassword")}</CardTitle>
          <CardDescription>{t("common.enterNewPassword")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">{t("common.newPassword")}</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{t("common.confirmNewPassword")}</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t("common.settingPassword") : t("common.setPassword")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordReset;