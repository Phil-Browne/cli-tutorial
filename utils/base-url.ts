// Prefix a root-relative path (e.g. /images/x.svg, /api/foo) with the app's
// baseURL so hardcoded paths still resolve when the site is served under /cli.
// Full URLs and relative paths are returned untouched.
export function withBaseUrl(path: string): string {
  if (!path.startsWith('/')) return path

  const base = (useRuntimeConfig().app.baseURL || '/').replace(/\/$/, '')
  if (!base || path === base || path.startsWith(base + '/')) return path
  return base + path
}
