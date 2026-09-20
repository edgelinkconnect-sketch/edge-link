import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** A stored value is either a full URL (legacy/imported asset) or a storage object path. */
export function isAbsolute(value?: string | null) {
  return !!value && /^(https?:|data:|blob:|\/)/.test(value);
}

/**
 * Resolve a list of stored image values to displayable URLs.
 * Absolute values pass through; storage paths get a signed URL (buckets are private).
 */
export function useMediaUrls(bucket: string, values: (string | null | undefined)[]) {
  const paths = values.filter((v): v is string => !!v && !isAbsolute(v));
  const key = [...new Set(paths)].sort();

  const { data } = useQuery({
    queryKey: ["signed-urls", bucket, key],
    enabled: key.length > 0,
    staleTime: 1000 * 60 * 30,
    queryFn: async () => {
      const { data, error } = await supabase.storage.from(bucket).createSignedUrls(key, 60 * 60 * 24 * 7);
      if (error) throw error;
      const map: Record<string, string> = {};
      data?.forEach((d) => {
        if (d.path && d.signedUrl) map[d.path] = d.signedUrl;
        else if (d.path && bucket === "gallery") map[d.path] = supabase.storage.from(bucket).getPublicUrl(d.path).data.publicUrl;
      });
      return map;
    },
  });

  return (value?: string | null) => {
    if (!value) return "";
    if (isAbsolute(value)) return value;
    return data?.[value] ?? (bucket === "gallery" ? supabase.storage.from(bucket).getPublicUrl(value).data.publicUrl : "");
  };
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
