import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import type { Skill } from "@/integrations/supabase/supabase.types";
import { AdminFormDialog } from "@/components/admin/AdminFormDialog";
import { useAdminForm } from "@/hooks/useAdminForm"; // Import useAdminForm
import { useTranslation } from "react-i18next";

const SkillsManager = () => {
  const { isAdmin, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const { t } = useTranslation();

  const { data: skills, isLoading: skillsLoading } = useQuery<Skill[], Error>({
    queryKey: ["admin-skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("display_order", { ascending: true })
        .order("name", { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("skills").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-skills"] });
      queryClient.invalidateQueries({ queryKey: ["skills"] }); // Invalidate public cache
      toast.success(t("adminSkills.skillDeletedSuccess"));
    },
    onError: () => {
      toast.error(t("adminSkills.failedToDeleteSkill"));
    },
  });

  if (isLoading || skillsLoading) {
    return <div className="flex min-h-screen items-center justify-center">{t("common.loading")}</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-0 to-surface-1 px-4 pt-24 pb-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("common.backToDashboard")}
            </Link>
            <h1 className="text-4xl font-bold">{t("adminSkills.manageSkills")}</h1>
          </div>
          <AdminFormDialog
            title={t("adminSkills.skill")}
            triggerLabel={t("adminSkills.addSkill")}
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onTriggerClick={() => setEditingSkill(null)}
            isEditing={!!editingSkill}
          >
            <SkillForm
              skill={editingSkill}
              onSuccess={() => {
                setIsDialogOpen(false);
                setEditingSkill(null);
              }}
            />
          </AdminFormDialog>
        </div>

        <div className="grid gap-4">
          {skills?.map((skill) => (
            <Card key={skill.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{skill.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t("adminSkills.category")}: {skill.category} • {t("adminSkills.level")}: {skill.level}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingSkill(skill);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (confirm(t("adminSkills.deleteSkillConfirm", { skillName: skill.name }))) {
                          deleteMutation.mutate(skill.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

interface SkillFormProps {
  skill: Skill | null;
  onSuccess: () => void;
}

interface SkillFormData {
  name: string;
  category: string;
  level: string;
  display_order: number;
}

const SkillForm = ({ skill, onSuccess }: SkillFormProps) => {
  const { t } = useTranslation();
  const { formData, setFormData, handleSubmit, isPending } = useAdminForm<SkillFormData, "skills">({
    tableName: "skills",
    id: skill?.id,
    initialData: {
      name: skill?.name || "",
      category: skill?.category || "",
      level: skill?.level || "Intermediate",
      display_order: skill?.display_order || 0,
    },
    transformToPayload: (data) => ({
      name: data.name,
      category: data.category,
      level: data.level,
      display_order: data.display_order,
    }),
    queryKeysToInvalidate: ["admin-skills", "skills"],
    onSuccessCallback: onSuccess,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">{t("adminSkills.skillName")}</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="category">{t("adminSkills.category")}</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="level">{t("adminSkills.level")}</Label>
        <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
          <SelectTrigger>
            <SelectValue placeholder={t("common.selectLevel")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Beginner">{t("adminSkills.beginner")}</SelectItem>
            <SelectItem value="Intermediate">{t("adminSkills.intermediate")}</SelectItem>
            <SelectItem value="Advanced">{t("adminSkills.advanced")}</SelectItem>
            <SelectItem value="Expert">{t("adminSkills.expert")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="display_order">{t("adminSkills.displayOrder")}</Label>
        <Input
          id="display_order"
          type="number"
          value={formData.display_order}
          onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? t("common.saving") : skill ? t("common.update") : t("common.create")}
      </Button>
    </form>
  );
};

export default SkillsManager;