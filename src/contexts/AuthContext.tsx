import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { AppRole } from "@/integrations/supabase/supabase.types"; // Import centralized type
import { useTranslation } from "react-i18next";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  canRegister: boolean; // New flag to control registration
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<{ error: Error | null }>; // New function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => { // Corrected children type
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const canRegister = false; // Account creation disabled by default
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check admin status when session changes
      if (session?.user) {
        setTimeout(() => {
          checkAdminStatus(session.user.id);
        }, 0);
      } else {
        setIsAdmin(false);
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => {
          checkAdminStatus(session.user.id);
        }, 0);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin" as AppRole) // Cast to AppRole enum
        .maybeSingle();
      
      setIsAdmin(!!data);
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: t("common.errorSigningIn"),
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }
      
      toast({
        title: t("common.welcomeBack"),
        description: t("common.signedInSuccessfully"),
      });
      return { error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err };
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!canRegister) {
      const error = new Error(t("common.registrationDisabled"));
      toast({
        title: t("common.registrationDisabled"),
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });
      
      if (error) {
        toast({
          title: t("common.errorSigningUp"),
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }
      
      toast({
        title: t("common.accountCreated"),
        description: t("common.checkEmailForConfirmation"),
      });
      return { error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: t("common.signedOut"),
      description: t("common.signedOutSuccessfully"),
    });
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`, // Removed hash from redirect path
      });

      if (error) {
        toast({
          title: t("common.errorSendingResetEmail"),
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: t("common.passwordResetEmailSent"),
        description: t("common.checkInboxForInstructions"),
      });
      return { error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAdmin,
        isLoading,
        canRegister,
        signIn,
        signUp,
        signOut,
        sendPasswordResetEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};