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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import type { BlogPost, ContentStatus } from "@/integrations/supabase/supabase.types";
import { AdminFormDialog } from "@/components/admin/AdminFormDialog";
import { useAdminForm } from "@/hooks/useAdminForm"; // Import the new hook
import { Badge } from "@/components/ui/badge"; // Added missing import for Badge
import { useTranslation } from "react-i18next";

const BlogPostsManager = () => {
  const { isAdmin, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const { t } = useTranslation();

  const { data: blogPosts, isLoading: blogPostsLoading } = useQuery<BlogPost[], Error>({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("date", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] }); // Invalidate public cache
      toast.success(t("adminBlogPosts.blogPostDeletedSuccess"));
    },
    onError: () => {
      toast.error(t("adminBlogPosts.failedToDeleteBlogPost"));
    },
  });

  if (isLoading || blogPostsLoading) {
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
            <h1 className="text-4xl font-bold">{t("adminBlogPosts.manageBlogPosts")}</h1>
          </div>
          <AdminFormDialog
            title={t("adminBlogPosts.blogPost")}
            triggerLabel={t("adminBlogPosts.addBlogPost")}
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onTriggerClick={() => setEditingBlogPost(null)}
            isEditing={!!editingBlogPost}
          >
            <BlogPostForm
              blogPost={editingBlogPost}
              onSuccess={() => {
                setIsDialogOpen(false);
                setEditingBlogPost(null);
                queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
                queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
              }}
            />
          </AdminFormDialog>
        </div>

        <div className="grid gap-4">
          {blogPosts?.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{post.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Slug: {post.slug}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(post.date), "PPP")} • {post.author}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.tags?.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      <Badge 
                        variant={
                          post.status === "published" ? "default" :
                          post.status === "draft" ? "secondary" : "outline"
                        }
                      >
                        {t(`common.${post.status}`)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingBlogPost(post);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (confirm(t("adminBlogPosts.deleteBlogPostConfirm", { blogPostTitle: post.title }))) {
                          deleteMutation.mutate(post.id);
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

interface BlogPostFormProps {
  blogPost: BlogPost | null;
  onSuccess: () => void;
}

interface BlogPostFormData {
  title: string;
  slug: string;
  date: string;
  author: string;
  tags: string;
  excerpt: string;
  content_html: string;
  status: ContentStatus;
}

const BlogPostForm = ({ blogPost, onSuccess }: BlogPostFormProps) => {
  const { t } = useTranslation();
  const { formData, setFormData, handleSubmit, isPending } = useAdminForm<BlogPostFormData, "blog_posts">({
    tableName: "blog_posts",
    id: blogPost?.id,
    initialData: {
      title: blogPost?.title || "",
      slug: blogPost?.slug || "",
      date: blogPost?.date ? format(new Date(blogPost.date), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
      author: blogPost?.author || "",
      tags: blogPost?.tags?.join(", ") || "",
      excerpt: blogPost?.excerpt || "",
      content_html: blogPost?.content_html || "",
      status: blogPost?.status || "draft",
    },
    transformToPayload: (data) => ({
      title: data.title,
      slug: data.slug,
      date: data.date,
      author: data.author,
      tags: data.tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0),
      excerpt: data.excerpt,
      content_html: data.content_html,
      status: data.status,
    }),
    queryKeysToInvalidate: ["admin-blog-posts", "blogPosts"],
    onSuccessCallback: onSuccess,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">{t("adminBlogPosts.title")}</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="slug">{t("adminBlogPosts.slug")}</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">{t("adminBlogPosts.date")}</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="author">{t("adminBlogPosts.author")}</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="tags">{t("adminBlogPosts.tags")}</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder={t("adminBlogPosts.tagsPlaceholder")}
        />
      </div>

      <div>
        <Label htmlFor="excerpt">{t("adminBlogPosts.excerpt")}</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="content_html">{t("adminBlogPosts.contentHtml")}</Label>
        <Textarea
          id="content_html"
          value={formData.content_html}
          onChange={(e) => setFormData({ ...formData, content_html: e.target.value })}
          rows={10}
          className="font-mono"
          required
        />
      </div>

      <div>
        <Label htmlFor="status">{t("adminBlogPosts.status")}</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as ContentStatus })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">{t("common.draft")}</SelectItem>
            <SelectItem value="published">{t("common.published")}</SelectItem>
            <SelectItem value="archived">{t("common.archived")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? t("common.saving") : blogPost ? t("common.update") : t("common.create")}
      </Button>
    </form>
  );
};

export default BlogPostsManager;