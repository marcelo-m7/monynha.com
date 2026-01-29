import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner"; // Using sonner for password reset messages
import { useTranslation } from "react-i18next";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { signIn, user, sendPasswordResetEmail, canRegister } = useAuth(); // Added canRegister
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect authenticated users to home
    }
  }, [user, navigate]);

  // Redirect /register to /auth if registration is disabled
  useEffect(() => {
    if (window.location.hash === "#/register" && !canRegister) {
      navigate("/auth", { replace: true });
      toast.info(t("common.registrationDisabled"));
    }
  }, [navigate, canRegister, t]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSignInLoading(true);
    const { error } = await signIn(email, password);
    setIsSignInLoading(false);
    
    if (!error) {
      navigate("/");
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetLoading(true);
    const { error } = await sendPasswordResetEmail(email);
    setIsResetLoading(false);

    if (!error) {
      setShowForgotPassword(false); // Hide reset form on success
      setEmail(""); // Clear email field
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t("common.welcomeBack")}</CardTitle>
          <CardDescription>{t("common.signedInSuccessfully")}</CardDescription>
        </CardHeader>
        <CardContent>
          {!showForgotPassword ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">{t("common.email")}</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder={t("common.yourEmail")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">{t("common.password")}</Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSignInLoading}>
                {isSignInLoading ? t("common.signingIn") : t("common.signIn")}
              </Button>
              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-primary hover:underline"
                >
                  {t("common.forgotPassword")}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">{t("common.email")}</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder={t("common.yourEmail")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isResetLoading}>
                {isResetLoading ? t("common.sendingLink") : t("common.sendResetLink")}
              </Button>
              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="text-primary hover:underline"
                >
                  {t("common.backToSignIn")}
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;