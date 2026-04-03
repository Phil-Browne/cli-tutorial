<template>
  <div class="demo-terminal-wrapper">
      <!-- Auth form -->
      <div v-if="!authed" class="auth-panel">
        <div class="auth-header">
          <span class="lock-icon" aria-hidden="true">🔒</span>
          <h3 class="auth-title">Connect to Megaport API</h3>
        </div>
        <p class="auth-subtitle">
          Enter your API credentials to start the live CLI session. Credentials are saved for this browser tab and cleared when you close it.
        </p>

        <form class="auth-form" @submit.prevent="connect">
          <div class="field-group">
            <label class="field-label" for="demo-access-key">Access Key</label>
            <input
              id="demo-access-key"
              v-model="accessKey"
              type="password"
              class="field-input"
              placeholder="Your Megaport access key"
              autocomplete="off"
              required
            />
          </div>

          <div class="field-group">
            <label class="field-label" for="demo-secret-key">Secret Key</label>
            <input
              id="demo-secret-key"
              v-model="secretKey"
              type="password"
              class="field-input"
              placeholder="Your Megaport secret key"
              autocomplete="off"
              required
            />
          </div>

          <div class="field-group">
            <label class="field-label" for="demo-environment">Environment</label>
            <select id="demo-environment" v-model="environment" class="field-select">
              <option value="staging">Staging (recommended for demos)</option>
              <option value="production">Production</option>
            </select>
          </div>

          <div v-if="error" class="auth-error">
            {{ error }}
          </div>

          <button type="submit" class="connect-btn" :disabled="connecting">
            <span v-if="connecting">Connecting…</span>
            <span v-else>Connect →</span>
          </button>
        </form>

        <p class="security-note">
          🔐 Credentials are stored in sessionStorage for this tab only and cleared when you close it.
          Get your keys at <a href="https://portal.megaport.com" target="_blank" class="portal-link">portal.megaport.com</a> → My Account → API & Credentials.
        </p>
      </div>

      <!-- Status bar + terminal (shown after auth) -->
      <div v-show="authed" class="terminal-panel">
        <div class="status-bar">
          <div class="status-left">
            <span class="status-dot"></span>
            <span class="status-text">Connected</span>
            <span class="env-badge" :class="environment === 'production' ? 'env-prod' : 'env-staging'">
              {{ environment }}
            </span>
          </div>
          <button class="disconnect-btn" @click="disconnect">Disconnect</button>
        </div>
        <!-- Loading skeleton shown while terminal initialises -->
        <div v-if="authed && !terminalReady" class="terminal-skeleton" :style="terminalAreaStyle">
          <div class="skeleton skeleton-line w-1/3" />
          <div class="skeleton skeleton-line w-1/2" />
          <div class="skeleton skeleton-line w-2/5" />
          <div class="skeleton skeleton-line w-3/5" />
          <div class="skeleton skeleton-line w-1/4" />
        </div>
        <div v-show="terminalReady" class="terminal-area" :style="terminalAreaStyle">
          <ClientOnly>
            <MegaportTerminal ref="termRef" />
          </ClientOnly>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'

const SESSION_KEY = 'megaport_demo_session'

const accessKey = ref('')
const secretKey = ref('')
const environment = ref('staging')
const authed = ref(false)
const connecting = ref(false)
const error = ref('')

const termRef = ref<{ setAuth: (a: string, s: string, e: string) => void; isReady: boolean } | null>(null)
const terminalReady = ref(false)
const { track } = useAnalytics()

// ── Mobile keyboard fix ──────────────────────────────────────────────────
// The Visual Viewport API gives the height of the visible area above the
// virtual keyboard. We bind this to the terminal height so xterm shrinks
// when the keyboard opens instead of being hidden behind it.
const DESKTOP_HEIGHT = 600
const terminalAreaStyle = ref<{ height: string }>({ height: `${DESKTOP_HEIGHT}px` })
let vvResizeHandler: (() => void) | null = null

function isMobile() {
  return typeof window !== 'undefined' && window.innerWidth < 768
}

function updateTerminalHeight() {
  const vv = window.visualViewport
  if (!vv || !isMobile()) {
    terminalAreaStyle.value = { height: `${DESKTOP_HEIGHT}px` }
    return
  }
  // 48px for status bar + 4px breathing room
  const available = Math.max(200, Math.floor(vv.height - 52))
  terminalAreaStyle.value = { height: `${available}px` }
}

