import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Copy, Eye, EyeOff, ImagePlus, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useMediaUrls, slugify } from "@/lib/media";

export const Route = createFileRoute("/_authenticated/admin/tours")({
  component: AdminTours,
});

type TourRow = {
  id: string;
  slug: string | null;
  name: string;
  location: string;
  region: string | null;
  activity: string | null;
  duration: string;
  difficulty: string | null;
  best_time: string | null;
  max_group_size: number | null;
  price: string;
  featured_image_url: string;
  description: string;
  itinerary: string;
  included_services: string | null;
  excluded_services: string | null;
  highlights: string[] | null;
  status: string;
};

const EMPTY = {
  name: "", slug: "", location: "", region: "", activity: "Safari", duration: "3 days",
  difficulty: "Moderate", best_time: "", max_group_size: "", price: "", featured_image_url: "",
  description: "", itinerary: "", included_services: "", excluded_services: "", highlights: "",
  status: "active",
};

function AdminTours() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<TourRow | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: tours, isLoading } = useQuery({
    queryKey: ["admin-tours"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tours").select("*").order("created_at");
      if (error) throw error;
      return (data ?? []) as TourRow[];
    },
  });

  const media = useMediaUrls("tours", [...(tours ?? []).map((t) => t.featured_image_url), form.featured_image_url]);

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setForm({
        name: editing.name, slug: editing.slug ?? "", location: editing.location, region: editing.region ?? "",
        activity: editing.activity ?? "", duration: editing.duration, difficulty: editing.difficulty ?? "",
        best_time: editing.best_time ?? "", max_group_size: editing.max_group_size?.toString() ?? "",
        price: editing.price, featured_image_url: editing.featured_image_url, description: editing.description,
        itinerary: editing.itinerary, included_services: editing.included_services ?? "",
        excluded_services: editing.excluded_services ?? "", highlights: (editing.highlights ?? []).join("\n"),
        status: editing.status,
      });
    } else {
      setForm({ ...EMPTY });
    }
  }, [open, editing]);

  const save = useMutation({
    mutationFn: async () => {
      if (!form.name.trim()) throw new Error("Name is required");
      const payload = {
        name: form.name.trim(),
        slug: (form.slug.trim() || slugify(form.name)) || null,
        location: form.location.trim() || form.region.trim() || "Rwanda",
        region: form.region.trim() || null,
        activity: form.activity.trim() || null,
        duration: form.duration.trim() || "—",
        difficulty: form.difficulty.trim() || null,
        best_time: form.best_time.trim() || null,
        max_group_size: form.max_group_size ? Number(form.max_group_size) : null,
        price: form.price.trim() || "0",
        featured_image_url: form.featured_image_url || "",
        description: form.description,
        itinerary: form.itinerary,
        included_services: form.included_services || null,
        excluded_services: form.excluded_services || null,
        highlights: form.highlights.split("\n").map((h) => h.trim()).filter(Boolean),
        status: form.status,
      };
      if (editing) {
        const { error } = await supabase.from("tours").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("tours").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing ? "Tour updated" : "Tour created");
      setOpen(false);
      setEditing(null);
      void qc.invalidateQueries({ queryKey: ["admin-tours"] });
      void qc.invalidateQueries({ queryKey: ["public-tours"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const duplicate = useMutation({
    mutationFn: async (t: TourRow) => {
      const { id, ...rest } = t;
      void id;
      const { error } = await supabase.from("tours").insert({
        ...rest,
        name: `${t.name} (copy)`,
        slug: `${t.slug ?? slugify(t.name)}-copy-${Date.now().toString(36)}`,
        status: "draft",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Tour duplicated as draft");
      void qc.invalidateQueries({ queryKey: ["admin-tours"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleStatus = useMutation({
    mutationFn: async (t: TourRow) => {
      const { error } = await supabase.from("tours").update({ status: t.status === "active" ? "draft" : "active" }).eq("id", t.id);
      if (error) throw error;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin-tours"] });
      void qc.invalidateQueries({ queryKey: ["public-tours"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tours").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Tour deleted");
      setDeleteId(null);
      void qc.invalidateQueries({ queryKey: ["admin-tours"] });
      void qc.invalidateQueries({ queryKey: ["public-tours"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function upload(file: File) {
    setUploading(true);
    try {
      const path = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${file.name.split(".").pop()}`;
      const { error } = await supabase.storage.from("tours").upload(path, file, { upsert: false });
      if (error) throw error;
      setForm((f) => ({ ...f, featured_image_url: path }));
      toast.success("Image uploaded");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Tours</h1>
          <p className="text-sm text-muted-foreground">Create, edit and publish the itineraries travellers can book.</p>
        </div>
        <Button onClick={() => { setEditing(null); setOpen(true); }} className="bg-forest text-primary-foreground hover:bg-forest-deep">
          <Plus className="mr-1.5 h-4 w-4" /> New tour
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {isLoading ? (
          [0, 1, 2].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)
        ) : (tours ?? []).length === 0 ? (
          <Card className="p-10 text-center text-muted-foreground">No tours yet — create your first itinerary.</Card>
        ) : (
          tours!.map((t) => (
            <Card key={t.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
                {media(t.featured_image_url) ? (
                  <img src={media(t.featured_image_url)} alt={t.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-muted-foreground"><ImagePlus className="h-5 w-5" /></div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-forest">{t.name}</span>
                  <Badge variant={t.status === "active" ? "default" : "secondary"}>{t.status}</Badge>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {t.region || t.location} · {t.duration} · ${Number(t.price).toLocaleString()} · /{t.slug}
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{t.description}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Button size="sm" variant="outline" onClick={() => { setEditing(t); setOpen(true); }}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => toggleStatus.mutate(t)} title="Publish / unpublish">
                  {t.status === "active" ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </Button>
                <Button size="sm" variant="outline" onClick={() => duplicate.mutate(t)}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" variant="outline" className="text-destructive" onClick={() => setDeleteId(t.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEditing(null); }}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{editing ? "Edit tour" : "New tour"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
            <Field label="Slug (URL)"><Input value={form.slug} placeholder={slugify(form.name)} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></Field>
            <Field label="Region"><Input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} /></Field>
            <Field label="Location"><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></Field>
            <Field label="Activity"><Input value={form.activity} onChange={(e) => setForm({ ...form, activity: e.target.value })} /></Field>
            <Field label="Duration"><Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} /></Field>
            <Field label="Difficulty"><Input value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} /></Field>
            <Field label="Best time"><Input value={form.best_time} onChange={(e) => setForm({ ...form, best_time: e.target.value })} /></Field>
            <Field label="Price (USD)"><Input inputMode="numeric" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></Field>
            <Field label="Max group size"><Input inputMode="numeric" value={form.max_group_size} onChange={(e) => setForm({ ...form, max_group_size: e.target.value })} /></Field>
          </div>

          <Field label="Featured image">
            <div className="flex items-center gap-3">
              <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
                {media(form.featured_image_url) ? (
                  <img src={media(form.featured_image_url)} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-muted-foreground"><ImagePlus className="h-5 w-5" /></div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) void upload(f); e.target.value = ""; }}
              />
              <Button type="button" variant="outline" disabled={uploading} onClick={() => fileRef.current?.click()}>
                {uploading ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <ImagePlus className="mr-1.5 h-4 w-4" />}
                Upload
              </Button>
              {form.featured_image_url && (
                <Button type="button" variant="ghost" onClick={() => setForm({ ...form, featured_image_url: "" })}>Clear</Button>
              )}
            </div>
          </Field>

          <Field label="Description"><Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
          <Field label="Highlights (one per line)"><Textarea rows={3} value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} /></Field>
          <Field label="Itinerary (one day per line)"><Textarea rows={5} value={form.itinerary} onChange={(e) => setForm({ ...form, itinerary: e.target.value })} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Included (one per line)"><Textarea rows={4} value={form.included_services} onChange={(e) => setForm({ ...form, included_services: e.target.value })} /></Field>
            <Field label="Not included (one per line)"><Textarea rows={4} value={form.excluded_services} onChange={(e) => setForm({ ...form, excluded_services: e.target.value })} /></Field>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => save.mutate()} disabled={save.isPending} className="bg-forest text-primary-foreground hover:bg-forest-deep">
              {save.isPending && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
              {editing ? "Save changes" : "Create tour"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this tour?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes it from the public catalogue permanently. Existing bookings keep their reference.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && remove.mutate(deleteId)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
