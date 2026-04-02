export default defineEventHandler(async () => {
  try {
    // Repo only has pre-releases, so fetch all and take the first one
    const res = await fetch('https://api.github.com/repos/megaport/megaport-cli/releases?per_page=1', {
      headers: { 'Accept': 'application/vnd.github+json' },
    })
    if (res.ok) {
      const releases = await res.json()
      if (releases.length > 0) {
        return { version: releases[0].tag_name }
      }
    }
    // Fallback to tags if no releases at all
    const tagRes = await fetch('https://api.github.com/repos/megaport/megaport-cli/tags?per_page=1', {
      headers: { 'Accept': 'application/vnd.github+json' },
    })
    if (tagRes.ok) {
      const tags = await tagRes.json()
      if (tags.length > 0) {
        return { version: tags[0].name }
      }
    }
  } catch {
    // fallback
  }
  return { version: 'latest' }
})
