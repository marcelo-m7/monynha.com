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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import type { Exhibition } from "@/integrations/supabase/supabase.types"; // Import centralized type
import { AdminFormDialog } from "@/components/admin/AdminFormDialog"; // Import AdminFormDialog
import { useAdminForm } from "@/hooks/useAdminForm"; // Import useAdminForm
import { useTranslation } from "react-i18next";

const ExhibitionsManager = () => {
  const { isAdmin, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExhibition, setEditingExhibition] = useState<Exhibition | null>(null);
  const { t } = useTranslation();

  const { data: exhibitions, isLoading: exhibitionsLoading } = useQuery<Exhibition[], Error>({ // Specify return type
    queryKey: ["admin-exhibitions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exhibitions")
        .select("*")
        .order("year", { ascending: false })
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    enabled: isAdmin, // Only fetch if user is an admin
  });

  const deleteMutation = useMutation<void, Error, string>({ // Specify generic types
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("exhibitions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-exhibitions"] });
      queryClient.invalidateQueries({ queryKey: ["exhibitions"] }); // Invalidate public cache
      toast.success(t("adminExhibitions.exhibitionDeletedSuccess"));
    },
    onError: () => {
      toast.error(t("adminExhibitions.failedToDeleteExhibition"));
    },
  });

  if (isLoading || exhibitionsLoading) {
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
            <h1 className="text-4xl font-bold">{t("adminExhibitions.manageExhibitions")}</h1>
          </div>
          <AdminFormDialog
            title={t("adminExhibitions.exhibition")}
            triggerLabel={t("adminExhibitions.addExhibition")}
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onTriggerClick={() => setEditingExhibition(null)}
            isEditing={!!editingExhibition}
          >
            <ExhibitionForm
              exhibition={editingExhibition}
              onSuccess={() => {
                setIsDialogOpen(false);
                setEditingExhibition(null);
              }}
            />
          </AdminFormDialog>
        </div>

        <div className="grid gap-4">
          {exhibitions?.map((exhibition) => (
            <Card key={exhibition.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{exhibition.title}</CardTitle>
                    <div className="mt-2 flex gap-2 text-sm text-muted-foreground">
                      <span>{exhibition.year}</span>
                      {exhibition.location && <span>• {exhibition.location}</span>}
                      <span>• {exhibition.type}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingExhibition(exhibition);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate(exhibition.id)}
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

interface ExhibitionFormProps {
  exhibition: Exhibition | null;
  onSuccess: () => void;
}

interface ExhibitionFormData {
  title: string;
  description: string;
  location: string;
  date: string;
  year: string;
  type: string;
  display_order: number;
}

const ExhibitionForm = ({ exhibition, onSuccess }: ExhibitionFormProps) => {
  const { t } = useTranslation();
  const { formData, setFormData, handleSubmit, isPending } = useAdminForm<ExhibitionFormData, "exhibitions">({
    tableName: "exhibitions",
    id: exhibition?.id,
    initialData: {
      title: exhibition?.title || "",
      description: exhibition?.description || "",
      location: exhibition?.location || "",
      date: exhibition?.date || "",
      year: exhibition?.year?.toString() || new Date().getFullYear().toString(),
      type: exhibition?.type || "group",
      display_order: exhibition?.display_order || 0,
    },
    transformToPayload: (data) => ({
      title: data.title,
      description: data.description || null,
      location: data.location || null,
      date: data.date || null,
      year: parseInt(data.year),
      type: data.type,
      display_order: data.display_order,
    }),
    queryKeysToInvalidate: ["admin-exhibitions", "exhibitions"],
    onSuccessCallback: onSuccess,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">{t("adminExhibitions.title")}</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">{t("adminExhibitions.description")}</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">{t("adminExhibitions.location")}</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="date">{t("adminExhibitions.date")}</Label>
          <Input
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            placeholder={t("adminExhibitions.datePlaceholder")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="year">{t("adminExhibitions.year")}</Label>
          <Input
            id="year"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="type">{t("adminExhibitions.type")}</Label>
          <Input
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            placeholder={t("adminExhibitions.typePlaceholder")}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="display_order">{t("adminExhibitions.displayOrder")}</Label>
        <Input
          id="display_order"
          type="number"
          value={formData.display_order}
          onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? t("common.saving") : exhibition ? t("common.update") : t("common.create")}
      </Button>
    </form>
  );
};

export default ExhibitionsManager;