import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Archive,
  Copy,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useMediaUrls, slugify } from "@/lib/media";
import { LANGUAGES } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/admin/tours")({ component: AdminTours });

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
  gallery_image_urls: string[] | null;
  translations: Record<string, TourTranslation> | null;
  description: string;
  itinerary: string;
  included_services: string | null;
  excluded_services: string | null;
  highlights: string[] | null;
  status: string;
  created_at?: string;
};

type TourTranslation = Partial<{
  name: string;
  location: string;
  region: string;
  activity: string;
  duration: string;
  difficulty: string;
  best_time: string;
  price: string;
  description: string;
  itinerary: string;
  included_services: string;
  excluded_services: string;
  highlights: string[];
}>;

const EMPTY = {
  name: "",
  slug: "",
  location: "",
  region: "",
  activity: "Safari",
  duration: "3 days",
  difficulty: "Moderate",
  best_time: "",
  max_group_size: "",
  price: "",
  featured_image_url: "",
  description: "",
  itinerary: "",
  gallery_image_urls: [],
  translations: {},
  included_services: "",
  excluded_services: "",
  highlights: "",
  status: "active",
};
type FormState = Omit<typeof EMPTY, "gallery_image_urls" | "translations"> & {
  gallery_image_urls: string[];
  translations: Record<string, TourTranslation>;
};

