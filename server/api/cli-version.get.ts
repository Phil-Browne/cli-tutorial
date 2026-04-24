const VERSION_PATTERN = /^v?\d+\.\d+\.\d+/

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    // Repo only has pre-releases, so fetch all and take the first one
    const res = await fetch('https://api.github.com/repos/megaport/megaport-cli/releases?per_page=1', {
      headers: { 'Accept': 'application/vnd.github+json' },
      signal: controller.signal,
    })
    if (res.ok) {
      const releases = await res.json()
      if (Array.isArray(releases) && releases.length > 0 && typeof releases[0].tag_name === 'string') {
        const version = releases[0].tag_name
        if (VERSION_PATTERN.test(version)) {
          return { version }
        }
      }
    }
    // Fallback to tags if no releases at all
    const tagRes = await fetch('https://api.github.com/repos/megaport/megaport-cli/tags?per_page=1', {
      headers: { 'Accept': 'application/vnd.github+json' },
      signal: controller.signal,
    })
    if (tagRes.ok) {
      const tags = await tagRes.json()
      if (Array.isArray(tags) && tags.length > 0 && typeof tags[0].name === 'string') {
        const version = tags[0].name
        if (VERSION_PATTERN.test(version)) {
          return { version }
        }
      }
    }
  } catch (err) {
    console.error('cli-version fetch failed:', err)
  } finally {
    clearTimeout(timeoutId)
  }
  return { version: 'latest' }
})
