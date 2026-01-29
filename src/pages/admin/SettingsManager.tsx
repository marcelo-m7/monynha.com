import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import type { Setting } from "@/integrations/supabase/supabase.types"; // Import centralized type
import type { Json } from "@/integrations/supabase/types_db"; // Import Json from generated types
import { useAdminForm } from "@/hooks/useAdminForm"; // Import useAdminForm
import { useTranslation } from "react-i18next";

const SettingsManager = () => {
  const { isAdmin, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { data: settings, isLoading: settingsLoading } = useQuery<Setting[], Error>({ // Specify return type
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .order("key", { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });

  // The update logic will now be handled by the useAdminForm hook within SettingCard
  // No direct mutation here anymore.

  if (isLoading || settingsLoading) {
    return <div className="flex min-h-screen items-center justify-center">{t("common.loading")}</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-0 to-surface-1 px-4 pt-24 pb-16 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("common.backToDashboard")}
          </Link>
          <h1 className="text-4xl font-bold">{t("adminSettings.siteSettings")}</h1>
          <p className="text-muted-foreground mt-2">
            {t("adminSettings.configureGlobalSettings")}
          </p>
        </div>

        <div className="space-y-4">
          {settings?.map((setting) => (
            <SettingCard
              key={setting.id}
              setting={setting}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface SettingCardProps {
  setting: Setting;
}

interface SettingFormData {
  value: string; // Represent value as string for form input
  is_public: boolean;
}

const SettingCard = ({ setting }: SettingCardProps) => {
  const { t } = useTranslation();
  const [initialValueString] = useState(
    typeof setting.value === "string" ? setting.value : JSON.stringify(setting.value, null, 2)
  );

  const { formData, setFormData, handleSubmit, isPending } = useAdminForm<SettingFormData, "settings">({
    tableName: "settings",
    id: setting.id,
    initialData: {
      value: initialValueString,
      is_public: setting.is_public || false,
    },
    transformToPayload: (data) => {
      let parsedValue: Json = data.value;
      // Try to parse as JSON if it looks like JSON
      if (data.value.trim().startsWith("{") || data.value.trim().startsWith("[")) {
        try {
          parsedValue = JSON.parse(data.value);
        } catch (e) {
          // If parsing fails, keep it as a string and let Supabase handle it
          toast.error(t("adminSettings.invalidJsonFormat"));
        }
      }
      return {
        value: parsedValue,
        is_public: data.is_public,
      };
    },
    queryKeysToInvalidate: ["admin-settings", "settings"],
    onSuccessCallback: () => {
      // Re-initialize form data with the latest saved value to reset 'hasChanges' state
      setFormData({
        value: typeof setting.value === "string" ? setting.value : JSON.stringify(setting.value, null, 2),
        is_public: setting.is_public || false,
      });
    }
  });

  // Determine if there are changes by comparing current form data with initial data
  const hasChanges = 
    formData.value !== initialValueString || 
    formData.is_public !== (setting.is_public || false);

  const isMultiline = typeof setting.value === "object" || 
    (typeof formData.value === "string" && formData.value.length > 50);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{setting.key}</CardTitle>
            {setting.description && (
              <p className="text-sm text-muted-foreground mt-1">{setting.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor={`public-${setting.id}`} className="text-sm">{t("adminSettings.public")}</Label>
            <Switch
              id={`public-${setting.id}`}
              checked={formData.is_public}
              onCheckedChange={(checked) => setFormData({ ...formData, is_public: checked })}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {isMultiline ? (
            <Textarea
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              rows={6}
              className="font-mono text-sm"
            />
          ) : (
            <Input
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            />
          )}
          
          {hasChanges && (
            <Button type="submit" size="sm" disabled={isPending}>
              <Save className="mr-2 h-4 w-4" />
              {isPending ? t("common.saving") : t("common.saveChanges")}
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SettingsManager;