function AdminTours() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<TourRow | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ ...EMPTY });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activityFilter, setActivityFilter] = useState("all");
  const [translationLanguage, setTranslationLanguage] = useState("fr");
  const fileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  const {
    data: tours,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-tours"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as TourRow[];
    },
  });
  const media = useMediaUrls("tours", [
    ...(tours ?? []).flatMap((tour) => [
      tour.featured_image_url,
      ...(tour.gallery_image_urls ?? []),
    ]),
    form.featured_image_url,
    ...form.gallery_image_urls,
  ]);
  const activities = useMemo(
    () => [...new Set((tours ?? []).map((tour) => tour.activity).filter(Boolean))] as string[],
    [tours],
  );
  const filteredTours = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return (tours ?? []).filter((tour) => {
      const matchesQuery =
        !normalized ||
        [tour.name, tour.location, tour.region, tour.activity, tour.slug].some((value) =>
          value?.toLowerCase().includes(normalized),
        );
      return (
        matchesQuery &&
        (statusFilter === "all" || tour.status === statusFilter) &&
        (activityFilter === "all" || tour.activity === activityFilter)
      );
    });
  }, [activityFilter, query, statusFilter, tours]);
  const stats = useMemo(
    () => ({
      total: tours?.length ?? 0,
      active: (tours ?? []).filter((tour) => tour.status === "active").length,
      drafts: (tours ?? []).filter((tour) => tour.status !== "active").length,
      destinations: new Set(
        (tours ?? []).map((tour) => tour.region || tour.location).filter(Boolean),
      ).size,
    }),
    [tours],
  );

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setForm({
        name: editing.name,
        slug: editing.slug ?? "",
        location: editing.location,
        region: editing.region ?? "",
        activity: editing.activity ?? "",
        duration: editing.duration,
        difficulty: editing.difficulty ?? "",
        best_time: editing.best_time ?? "",
        max_group_size: editing.max_group_size?.toString() ?? "",
        price: editing.price,
        featured_image_url: editing.featured_image_url,
        gallery_image_urls: [editing.featured_image_url, ...(editing.gallery_image_urls ?? [])]
          .filter(Boolean)
          .slice(0, 5),
        translations: editing.translations ?? {},
        description: editing.description,
        itinerary: editing.itinerary,
        included_services: editing.included_services ?? "",
        excluded_services: editing.excluded_services ?? "",
        highlights: (editing.highlights ?? []).join("\n"),
        status: editing.status,
      });
    } else setForm({ ...EMPTY });
  }, [editing, open]);

  const save = useMutation({
    mutationFn: async () => {
      if (!form.name.trim()) throw new Error("Name is required");
      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim() || slugify(form.name) || null,
        location: form.location.trim() || form.region.trim() || "Rwanda",
        region: form.region.trim() || null,
        activity: form.activity.trim() || null,
        duration: form.duration.trim() || "—",
        difficulty: form.difficulty.trim() || null,
        best_time: form.best_time.trim() || null,
        max_group_size: form.max_group_size ? Number(form.max_group_size) : null,
        price: form.price.trim() || "0",
        featured_image_url: form.gallery_image_urls[0] || form.featured_image_url || "",
        gallery_image_urls: form.gallery_image_urls.slice(0, 5),
        translations: form.translations,
        description: form.description,
        itinerary: form.itinerary,
        included_services: form.included_services || null,
        excluded_services: form.excluded_services || null,
        highlights: form.highlights
          .split("\n")
          .map((highlight) => highlight.trim())
          .filter(Boolean),
        status: form.status,
      };
      const result = editing
        ? await supabase.from("tours").update(payload).eq("id", editing.id)
        : await supabase.from("tours").insert(payload);
      if (result.error) throw result.error;
    },
    onSuccess: () => {
      toast.success(editing ? "Tour updated" : "Tour created");
      setOpen(false);
      setEditing(null);
      void qc.invalidateQueries({ queryKey: ["admin-tours"] });
      void qc.invalidateQueries({ queryKey: ["public-tours"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });
  const duplicate = useMutation({
    mutationFn: async (tour: TourRow) => {
      const { id, created_at, ...rest } = tour;
      void id;
      void created_at;
      const { error } = await supabase
        .from("tours")
        .insert({
          ...rest,
          gallery_image_urls: rest.gallery_image_urls ?? [],
          name: `${tour.name} (copy)`,
          slug: `${tour.slug ?? slugify(tour.name)}-copy-${Date.now().toString(36)}`,
          status: "draft",
        });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Tour duplicated as draft");
      void qc.invalidateQueries({ queryKey: ["admin-tours"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });
  const toggleStatus = useMutation({
    mutationFn: async (tour: TourRow) => {
      const { error } = await supabase
        .from("tours")
        .update({ status: tour.status === "active" ? "draft" : "active" })
        .eq("id", tour.id);
      if (error) throw error;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin-tours"] });
      void qc.invalidateQueries({ queryKey: ["public-tours"] });
    },
    onError: (error: Error) => toast.error(error.message),
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
    onError: (error: Error) => toast.error(error.message),
  });

  async function upload(files: FileList | File[] | File) {
    const selected = (files instanceof File ? [files] : Array.from(files)).slice(
      0,
      5 - form.gallery_image_urls.length,
    );
    if (!selected.length) return toast.error("A tour can have up to 5 images");
    setUploading(true);
    try {
      const paths: string[] = [];
      for (const [index, file] of selected.entries()) {
        const extension = file.name.split(".").pop() ?? "jpg";
        const path = `${Date.now()}-${index}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${extension}`;
        const { error } = await supabase.storage
          .from("tours")
          .upload(path, file, { upsert: false });
        if (error) throw error;
        paths.push(path);
      }
      setForm((current) => ({
        ...current,
        featured_image_url: current.gallery_image_urls[0] || paths[0] || current.featured_image_url,
        gallery_image_urls: [...current.gallery_image_urls, ...paths].slice(0, 5),
      }));
      toast.success(`${paths.length} image${paths.length === 1 ? "" : "s"} uploaded`);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setUploading(false);
    }
  }
  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  const selectedTranslation = form.translations[translationLanguage] ?? {};
  function updateTranslation(patch: TourTranslation) {
    setForm((current) => ({
      ...current,
      translations: {
        ...current.translations,
        [translationLanguage]: { ...current.translations[translationLanguage], ...patch },
      },
    }));
  }

  return (
    <div className="min-h-full pb-10">
      <header className="relative overflow-hidden rounded-2xl bg-forest-deep px-5 py-7 text-cream shadow-luxe sm:px-8 sm:py-9">
        <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border border-gold/20" />
        <div className="pointer-events-none absolute -bottom-32 right-20 h-64 w-64 rounded-full border border-gold/10" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
              <Sparkles className="h-3.5 w-3.5" /> Catalogue studio
            </div>
            <h1 className="font-display text-4xl font-normal sm:text-5xl">
              Journeys that stay with you.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-cream/65">
              Shape the itineraries, images and stories that travellers discover across Rwanda.
            </p>
          </div>
          <Button onClick={openCreate} className="bg-gold text-gold-foreground hover:brightness-95">
            <Plus className="mr-2 h-4 w-4" /> New journey
          </Button>
        </div>
      </header>
      <section className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Total journeys" value={stats.total} icon={MapPin} />
        <Metric label="Live on site" value={stats.active} icon={Eye} accent />
        <Metric label="Drafts to review" value={stats.drafts} icon={Archive} />
        <Metric label="Destinations" value={stats.destinations} icon={Sparkles} />
      </section>
      <section className="mt-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-2xl font-normal text-forest">Your catalogue</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredTours.length} of {stats.total} journeys shown
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative min-w-[16rem] flex-1 lg:flex-none">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search journeys, regions..."
                className="h-10 pl-9"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">All status</option>
              <option value="active">Live</option>
              <option value="draft">Draft</option>
            </select>
            <select
              value={activityFilter}
              onChange={(event) => setActivityFilter(event.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">All activities</option>
              {activities.map((activity) => (
                <option key={activity} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="hidden grid-cols-[minmax(18rem,2fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(7rem,0.8fr)_auto] gap-4 border-b border-border bg-muted/35 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground lg:grid">
            <span>Journey</span>
            <span>Destination</span>
            <span>Activity</span>
            <span>Price</span>
            <span className="text-right">Actions</span>
          </div>
          {isLoading ? (
            <div className="space-y-3 p-4">
              {[0, 1, 2].map((item) => (
                <Skeleton key={item} className="h-20 rounded-lg" />
              ))}
            </div>
          ) : isError ? (
            <div className="p-12 text-center">
              <p className="font-semibold text-forest">Could not load the catalogue.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Check your connection and refresh the page.
              </p>
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="p-12 text-center">
              <MapPin className="mx-auto h-7 w-7 text-gold" />
              <p className="mt-3 font-semibold text-forest">No journeys match those filters.</p>
              <Button
                variant="link"
                onClick={() => {
                  setQuery("");
                  setStatusFilter("all");
                  setActivityFilter("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            filteredTours.map((tour) => (
              <TourRowView
                key={tour.id}
                tour={tour}
                imageUrl={media(tour.featured_image_url)}
                onEdit={() => {
                  setEditing(tour);
                  setOpen(true);
                }}
                onToggle={() => toggleStatus.mutate(tour)}
                onDuplicate={() => duplicate.mutate(tour)}
                onDelete={() => setDeleteId(tour.id)}
              />
            ))
          )}
        </div>
      </section>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) setEditing(null);
        }}
      >
        <DialogContent className="max-h-[94vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl font-normal text-forest">
              {editing ? "Edit journey" : "Create a journey"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Journey name">
                  <Input
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    placeholder="Gorilla Encounter"
                  />
                </Field>
                <Field label="URL slug">
                  <Input
                    value={form.slug}
                    placeholder={slugify(form.name) || "gorilla-encounter"}
                    onChange={(event) => setForm({ ...form, slug: event.target.value })}
                  />
                </Field>
                <Field label="Region">
                  <Input
                    value={form.region}
                    onChange={(event) => setForm({ ...form, region: event.target.value })}
                    placeholder="Volcanoes"
                  />
                </Field>
                <Field label="Location">
                  <Input
                    value={form.location}
                    onChange={(event) => setForm({ ...form, location: event.target.value })}
                    placeholder="Musanze"
                  />
                </Field>
                <Field label="Activity">
                  <Input
                    value={form.activity}
                    onChange={(event) => setForm({ ...form, activity: event.target.value })}
                    placeholder="Safari"
                  />
                </Field>
                <Field label="Duration">
                  <Input
                    value={form.duration}
                    onChange={(event) => setForm({ ...form, duration: event.target.value })}
                    placeholder="3 days"
                  />
                </Field>
                <Field label="Difficulty">
                  <Input
                    value={form.difficulty}
                    onChange={(event) => setForm({ ...form, difficulty: event.target.value })}
                    placeholder="Moderate"
                  />
                </Field>
                <Field label="Best time to visit">
                  <Input
                    value={form.best_time}
                    onChange={(event) => setForm({ ...form, best_time: event.target.value })}
                    placeholder="Jun-Sep, Dec-Feb"
                  />
                </Field>
                <Field label="Price (USD)">
                  <Input
                    inputMode="numeric"
                    value={form.price}
                    onChange={(event) => setForm({ ...form, price: event.target.value })}
                    placeholder="3500"
                  />
                </Field>
                <Field label="Max group size">
                  <Input
                    inputMode="numeric"
                    value={form.max_group_size}
                    onChange={(event) => setForm({ ...form, max_group_size: event.target.value })}
                    placeholder="8"
                  />
                </Field>
              </div>
              <Field label="Description">
                <Textarea
                  rows={5}
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  placeholder="Describe the experience in a few vivid sentences."
                />
              </Field>
              <Field label="Highlights">
                <Textarea
                  rows={4}
                  value={form.highlights}
                  onChange={(event) => setForm({ ...form, highlights: event.target.value })}
                  placeholder="One highlight per line"
                />
              </Field>
              <Field label="Itinerary">
                <Textarea
                  rows={6}
                  value={form.itinerary}
                  onChange={(event) => setForm({ ...form, itinerary: event.target.value })}
                  placeholder="Day 1: ..."
                />
              </Field>
              <div className="space-y-4 rounded-xl border border-border bg-muted/20 p-4">
                <div>
                  <Label>Manual translations</Label>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Add translated tour content for each language. English uses the fields above.
                  </p>
                </div>
                <select
                  value={translationLanguage}
                  onChange={(event) => setTranslationLanguage(event.target.value)}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {LANGUAGES.filter((language) => language.code !== "en").map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.flag} {language.name}
                    </option>
                  ))}
                </select>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Translated name">
                    <Input value={selectedTranslation.name ?? ""} onChange={(event) => updateTranslation({ name: event.target.value })} />
                  </Field>
                  <Field label="Translated location">
                    <Input value={selectedTranslation.location ?? ""} onChange={(event) => updateTranslation({ location: event.target.value })} />
                  </Field>
                  <Field label="Translated activity">
                    <Input value={selectedTranslation.activity ?? ""} onChange={(event) => updateTranslation({ activity: event.target.value })} />
                  </Field>
                  <Field label="Translated region">
                    <Input value={selectedTranslation.region ?? ""} onChange={(event) => updateTranslation({ region: event.target.value })} />
                  </Field>
                  <Field label="Translated duration">
                    <Input value={selectedTranslation.duration ?? ""} onChange={(event) => updateTranslation({ duration: event.target.value })} />
                  </Field>
                  <Field label="Translated difficulty">
                    <Input value={selectedTranslation.difficulty ?? ""} onChange={(event) => updateTranslation({ difficulty: event.target.value })} />
                  </Field>
                  <Field label="Translated best time">
                    <Input value={selectedTranslation.best_time ?? ""} onChange={(event) => updateTranslation({ best_time: event.target.value })} />
                  </Field>
                  <Field label="Translated price">
                    <Input value={selectedTranslation.price ?? ""} onChange={(event) => updateTranslation({ price: event.target.value })} />
                  </Field>
                </div>
                <Field label="Translated description">
                  <Textarea rows={4} value={selectedTranslation.description ?? ""} onChange={(event) => updateTranslation({ description: event.target.value })} />
                </Field>
                <Field label="Translated itinerary">
                  <Textarea rows={4} value={selectedTranslation.itinerary ?? ""} onChange={(event) => updateTranslation({ itinerary: event.target.value })} />
                </Field>
                <Field label="Translated highlights (one per line)">
                  <Textarea rows={3} value={(selectedTranslation.highlights ?? []).join("\n")} onChange={(event) => updateTranslation({ highlights: event.target.value.split("\n").map((item) => item.trim()).filter(Boolean) })} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Translated included services">
                    <Textarea rows={3} value={selectedTranslation.included_services ?? ""} onChange={(event) => updateTranslation({ included_services: event.target.value })} />
                  </Field>
                  <Field label="Translated excluded services">
                    <Textarea rows={3} value={selectedTranslation.excluded_services ?? ""} onChange={(event) => updateTranslation({ excluded_services: event.target.value })} />
                  </Field>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <Label>Featured image</Label>
                  {form.featured_image_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setForm({ ...form, featured_image_url: "" })}
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-background">
                  {media(form.featured_image_url) ? (
                    <img
                      src={media(form.featured_image_url)}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-muted-foreground">
                      <ImagePlus className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(event) => {
                    const files = event.target.files;
                    if (files) void upload(files);
                    event.target.value = "";
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploading}
                  onClick={() => fileRef.current?.click()}
                  className="mt-3 w-full"
                >
                  {uploading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ImagePlus className="mr-2 h-4 w-4" />
                  )}{" "}
                  {form.gallery_image_urls.length >= 5 ? "5 images added" : "Add images"}
                </Button>
              </div>
              <div className="rounded-xl border border-border bg-muted/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <Label>Tour images ({form.gallery_image_urls.length}/5)</Label>
                  {form.gallery_image_urls.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setForm({ ...form, featured_image_url: "", gallery_image_urls: [] })}
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {form.gallery_image_urls.map((path, index) => (
                    <div key={path} className="group relative aspect-square overflow-hidden rounded-md bg-background">
                      <img src={media(path)} alt={`Tour image ${index + 1}`} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        className="absolute inset-x-1 bottom-1 hidden rounded bg-forest-deep/85 px-1 py-0.5 text-[10px] text-cream group-hover:block"
                        onClick={() => setForm((current) => {
                          const gallery_image_urls = current.gallery_image_urls.filter((_, itemIndex) => itemIndex !== index);
                          return { ...current, gallery_image_urls, featured_image_url: gallery_image_urls[0] ?? "" };
                        })}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <Field label="Included">
                  <Textarea
                    rows={5}
                    value={form.included_services}
                    onChange={(event) =>
                      setForm({ ...form, included_services: event.target.value })
                    }
                    placeholder="One service per line"
                  />
                </Field>
                <Field label="Not included">
                  <Textarea
                    rows={5}
                    value={form.excluded_services}
                    onChange={(event) =>
                      setForm({ ...form, excluded_services: event.target.value })
                    }
                    placeholder="One service per line"
                  />
                </Field>
              </div>
              <Field label="Publishing status">
                <select
                  value={form.status}
                  onChange={(event) => setForm({ ...form, status: event.target.value })}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="active">Live on website</option>
                  <option value="draft">Save as draft</option>
                </select>
              </Field>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => save.mutate()}
              disabled={save.isPending}
              className="bg-forest text-primary-foreground hover:bg-forest-deep"
            >
              {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editing ? "Save changes" : "Create journey"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={!!deleteId} onOpenChange={(value) => !value && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this journey?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes it from the public catalogue permanently. Existing bookings keep their
              reference.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && remove.mutate(deleteId)}>
              Delete journey
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accent?: boolean;
}) {
  return (
    <Card className="flex items-center justify-between p-4">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </div>
        <div className="mt-2 font-display text-3xl text-forest">{value}</div>
      </div>
      <div
        className={`grid h-10 w-10 place-items-center rounded-lg ${accent ? "bg-gold text-gold-foreground" : "bg-forest/10 text-forest"}`}
      >
        <Icon className="h-5 w-5" />
      </div>
    </Card>
  );
}

function TourRowView({
  tour,
  imageUrl,
  onEdit,
  onToggle,
  onDuplicate,
  onDelete,
}: {
  tour: TourRow;
  imageUrl: string;
  onEdit: () => void;
  onToggle: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group grid gap-4 border-b border-border p-4 last:border-b-0 sm:p-5 lg:grid-cols-[minmax(18rem,2fr)_minmax(8rem,1fr)_minmax(8rem,1fr)_minmax(7rem,0.8fr)_auto] lg:items-center lg:gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={tour.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full place-items-center text-muted-foreground">
              <ImagePlus className="h-5 w-5" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate font-semibold text-forest">{tour.name}</span>
            <Badge variant={tour.status === "active" ? "default" : "secondary"}>
              {tour.status === "active" ? "Live" : "Draft"}
            </Badge>
          </div>
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
            {tour.description || "No description yet."}
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> Up to {tour.max_group_size ?? "—"}
            </span>
            <span>{tour.duration}</span>
          </div>
        </div>
      </div>
      <div className="hidden text-sm lg:block">
        <span className="text-muted-foreground">{tour.region || tour.location}</span>
        <span className="mt-1 block text-xs text-muted-foreground/70">{tour.location}</span>
      </div>
      <div className="hidden text-sm text-muted-foreground lg:block">
        {tour.activity || "Uncategorised"}
      </div>
      <div className="hidden font-semibold text-forest lg:block">
        ${Number(tour.price).toLocaleString()}
      </div>
      <div className="flex items-center justify-end gap-1">
        <Button size="icon" variant="ghost" onClick={onEdit} title="Edit journey">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={onToggle}
          title={tour.status === "active" ? "Unpublish" : "Publish"}
        >
          {tour.status === "active" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
        <Button size="icon" variant="ghost" onClick={onDuplicate} title="Duplicate journey">
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="text-destructive hover:text-destructive"
          onClick={onDelete}
          title="Delete journey"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground lg:hidden">
        <span>
          {tour.region || tour.location} · {tour.activity || "Uncategorised"}
        </span>
        <span className="font-semibold text-forest">${Number(tour.price).toLocaleString()}</span>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
