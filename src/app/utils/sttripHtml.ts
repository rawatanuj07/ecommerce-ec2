export function stripHtml(html: string): string {
  if (typeof window !== "undefined") {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html").body.textContent || "";
  }
  return html.replace(/<[^>]*>/g, "").trim(); // Fallback for server-side rendering
}
