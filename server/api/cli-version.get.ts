import { defineCachedEventHandler } from '#imports'

export default defineCachedEventHandler(async () => {
  try {
    const res = await fetch('https://api.github.com/repos/megaport/megaport-cli/releases/latest', {
      headers: { 'Accept': 'application/vnd.github+json' },
    })
    if (res.ok) {
      const data = await res.json()
      return { version: data.tag_name ?? 'latest' }
    }
  } catch {
    // fallback
  }
  return { version: 'latest' }
}, {
  maxAge: 3600, // cache for 1 hour
  swr: true,
})
