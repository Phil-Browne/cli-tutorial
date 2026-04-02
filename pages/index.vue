<template>
  <div>
    <!-- ── Hero ── -->
    <div class="relative overflow-hidden">
      <div
        class="absolute inset-0 opacity-20 pointer-events-none"
        style="background: radial-gradient(ellipse 80% 60% at 50% -10%, #6B2D8B 0%, transparent 70%);"
      />

      <div class="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left: copy -->
          <div>
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-6 border"
              style="background-color: rgba(107, 45, 139, 0.2); color: #c084fc; border-color: rgba(107, 45, 139, 0.4);"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              WebAssembly-powered — runs in your browser
            </div>

            <h1 class="text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
              Master the
              <span class="megaport-gradient-text"> Megaport CLI</span>
            </h1>

            <p class="text-xl text-gray-400 mb-8 leading-relaxed">
              The complete guide to managing network infrastructure from your terminal — or your browser. Interactive demos, no install required.
            </p>

            <div class="flex flex-wrap gap-4">
              <NuxtLink
                to="/getting-started"
                class="px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                style="background-color: #6B2D8B;"
              >
                Get Started →
              </NuxtLink>
              <NuxtLink
                to="/demos"
                class="px-7 py-3.5 rounded-xl font-semibold text-gray-200 bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-all"
              >
                Try Live Demo
              </NuxtLink>
            </div>
          </div>

          <!-- Right: animated terminal -->
          <div class="hidden lg:block">
            <UiTerminalMockup />
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-20">
      <!-- ── Audience Paths ── -->
      <section class="section-reveal">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-white mb-3">Choose Your Path</h2>
          <p class="text-gray-400">Tailored content for different roles and goals.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <NuxtLink
            v-for="path in audiencePaths"
            :key="path.title"
            :to="path.to"
            class="group p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-violet-700 transition-all"
          >
            <div class="text-4xl mb-4">{{ path.icon }}</div>
            <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-violet-400 transition-colors">
              {{ path.title }}
            </h3>
            <ul class="space-y-2 mb-6">
              <li
                v-for="point in path.points"
                :key="point"
                class="flex items-start gap-2 text-sm text-gray-400"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0 mt-1.5" />
                {{ point }}
              </li>
            </ul>
            <span class="text-sm font-medium text-violet-400 group-hover:underline">
              {{ path.cta }} →
            </span>
          </NuxtLink>
        </div>
      </section>

      <!-- ── Feature Highlights ── -->
      <section class="section-reveal">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-white mb-3">Everything You Need</h2>
          <p class="text-gray-400">Built for power users, accessible to everyone.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="p-6 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-900/10 transition-all duration-200"
          >
            <div class="text-3xl mb-3">{{ feature.icon }}</div>
            <h3 class="font-semibold text-white mb-2">{{ feature.title }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <!-- ── Quick Start Preview ── -->
      <section class="section-reveal">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-white mb-3">Up and Running in Minutes</h2>
          <p class="text-gray-400">Three steps from zero to managing your first resource.</p>
        </div>

        <UiStepProgress :current="1" :total="3" :steps="['Install', 'Authenticate', 'Create Resources']" />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div v-for="step in quickStart" :key="step.label" class="space-y-3">
            <div class="flex items-center gap-2">
              <span
                class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style="background-color: #6B2D8B;"
              >
                {{ step.num }}
              </span>
              <span class="font-semibold text-white text-sm">{{ step.label }}</span>
            </div>
            <UiCommandExample :command="step.command" :description="step.description" />
          </div>
        </div>
      </section>

      <!-- ── Architecture Diagram ── -->
      <section class="section-reveal">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-white mb-3">How It Works</h2>
          <p class="text-gray-400">The CLI talks directly to the Megaport API — in your terminal or your browser.</p>
        </div>
        <UiNetworkDiagram :definition="architectureDiagram" />
      </section>

      <!-- ── Resource types ── -->
      <section class="section-reveal">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-white mb-3">14 Resource Types</h2>
          <p class="text-gray-400">Complete CLI coverage across the entire Megaport platform.</p>
        </div>
        <div class="flex flex-wrap gap-3 justify-center">
          <UiResourceBadge v-for="r in resourceTypes" :key="r" :type="r" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'landing' })

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('section-visible')
        observer.unobserve(e.target)
      }
    }),
    { threshold: 0.1 }
  )
  document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el))
})

