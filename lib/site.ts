export const siteConfig = {
  name: "Arthur Oker",
  description: "Personal website and writing of Arthur Oker.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://arthuroker.com").replace(/\/$/, ""),
  email: "arthuroker@gmail.com",
}

export function absoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${siteConfig.url}${normalizedPath}`
}
