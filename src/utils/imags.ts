export const getImageUrl = (url: string | null | undefined): string | undefined => {
  if (!url?.trim()) return undefined;

  if (
    url.startsWith("data:") ||
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//")
  ) {
    return url;
  }

  const baseUrl = import.meta.env.BASE_URL;
  if (url.startsWith(baseUrl)) return url;

  return `${baseUrl}${url.replace(/^\/?(?:public\/)?/, "")}`;
};