export const getImageUrl = (url: string) => {
  if (url.startsWith("data:image") || url.startsWith("http")) {
    return url;
  }

  return `${import.meta.env.BASE_URL}${url.replace(/^\/(?:public\/)?/, "")}`;
};