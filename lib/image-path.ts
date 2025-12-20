export function getImagePath(path: string): string {
  const basePath = typeof window !== "undefined" ? ((window as any).__NEXT_DATA__?.buildId ? "" : "") : ""

  if (path.startsWith("http")) {
    return path
  }

  return `${basePath}${path}`
}

export function getBasePath(): string {
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname
    const match = pathname.match(/^\/([^/]+)/)
    if (match && !["_next", "images", "gallery.json"].includes(match[1])) {
      return `/${match[1]}`
    }
  }
  return ""
}
