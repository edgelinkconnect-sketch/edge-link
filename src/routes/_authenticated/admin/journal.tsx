import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FileText, Loader2, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/media";

export const Route = createFileRoute("/_authenticated/admin/journal")({ component: AdminJournal });

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author: string;
  read_time: string;
  image_url: string;
  published: boolean;
};

const emptyPost: Omit<Post, "id"> = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  category: "Rwanda Travel Tips",
  author: "EDGELINK Tours",
  read_time: "5 min",
  image_url: "",
  published: false,
};

function AdminJournal() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Post | Omit<Post, "id"> | null>(null);
  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-journal"],
    queryFn: async () => {
      const { data, error } = await supabase.from("journal_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Post[];
    },
  });

  const save = useMutation({
    mutationFn: async (post: Post | Omit<Post, "id">) => {
      const payload = { ...post, slug: slugify(post.slug || post.title) };
      const result = "id" in post
        ? await supabase.from("journal_posts").update(payload).eq("id", post.id)
        : await supabase.from("journal_posts").insert(payload);
      if (result.error) throw result.error;
    },
    onSuccess: () => {
      toast.success("Journal post saved");
      setEditing(null);
      void qc.invalidateQueries({ queryKey: ["admin-journal"] });
      void qc.invalidateQueries({ queryKey: ["public-journal"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("journal_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Journal post deleted");
      void qc.invalidateQueries({ queryKey: ["admin-journal"] });
      void qc.invalidateQueries({ queryKey: ["public-journal"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Content desk</div><h1 className="font-display text-4xl font-bold text-forest">Journal</h1><p className="mt-1 text-sm text-muted-foreground">Create stories, guides, and field notes for the public journal.</p></div>
        <Button onClick={() => setEditing({ ...emptyPost })} className="bg-forest text-cream hover:bg-forest-deep"><Plus className="mr-1.5 h-4 w-4" /> New post</Button>
      </div>

      {editing && <PostEditor post={editing} saving={save.isPending} onChange={setEditing} onCancel={() => setEditing(null)} onSave={() => void save.mutate(editing)} />}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {isLoading && <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />}
        {!isLoading && !posts?.length && <Card className="p-8 text-center text-sm text-muted-foreground md:col-span-2">No database posts yet. Create the first one above.</Card>}
        {(posts ?? []).map((post) => <Card key={post.id} className="p-5"><div className="flex items-start gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold/15 text-gold-foreground"><FileText className="h-5 w-5" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="font-display text-xl font-bold text-forest">{post.title}</h2><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${post.published ? "bg-emerald-100 text-emerald-800" : "bg-muted text-muted-foreground"}`}>{post.published ? "Published" : "Draft"}</span></div><p className="mt-1 text-xs text-muted-foreground">{post.category} · {post.author} · {post.read_time}</p><p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p></div></div><div className="mt-4 flex justify-end gap-2 border-t border-border pt-3"><Button size="sm" variant="outline" onClick={() => setEditing(post)}><Pencil className="mr-1.5 h-4 w-4" /> Edit</Button><Button size="sm" variant="outline" className="text-destructive" onClick={() => void remove.mutate(post.id)} disabled={remove.isPending}><Trash2 className="mr-1.5 h-4 w-4" /> Delete</Button></div></Card>)}
      </div>
    </div>
  );
}

function PostEditor({ post, saving, onChange, onCancel, onSave }: { post: Post | Omit<Post, "id">; saving: boolean; onChange: (post: Post | Omit<Post, "id">) => void; onCancel: () => void; onSave: () => void }) {
  const set = (key: keyof typeof emptyPost, value: string | boolean) => onChange({ ...post, [key]: value });
  return <Card className="mt-6 border-gold/40 p-5 shadow-sm"><div className="mb-5 flex items-center justify-between"><div><h2 className="font-display text-2xl font-bold text-forest">{"id" in post ? "Edit post" : "New post"}</h2><p className="text-sm text-muted-foreground">Draft the article and publish it when ready.</p></div><Button variant="ghost" onClick={onCancel}>Close</Button></div><div className="grid gap-4 md:grid-cols-2"><div className="space-y-1.5"><Label>Title</Label><Input value={post.title} onChange={(e) => set("title", e.target.value)} placeholder="A new story from Rwanda" /></div><div className="space-y-1.5"><Label>Slug</Label><Input value={post.slug} onChange={(e) => set("slug", e.target.value)} placeholder="new-story-from-rwanda" /></div><div className="space-y-1.5"><Label>Category</Label><Input value={post.category} onChange={(e) => set("category", e.target.value)} /></div><div className="space-y-1.5"><Label>Author</Label><Input value={post.author} onChange={(e) => set("author", e.target.value)} /></div><div className="space-y-1.5"><Label>Read time</Label><Input value={post.read_time} onChange={(e) => set("read_time", e.target.value)} placeholder="5 min" /></div><div className="space-y-1.5"><Label>Image URL or storage path</Label><Input value={post.image_url} onChange={(e) => set("image_url", e.target.value)} placeholder="https://..." /></div><div className="space-y-1.5 md:col-span-2"><Label>Excerpt</Label><Textarea rows={2} value={post.excerpt} onChange={(e) => set("excerpt", e.target.value)} /></div><div className="space-y-1.5 md:col-span-2"><Label>Article body</Label><Textarea rows={10} value={post.body} onChange={(e) => set("body", e.target.value)} /></div></div><label className="mt-4 flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={post.published} onChange={(e) => set("published", e.target.checked)} /> Publish this post</label><div className="mt-5 flex justify-end gap-2 border-t border-border pt-4"><Button variant="outline" onClick={onCancel}>Cancel</Button><Button onClick={onSave} disabled={saving || !post.title.trim() || !post.body.trim()} className="bg-forest text-cream hover:bg-forest-deep">{saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Save className="mr-1.5 h-4 w-4" />} Save post</Button></div></Card>;
}
