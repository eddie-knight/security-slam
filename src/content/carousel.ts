const imageModules = import.meta.glob("../public/slam-photos/*", {
  eager: true,
  import: "default"
});

function getUrl(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "default" in value) return String((value as { default: string }).default);
  return null;
}

const entries = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, mod]) => getUrl(mod))
  .filter((url): url is string => url != null);

export const carouselImages: string[] = entries;