const audiencePaths = [
  {
    icon: '🏗️',
    title: 'For Solutions Architects',
    points: [
      'Deep-dive tutorials on ports, VXCs, MCR, and MVE',
      'Architecture patterns and multi-cloud connectivity',
      'Automation scripts and JSON input mode',
    ],
    cta: 'Start learning',
    to: '/getting-started',
  },
  {
    icon: '💼',
    title: 'For Sales & Pre-Sales',
    points: [
      'Interactive browser demos — no install required',
      'Ready-to-run customer presentation scripts',
      'Quick talking points for every resource type',
    ],
    cta: 'See live demos',
    to: '/demos',
  },
]

const features = [
  {
    icon: '📦',
    title: '14 Resource Types',
    description: 'Ports, VXCs, MCR, MVE, Internet Exchange, and more — the complete Megaport platform.',
  },
  {
    icon: '🎯',
    title: '3 Input Modes',
    description: 'Interactive prompts for beginners, CLI flags for power users, JSON files for automation.',
  },
  {
    icon: '⚡',
    title: 'Runs in the Browser',
    description: 'Compiled to WebAssembly — try every command live without installing anything.',
  },
  {
    icon: '☁️',
    title: 'Multi-Cloud Ready',
    description: 'Native connectors for AWS Direct Connect, Azure ExpressRoute, and Google Cloud Interconnect.',
  },
  {
    icon: '🤖',
    title: 'Automation Friendly',
    description: 'Structured JSON output, exit codes, and JSON input mode for CI/CD pipelines and scripts.',
  },
  {
    icon: '🐳',
    title: 'Docker Deploy',
    description: 'Run the web terminal in any environment with a single Docker command.',
  },
]

const quickStart = [
  {
    num: 1,
    label: 'Install',
    command: 'brew install megaport/tap/megaport-cli',
    description: 'macOS / Linux via Homebrew',
  },
  {
    num: 2,
    label: 'Authenticate',
    command: 'megaport config create-profile --name default',
    description: 'Enter your API key and secret',
  },
  {
    num: 3,
    label: 'Create Resources',
    command: 'megaport port list --output table',
    description: 'List all your ports',
  },
]

const resourceTypes = ['Port', 'VXC', 'MCR', 'MVE', 'IX', 'Location', 'Partner', 'Service Key', 'User']

const architectureDiagram = `flowchart LR
  A["👤 You"] --> B["CLI\n(Terminal)"]
  A --> C["WASM\n(Browser)"]
  B --> D["Megaport API"]
  C --> D
  D --> E["🔌 Ports"]
  D --> F["🔗 VXCs"]
  D --> G["🌐 MCR"]
  D --> H["📡 MVE"]
  D --> I["🌍 IX"]

  style A fill:#1f2937,stroke:#6B2D8B,color:#e2e8f0
  style B fill:#1f2937,stroke:#6B2D8B,color:#e2e8f0
  style C fill:#1f2937,stroke:#6B2D8B,color:#e2e8f0
  style D fill:#6B2D8B,stroke:#9B5DBB,color:#ffffff
  style E fill:#1f2937,stroke:#00BCD4,color:#e2e8f0
  style F fill:#1f2937,stroke:#00BCD4,color:#e2e8f0
  style G fill:#1f2937,stroke:#00BCD4,color:#e2e8f0
  style H fill:#1f2937,stroke:#00BCD4,color:#e2e8f0
  style I fill:#1f2937,stroke:#00BCD4,color:#e2e8f0`
</script>
