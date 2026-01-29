import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Mail, Check } from "lucide-react";
import { format } from "date-fns";
import type { ContactMessage } from "@/integrations/supabase/supabase.types"; // Import centralized type
import { useTranslation } from "react-i18next";

const MessagesManager = () => {
  const { isAdmin, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { data: messages, isLoading: messagesLoading } = useQuery<ContactMessage[], Error>({ // Specify return type
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const markReadMutation = useMutation<void, Error, string>({ // Specify generic types
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_messages")
        .update({ status: "read" })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      toast.success(t("adminMessages.messageMarkedRead"));
    },
  });

  if (isLoading || messagesLoading) {
    return <div className="flex min-h-screen items-center justify-center">{t("common.loading")}</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const unreadCount = messages?.filter((m) => m.status === "unread").length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-0 to-surface-1 px-4 pt-24 pb-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("common.backToDashboard")}
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">{t("adminMessages.contactMessages")}</h1>
            {unreadCount > 0 && (
              <Badge variant="default">{unreadCount} {t("adminMessages.unread")}</Badge>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {messages?.map((message) => (
            <Card key={message.id} className={message.status === "unread" ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                      {message.status === "unread" && (
                        <Badge variant="default" className="text-xs">{t("common.new")}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{message.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(message.created_at), "PPpp")}
                    </p>
                  </div>
                  {message.status === "unread" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markReadMutation.mutate(message.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      {t("common.markRead")}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm">{message.message}</p>
              </CardContent>
            </Card>
          ))}

          {messages?.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                {t("common.noMessagesYet")}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesManager;