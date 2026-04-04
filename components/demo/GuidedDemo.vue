<template>
  <div class="guided-demo">
    <div class="demo-header">
      <h3 class="demo-title">{{ script.title }}</h3>
      <div class="demo-meta">
        <span class="meta-item">🕐 {{ script.duration }}</span>
        <span class="meta-item audience-badge">{{ script.audience }}</span>
      </div>
      <p v-if="script.opening" class="demo-opening">"{{ script.opening }}"</p>
    </div>

    <div class="steps-list">
      <div
        v-for="(step, index) in script.steps"
        :key="index"
        class="step-item"
      >
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-content">
          <div class="step-header">
            <span class="step-title">{{ step.title }}</span>
          </div>
          <p v-if="step.description" class="step-description">{{ step.description }}</p>

          <div class="command-block">
            <code class="command-text">{{ step.command }}</code>
            <button class="copy-btn" @click="copy(step.command, index)" :class="{ copied: copiedIndex === index }">
              <span v-if="copiedIndex === index">✓ Copied</span>
              <span v-else>Copy</span>
            </button>
          </div>

          <div v-if="step.talkingPoint" class="talking-point">
            <span class="tp-label">💬 Talking point</span>
            <span class="tp-text">{{ step.talkingPoint }}</span>
          </div>

          <div v-if="step.note" class="step-note">
            {{ step.note }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Step {
  title: string
  description?: string
  command: string
  talkingPoint?: string
  note?: string
}

interface Script {
  title: string
  duration: string
  audience: string
  opening?: string
  steps: Step[]
}

const SCRIPTS: Record<string, Script> = {
  'port-lifecycle': {
    title: 'The 5-Minute Network',
    duration: '5 min',
    audience: 'Sales / SA',
    opening: "Let me show you how quickly you can provision network infrastructure with Megaport.",
    steps: [
      {
        title: 'Browse available locations',
        description: 'Start by exploring the 700+ data centres on the Megaport fabric.',
        command: 'megaport-cli locations list --metro Singapore',
        talkingPoint: "700 data centres across 23 countries — if you have a facility on this list, you can connect to any cloud provider in minutes.",
      },
      {
        title: 'Filter to your metro area',
        description: 'Narrow the list to locations relevant to your customer.',
        command: 'megaport-cli locations list --metro Sydney --output json',
        talkingPoint: "Notice the JSON output — this is exactly what you'd use in a Terraform template or CI/CD pipeline.",
      },
      {
        title: 'Check cloud router availability',
        description: 'Find locations where you can also deploy an MCR for multi-cloud routing.',
        command: 'megaport-cli locations list --metro Sydney --mcr-available',
      },
      {
        title: 'Browse cloud partner ports',
        description: 'See every cloud provider available at your location.',
        command: 'megaport-cli partners list --company-name "Amazon Web Services" --location-id 3',
        talkingPoint: "AWS Direct Connect partner ports — right there in the API. No calls to AWS, no hardware order, no waiting.",
      },
      {
        title: 'Show your resources',
        description: 'See all your current infrastructure at a glance.',
        command: 'megaport-cli status',
        talkingPoint: "One command, full visibility across every port, VXC, MCR, MVE, and IX connection in your account.",
      },
    ],
  },

  'cloud-connect': {
    title: 'Cloud Connect',
    duration: '10 min',
    audience: 'SA',
    opening: "AWS Direct Connect in under 10 minutes — no hardware, no cross-connect orders.",
    steps: [
      {
        title: 'List your ports',
        description: 'Find the port you want to use as the A-End of your cloud VXC.',
        command: 'megaport-cli ports list',
        talkingPoint: "Every port you own, anywhere in the world, in one view.",
      },
      {
        title: 'Find AWS Direct Connect partner ports',
        description: 'Discover available AWS partner ports at your location.',
        command: 'megaport-cli partners list --company-name "Amazon Web Services" --location-id 3',
        talkingPoint: "Megaport hosts AWS Direct Connect partner ports in co-location facilities globally. No additional AWS infrastructure needed.",
      },
      {
        title: 'Browse all cloud partners',
        description: 'See every cloud provider on the Megaport fabric.',
        command: 'megaport-cli partners list',
        talkingPoint: "AWS, Azure, Google Cloud, Oracle, IBM, Salesforce — hundreds of providers, all accessible through the same API.",
      },
      {
        title: 'Show JSON output for automation',
        description: 'The same data in JSON — ready for scripting or IaC.',
        command: 'megaport-cli partners list --company-name "Amazon Web Services" --output json',
        talkingPoint: "Your Terraform or Pulumi code can query this API to discover partner port UIDs dynamically — no hardcoding.",
      },
    ],
  },

  'multi-cloud': {
    title: 'Multi-Cloud Hub',
    duration: '15 min',
    audience: 'SA',
    opening: "One command-line tool to connect AWS, Azure, and GCP through private infrastructure.",
    steps: [
      {
        title: 'Full infrastructure dashboard',
        description: 'See all resource types in one view.',
        command: 'megaport-cli status',
        talkingPoint: "Ports, VXCs, MCRs, MVEs, and IXs — one command shows everything. This is your network inventory.",
      },
      {
        title: 'List Cloud Routers (MCRs)',
        description: 'MCR is the hub for multi-cloud routing — a virtual Layer 3 router in the Megaport fabric.',
        command: 'megaport-cli mcr list',
        talkingPoint: "An MCR replaces a physical router at your data centre. AWS, Azure, and GCP all connect to it via BGP — no MPLS, no hardware.",
      },
      {
        title: 'List all VXC connections',
        description: 'See every virtual circuit — the spokes connecting your MCR to each cloud.',
        command: 'megaport-cli vxc list',
        talkingPoint: "Every cloud connection is a VXC. You can provision, update, or delete them programmatically — no tickets, no lead times.",
      },
      {
        title: 'JSON output for automation',
        description: 'Export your current state as JSON for IaC or reporting.',
        command: 'megaport-cli ports list --output json',
        talkingPoint: "Pull this into your CMDB, feed it into Terraform state, or pipe it to jq for filtering. The CLI is a first-class automation tool.",
      },
      {
        title: 'CSV report',
        description: 'Export to CSV for spreadsheets or business reporting.',
        command: 'megaport-cli ports list --output csv',
        talkingPoint: "Not everything needs to be automated. Your NOC team gets a CSV, your architects get JSON. Same data, multiple formats.",
      },
    ],
  },

  'browser-demo': {
    title: 'Browser Demo',
    duration: '3 min',
    audience: 'Sales',
    opening: "Full CLI — zero install, runs anywhere.",
    steps: [
      {
        title: 'Check the CLI version',
        description: 'Confirm the CLI is loaded and ready in your browser.',
        command: 'megaport-cli version',
        talkingPoint: "Same binary you can install locally — compiled to WebAssembly and running right here in your browser. No install, no PATH, no setup.",
      },
      {
        title: 'Browse the global network',
        description: 'Query live data — 700+ data centres across 23 countries.',
        command: 'megaport-cli locations list',
        talkingPoint: "This is live data from the Megaport API — not a mock. Every location you can see is available for provisioning right now.",
      },
      {
        title: 'Show automation-ready output',
        description: 'JSON output works the same in the browser as in a terminal.',
        command: 'megaport-cli locations list --output json',
        talkingPoint: "The same CLI your team uses in CI/CD pipelines — running in a browser tab during a customer meeting. No preparation needed.",
      },
    ],
  },
}

const props = defineProps<{ script: string }>()

const currentScript = computed(() => SCRIPTS[props.script] ?? {
  title: `Unknown script: ${props.script}`,
  duration: '',
  audience: '',
  steps: [],
})

const script = currentScript

const copiedIndex = ref<number | null>(null)
const { track } = useAnalytics()

async function copy(command: string, index: number) {
  try {
    await navigator.clipboard.writeText(command)
    copiedIndex.value = index
    track('Demo Script Step', { script: props.script, step: index + 1 })
    setTimeout(() => { copiedIndex.value = null }, 2000)
  } catch {
    // Fallback for browsers without clipboard API
    const el = document.createElement('textarea')
    el.value = command
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    copiedIndex.value = index
    setTimeout(() => { copiedIndex.value = null }, 2000)
  }
}
</script>

<style scoped>
.guided-demo {
  border: 1px solid #1e293b;
  border-radius: 12px;
  overflow: hidden;
  background: #030712;
  margin: 1.5rem 0;
}

.demo-header {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #1e293b;
  background: #0f172a;
}

.demo-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #e2e8f0;
  margin: 0 0 0.5rem;
}