onMounted(() => {
  if (window.visualViewport) {
    vvResizeHandler = updateTerminalHeight
    window.visualViewport.addEventListener('resize', vvResizeHandler)
  }
  window.addEventListener('resize', updateTerminalHeight)

  // Restore saved session — pre-fill credentials from sessionStorage
  try {
    const saved = sessionStorage.getItem(SESSION_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      accessKey.value = parsed.accessKey ?? ''
      secretKey.value = parsed.secretKey ?? ''
      environment.value = parsed.environment ?? 'staging'
    }
  } catch {
    sessionStorage.removeItem(SESSION_KEY)
  }
})

// Auto-connect when WASM becomes ready and we have saved credentials
watch(() => termRef.value?.isReady, (ready) => {
  if (ready && accessKey.value && secretKey.value && !authed.value) {
    connect()
  }
})

onBeforeUnmount(() => {
  if (vvResizeHandler) {
    window.visualViewport?.removeEventListener('resize', vvResizeHandler)
  }
  window.removeEventListener('resize', updateTerminalHeight)
})

async function connect() {
  if (!accessKey.value || !secretKey.value) return
  error.value = ''
  connecting.value = true
  terminalReady.value = false

  try {
    authed.value = true
    track('Demo Terminal Open', { environment: environment.value })
    // Persist credentials for the tab session (cleared on tab close)
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
      accessKey: accessKey.value,
      secretKey: secretKey.value,
      environment: environment.value,
    }))
    await nextTick()
    // Small delay to let the terminal finish mounting
    await new Promise(resolve => setTimeout(resolve, 200))
    termRef.value?.setAuth(accessKey.value, secretKey.value, environment.value)
    // Show terminal after WASM initialises
    setTimeout(() => { terminalReady.value = true }, 1500)
  } catch (e) {
    authed.value = false
    error.value = e instanceof Error ? e.message : 'Connection failed'
  } finally {
    connecting.value = false
  }
}

function disconnect() {
  sessionStorage.removeItem(SESSION_KEY)
  authed.value = false
  terminalReady.value = false
  accessKey.value = ''
  secretKey.value = ''
  error.value = ''
}
</script>

<style scoped>
.demo-terminal-wrapper {
  width: 100%;
  border: 1px solid #6B2D8B;
  border-radius: 12px;
  overflow: hidden;
  background: #030712;
}

/* Auth panel */
.auth-panel {
  padding: 2rem;
}

.auth-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.lock-icon {
  font-size: 1.5rem;
}

.auth-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #e2e8f0;
  margin: 0;
}

.auth-subtitle {
  color: #94a3b8;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 480px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.field-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #cbd5e1;
}

.field-input,
.field-select {
  background: #111827;
  border: 1px solid #374151;
  border-radius: 6px;
  color: #e2e8f0;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  width: 100%;
  outline: none;
  transition: border-color 0.15s;
}

.field-input:focus,
.field-select:focus {
  border-color: #6B2D8B;
}

.field-select option {
  background: #111827;
}

.auth-error {
  color: #f87171;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 6px;
}

.connect-btn {
  background: #6B2D8B;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.625rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.15s;
}

.connect-btn:hover:not(:disabled) {
  background: #7d35a3;
}

.connect-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.security-note {
  margin-top: 1.25rem;
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.5;
}

.portal-link {
  color: #9B5DBB;
  text-decoration: underline;
}

/* Status bar */
.terminal-panel {
  display: flex;
  flex-direction: column;
}

.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: #0f172a;
  border-bottom: 1px solid #1e293b;
}

.status-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
}

.status-text {
  font-size: 0.8125rem;
  color: #94a3b8;
}

.env-badge {
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.env-staging {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.env-prod {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.disconnect-btn {
  background: transparent;
  border: 1px solid #374151;
  color: #94a3b8;
  border-radius: 4px;
  padding: 0.25rem 0.625rem;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.disconnect-btn:hover {
  border-color: #6B2D8B;
  color: #e2e8f0;
}

.terminal-skeleton {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skeleton-line {
  height: 14px;
}

.terminal-area {
  /* Height is set dynamically via :style to support mobile virtual keyboard */
  height: 480px;
  transition: height 0.15s ease;
}
</style>
