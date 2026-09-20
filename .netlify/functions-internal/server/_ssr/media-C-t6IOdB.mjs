import { t as supabase } from "./client-DoLBO0al.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-C-t6IOdB.js
/** A stored value is either a full URL (legacy/imported asset) or a storage object path. */
function isAbsolute(value) {
	return !!value && /^(https?:|data:|blob:|\/)/.test(value);
}
/**
* Resolve a list of stored image values to displayable URLs.
* Absolute values pass through; storage paths get a signed URL (buckets are private).
*/
function useMediaUrls(bucket, values) {
	const paths = values.filter((v) => !!v && !isAbsolute(v));
	const key = [...new Set(paths)].sort();
	const { data } = useQuery({
		queryKey: [
			"signed-urls",
			bucket,
			key
		],
		enabled: key.length > 0,
		staleTime: 18e5,
		queryFn: async () => {
			const { data, error } = await supabase.storage.from(bucket).createSignedUrls(key, 604800);
			if (error) throw error;
			const map = {};
			data?.forEach((d) => {
				if (d.path && d.signedUrl) map[d.path] = d.signedUrl;
				else if (d.path && bucket === "gallery") map[d.path] = supabase.storage.from(bucket).getPublicUrl(d.path).data.publicUrl;
			});
			return map;
		}
	});
	return (value) => {
		if (!value) return "";
		if (isAbsolute(value)) return value;
		return data?.[value] ?? (bucket === "gallery" ? supabase.storage.from(bucket).getPublicUrl(value).data.publicUrl : "");
	};
}
function slugify(input) {
	return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
//#endregion
export { useMediaUrls as n, slugify as t };