.demo-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.meta-item {
  font-size: 0.8125rem;
  color: #64748b;
}

.audience-badge {
  background: rgba(107, 45, 139, 0.2);
  color: #9B5DBB;
  border: 1px solid rgba(107, 45, 139, 0.4);
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.demo-opening {
  font-size: 0.9375rem;
  color: #94a3b8;
  font-style: italic;
  margin: 0;
  padding: 0.75rem;
  background: rgba(107, 45, 139, 0.08);
  border-left: 3px solid #6B2D8B;
  border-radius: 0 4px 4px 0;
}

/* Steps */
.steps-list {
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.step-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-number {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  background: #6B2D8B;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  font-weight: 700;
  margin-top: 0.125rem;
}

.step-content {
  flex: 1;
  min-width: 0;
}

.step-header {
  margin-bottom: 0.25rem;
}

.step-title {
  font-weight: 600;
  color: #e2e8f0;
  font-size: 0.9375rem;
}

.step-description {
  color: #94a3b8;
  font-size: 0.875rem;
  margin: 0 0 0.625rem;
  line-height: 1.5;
}

.command-block {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #111827;
  border: 1px solid #1e293b;
  border-radius: 6px;
  padding: 0.625rem 0.875rem;
  margin-bottom: 0.625rem;
}

.command-text {
  flex: 1;
  font-family: 'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 0.875rem;
  color: #4DD0E1;
  word-break: break-word;
  white-space: pre-wrap;
}

.copy-btn {
  flex-shrink: 0;
  background: transparent;
  border: 1px solid #374151;
  color: #94a3b8;
  border-radius: 4px;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.copy-btn:hover {
  border-color: #6B2D8B;
  color: #e2e8f0;
}

.copy-btn.copied {
  border-color: #10b981;
  color: #10b981;
}

.talking-point {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.625rem 0.75rem;
  background: rgba(0, 188, 212, 0.06);
  border-left: 3px solid #00BCD4;
  border-radius: 0 4px 4px 0;
  margin-bottom: 0.5rem;
}

.tp-label {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #00BCD4;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tp-text {
  font-size: 0.875rem;
  color: #cbd5e1;
  font-style: italic;
  line-height: 1.5;
}

.step-note {
  font-size: 0.8rem;
  color: #64748b;
  padding: 0.375rem 0.625rem;
  background: rgba(255,255,255,0.03);
  border-radius: 4px;
  border: 1px solid #1e293b;
}
</style>
