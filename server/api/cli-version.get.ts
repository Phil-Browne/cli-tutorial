export default defineEventHandler(async () => {
  try {
    const res = await fetch('https://api.github.com/repos/megaport/megaport-cli/tags?per_page=1', {
      headers: { 'Accept': 'application/vnd.github+json' },
    })
    if (res.ok) {
      const tags = await res.json()
      if (tags.length > 0) {
        return { version: tags[0].name }
      }
    }
  } catch {
    // fallback
  }
  return { version: 'latest' }
})
