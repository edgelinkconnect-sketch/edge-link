import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ImagePlus, Loader2, Sparkles, Star, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useMediaUrls, slugify } from "@/lib/media";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: AdminGallery,
});

type Shot = {
  id: string;
  image_url: string;
  title: string;
  description: string | null;
  location: string;
  tags: string[];
  photographer: string | null;
  is_ai: boolean;
  is_featured: boolean;
};

function AdminGallery() {
  const qc = useQueryClient();
  const [selected, setSelected] = useState<string[]>([]);
  const [editing, setEditing] = useState<Shot | null>(null);
  const [confirm, setConfirm] = useState<null | "selected" | "ai">(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [filter, setFilter] = useState("All");
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: shots, isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Shot[];
    },
  });

  const media = useMediaUrls("gallery", (shots ?? []).map((s) => s.image_url));
  const locations = useMemo(() => ["All", ...new Set((shots ?? []).map((s) => s.location).filter(Boolean))], [shots]);
  const items = (shots ?? []).filter((s) => filter === "All" || s.location === filter);

  async function uploadFiles(files: FileList | File[]) {
    setUploading(true);
    let ok = 0;
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        const base = slugify(file.name.replace(/\.[^.]+$/, ""));
        const path = `${Date.now()}-${base}.${file.name.split(".").pop()}`;
        const { error } = await supabase.storage.from("gallery").upload(path, file);
        if (error) { toast.error(`${file.name}: ${error.message}`); continue; }
        const { error: insErr } = await supabase.from("gallery").insert({
          image_url: path,
          title: base.replace(/-/g, " ") || "Untitled",
          location: filter !== "All" ? filter : "Rwanda",
          is_ai: /(^|-)(ai|generated|midjourney|dalle)(-|$)/.test(base),
        });
        if (insErr) { toast.error(insErr.message); continue; }
        ok++;
      }
      if (ok) {
        toast.success(`${ok} image${ok > 1 ? "s" : ""} uploaded`);
        void qc.invalidateQueries({ queryKey: ["admin-gallery"] });
      }
    } finally {
      setUploading(false);
    }
  }

  const saveMeta = useMutation({
    mutationFn: async (s: Shot) => {
      const { error } = await supabase.from("gallery").update({
        title: s.title, description: s.description, location: s.location,
        tags: s.tags, photographer: s.photographer, is_ai: s.is_ai, is_featured: s.is_featured,
      }).eq("id", s.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Image updated");
      setEditing(null);
      void qc.invalidateQueries({ queryKey: ["admin-gallery"] });
      void qc.invalidateQueries({ queryKey: ["public-gallery"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const removeMany = useMutation({
    mutationFn: async (ids: string[]) => {
      const paths = (shots ?? []).filter((s) => ids.includes(s.id)).map((s) => s.image_url).filter((p) => !/^https?:/.test(p));
      const { error } = await supabase.from("gallery").delete().in("id", ids);
      if (error) throw error;
      if (paths.length) await supabase.storage.from("gallery").remove(paths);
    },
    onSuccess: (_d, ids) => {
      toast.success(`${ids.length} image${ids.length > 1 ? "s" : ""} removed`);
      setSelected([]);
      setConfirm(null);
      void qc.invalidateQueries({ queryKey: ["admin-gallery"] });
      void qc.invalidateQueries({ queryKey: ["public-gallery"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const aiIds = (shots ?? []).filter((s) => s.is_ai).map((s) => s.id);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Gallery</h1>
          <p className="text-sm text-muted-foreground">Upload real field photography, tag it by location, and prune AI imagery.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {aiIds.length > 0 && (
            <Button variant="outline" onClick={() => setConfirm("ai")}>
              <Sparkles className="mr-1.5 h-4 w-4" /> Remove AI images ({aiIds.length})
            </Button>
          )}
          {selected.length > 0 && (
            <Button variant="outline" className="text-destructive" onClick={() => setConfirm("selected")}>
              <Trash2 className="mr-1.5 h-4 w-4" /> Delete {selected.length}
            </Button>
          )}
          <Button disabled={uploading} onClick={() => fileRef.current?.click()} className="bg-forest text-primary-foreground hover:bg-forest-deep">
            {uploading ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Upload className="mr-1.5 h-4 w-4" />} Upload
          </Button>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => { if (e.target.files?.length) void uploadFiles(e.target.files); e.target.value = ""; }}
      />

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files?.length) void uploadFiles(e.dataTransfer.files); }}
        className={`mt-6 rounded-xl border-2 border-dashed p-6 text-center text-sm transition ${
          dragging ? "border-gold bg-gold/10" : "border-border text-muted-foreground"
        }`}
      >
        <ImagePlus className="mx-auto mb-2 h-6 w-6 text-gold" />
        Drag & drop photos here to upload{filter !== "All" ? ` and tag them "${filter}"` : ""}.
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {locations.map((l) => (
          <button
            key={l}
            onClick={() => setFilter(l)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              filter === l ? "border-forest bg-forest text-primary-foreground" : "border-border hover:border-forest/50"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? [0, 1, 2, 3].map((i) => <Skeleton key={i} className="aspect-square rounded-xl" />)
          : items.length === 0
            ? <Card className="col-span-full p-10 text-center text-muted-foreground">No images yet.</Card>
            : items.map((s) => {
                const isSel = selected.includes(s.id);
                return (
                  <div key={s.id} className={`group overflow-hidden rounded-xl border bg-card transition ${isSel ? "border-gold ring-2 ring-gold" : "border-border"}`}>
                    <button
                      onClick={() => setSelected((p) => (isSel ? p.filter((x) => x !== s.id) : [...p, s.id]))}
                      className="relative block aspect-square w-full bg-muted"
                    >
                      {media(s.image_url) ? (
                        <img src={media(s.image_url)} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
                      ) : (
                        <div className="grid h-full place-items-center text-muted-foreground"><ImagePlus className="h-6 w-6" /></div>
                      )}
                      <div className="absolute left-2 top-2 flex gap-1">
                        {s.is_ai && <Badge variant="secondary" className="text-[10px]">AI</Badge>}
                        {s.is_featured && <Badge className="bg-gold text-gold-foreground text-[10px]"><Star className="mr-0.5 h-2.5 w-2.5" />Featured</Badge>}
                      </div>
                    </button>
                    <div className="p-3">
                      <div className="truncate text-sm font-medium">{s.title}</div>
                      <div className="truncate text-xs text-muted-foreground">{s.location}</div>
                      <Button size="sm" variant="outline" className="mt-2 w-full" onClick={() => setEditing(s)}>Edit</Button>
                    </div>
                  </div>
                );
              })}
      </div>

      <Dialog open={!!editing} onOpenChange={(v) => !v && setEditing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="font-display text-xl">Edit image</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-3">
              <Row label="Title"><Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Row>
              <Row label="Location"><Input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></Row>
              <Row label="Description"><Input value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></Row>
              <Row label="Photographer"><Input value={editing.photographer ?? ""} onChange={(e) => setEditing({ ...editing, photographer: e.target.value })} /></Row>
              <Row label="Tags (comma separated)">
                <Input
                  value={editing.tags.join(", ")}
                  onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                />
              </Row>
              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={editing.is_ai} onChange={(e) => setEditing({ ...editing, is_ai: e.target.checked })} />
                  Mark as AI-generated
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={editing.is_featured} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} />
                  Featured
                </label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button
              onClick={() => editing && saveMeta.mutate(editing)}
              disabled={saveMeta.isPending}
              className="bg-forest text-primary-foreground hover:bg-forest-deep"
            >
              {saveMeta.isPending && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!confirm} onOpenChange={(v) => !v && setConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirm === "ai" ? "Remove all AI images?" : `Delete ${selected.length} image(s)?`}</AlertDialogTitle>
            <AlertDialogDescription>The files are removed from storage as well. This can't be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => removeMany.mutate(confirm === "ai" ? aiIds : selected)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
