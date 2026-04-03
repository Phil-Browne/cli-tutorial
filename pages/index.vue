<template>
  <div>
    <!-- ── Hero ── -->
    <div class="relative overflow-hidden">
      <div
        class="absolute inset-0 opacity-20 pointer-events-none"
        style="
          background: radial-gradient(
            ellipse 80% 60% at 50% -10%,
            #6b2d8b 0%,
            transparent 70%
          );
        "
        aria-hidden="true"
      />

      <div class="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left: copy -->
          <div>
            <!-- Subtle badge -->
            <div
              class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium mb-8 border"
              style="
                background-color: rgba(107, 45, 139, 0.15);
                color: #c084fc;
                border-color: rgba(107, 45, 139, 0.3);
              "
            >
              <span class="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
              WebAssembly-powered
            </div>

            <h1
              class="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight"
            >
              Master the
              <span class="megaport-gradient-text"> Megaport CLI</span>
            </h1>

            <p
              class="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-lg"
            >
              Learn real Megaport CLI workflows: provision services,
              troubleshoot connectivity, and automate repeatable network
              operations from your terminal or browser.
            </p>

            <div class="flex flex-wrap gap-4">
              <NuxtLink
                to="/getting-started/introduction"
                class="px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                style="background-color: #6b2d8b"
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

            <!-- Inline terminal snippet with copy -->
            <div
              class="mt-8 inline-flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-900/80 px-4 py-2.5 font-mono text-sm"
            >
              <span class="text-green-400 select-none">$</span>
              <span class="text-gray-200">megaport-cli ports list --table</span>
              <button
                class="ml-1 p-1 rounded text-gray-500 hover:text-white hover:bg-gray-700 transition-colors relative"
                aria-label="Copy command"
                @click="copyHeroCommand"
              >
                <!-- Copy icon -->
                <svg
                  v-if="!heroCopied"
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <!-- Check icon -->
                <svg
                  v-else
                  class="w-4 h-4 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <!-- Tooltip -->
                <span
                  v-if="heroCopied"
                  class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-gray-700 text-xs text-white whitespace-nowrap"
                >
                  Copied!
                </span>
              </button>
            </div>
          </div>

          <!-- Right: animated terminal (desktop) -->
          <div class="hidden lg:block">
            <TerminalMockup />
          </div>

          <!-- Right: simplified terminal (mobile) -->
          <div class="lg:hidden">
            <div
              class="rounded-xl border border-gray-700 bg-gray-900 p-4 font-mono text-sm"
            >
              <div class="flex items-center gap-2 mb-3">
                <span
                  class="w-3 h-3 rounded-full bg-red-500/70"
                  aria-hidden="true"
                ></span>
                <span
                  class="w-3 h-3 rounded-full bg-yellow-500/70"
                  aria-hidden="true"
                ></span>
                <span
                  class="w-3 h-3 rounded-full bg-green-500/70"
                  aria-hidden="true"
                ></span>
              </div>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-green-400" aria-hidden="true">$</span>
                <span class="text-gray-100"
                  >megaport-cli ports list --table</span
                >
              </div>
              <p class="text-xs text-gray-500 font-sans">
                Run CLI commands in your terminal or try the live browser demo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-20">
      <!-- ── What Is the Megaport CLI? ── -->
      <section class="section-reveal">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-white mb-3">
            What Is the Megaport CLI?
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto">
            A single command-line tool for provisioning and managing your entire
            Megaport network — ports, virtual cross connects, cloud routers, and
            more.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="item in cliHighlights"
            :key="item.title"
            class="p-6 rounded-2xl border border-gray-800 bg-gray-900/50"
          >
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-gray-700 bg-gray-800"
            >
              <svg
                class="w-5 h-5 text-violet-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  :d="item.icon"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">
              {{ item.title }}
            </h3>
            <p class="text-sm text-gray-400 leading-relaxed">
              {{ item.description }}
            </p>
          </div>
        </div>

        <div class="text-center mt-8">
          <p class="text-gray-500 text-sm mb-4">
            This tutorial walks you through installation, core concepts, and
            hands-on workflows — from your first command to multi-cloud
            automation.
          </p>
          <NuxtLink
            to="/getting-started"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
            style="background-color: #6b2d8b"
          >
            Get started →
          </NuxtLink>
        </div>
      </section>

      <!-- ── Feature Highlights ── -->
      <section class="section-reveal">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-white mb-3">
            Everything You Need
          </h2>
          <p class="text-gray-400">
            Built for power users, accessible to everyone.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <NuxtLink
            v-for="feature in features"
            :key="feature.title"
            :to="feature.href"
            class="group p-6 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-900/10 transition-all duration-200"
          >
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center mb-3 border border-gray-700 bg-gray-800 group-hover:border-violet-600 transition-colors"
            >
              <component
                :is="feature.iconComponent"
                class="w-5 h-5 text-gray-400 group-hover:text-violet-400 transition-colors"
              />
            </div>
            <h3
              class="font-semibold text-white mb-2 group-hover:text-violet-400 transition-colors"
            >
              {{ feature.title }}
            </h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              {{ feature.description }}
            </p>
          </NuxtLink>
        </div>
      </section>

      <!-- ── Quick Start Preview ── -->
      <section class="section-reveal">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-white mb-3">
            Up and Running in Minutes
          </h2>
          <p class="text-gray-400">
            Three steps from zero to managing your first resource.
          </p>
        </div>

        <StepProgress
          :current="1"
          :total="3"
          :steps="['Install CLI', 'Authenticate', 'Create Resources']"
        />

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 items-stretch">
          <!-- Step 1: Tabbed install -->
          <div class="flex flex-col gap-3 h-full">
            <div class="flex items-center gap-2">
              <span
                class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style="background-color: #6b2d8b"
              >
                1
              </span>
              <span class="font-semibold text-white text-sm">Install CLI</span>
            </div>
            <div
              class="flex-1 flex flex-col rounded-xl border border-gray-700 overflow-hidden min-h-[170px]"
            >
              <!-- Tabs -->
              <div class="flex border-b border-gray-700 bg-gray-900">
                <button
                  v-for="tab in installTabs"
                  :key="tab.id"
                  class="flex-1 px-2 py-2 text-xs font-medium transition-colors"
                  :class="
                    activeInstallTab === tab.id
                      ? 'text-violet-400 border-b-2 border-violet-500 bg-gray-800'
                      : 'text-gray-500 hover:text-gray-300'
                  "
                  @click="activeInstallTab = tab.id"
                >
                  {{ tab.label }}
                </button>
              </div>
              <!-- Tab content -->
              <div class="p-3 bg-gray-900/50 flex-1 font-mono text-sm">
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="text-green-400 shrink-0 select-none">$</span>
                    <span class="text-gray-100 text-xs break-all">{{
                      activeInstallCommand.command
                    }}</span>
                  </div>
                  <button
                    class="p-1 rounded text-gray-500 hover:text-white hover:bg-gray-700 transition-colors shrink-0"
                    aria-label="Copy command"
                    @click="copyInstallCommand"
                  >
                    <svg
                      v-if="!installCopied"
                      class="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <svg
                      v-else
                      class="w-3.5 h-3.5 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                </div>
                <p class="text-xs text-gray-500 mt-2 font-sans">
                  {{ activeInstallCommand.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Steps 2-4 -->
          <div
            v-for="step in quickStartSteps"
            :key="step.label"
            class="flex flex-col gap-3 h-full"
          >
            <div class="flex items-center gap-2">
              <span
                class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style="background-color: #6b2d8b"
              >
                {{ step.num }}
              </span>
              <span class="font-semibold text-white text-sm">{{
                step.label
              }}</span>
            </div>
            <div class="flex-1 flex flex-col">
              <CommandExample
                :command="step.command"
                :description="step.description"
                class="flex-1 !my-0 min-h-[170px]"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- ── Architecture Diagram ── -->
      <section class="section-reveal">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-white mb-3">How It Works</h2>
          <p class="text-gray-400">
            The CLI talks directly to the Megaport API — in your terminal or
            your browser.
          </p>
        </div>
        <!-- SVG Architecture Flow Diagram -->
        <div class="flex justify-center py-8">
          <svg
            viewBox="0 0 920 260"
            class="w-full max-w-4xl hidden md:block"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Architecture diagram: User connects via CLI or WASM to the Megaport API, which manages Ports, VXCs, MCR, MVE, IX, and Locations"
          >
            <!-- User node -->
            <rect
              x="0"
              y="80"
              width="120"
              height="100"
              rx="16"
              fill="#1f2937"
              stroke="#374151"
              stroke-width="1.5"
            />
            <circle
              cx="60"
              cy="110"
              r="16"
              fill="#374151"
              stroke="#6b7280"
              stroke-width="1"
            />
            <path
              d="M52 106 L56 110 L68 98"
              stroke="#9ca3af"
              stroke-width="2"
              stroke-linecap="round"
              fill="none"
            />
            <!-- User icon (simplified person) -->
            <circle
              cx="60"
              cy="106"
              r="6"
              fill="none"
              stroke="#9ca3af"
              stroke-width="1.5"
            />
            <path
              d="M48 122 Q60 130 72 122"
              fill="none"
              stroke="#9ca3af"
              stroke-width="1.5"
            />
            <text
              x="60"
              y="150"
              text-anchor="middle"
              fill="#d1d5db"
              font-size="13"
              font-weight="600"
              font-family="system-ui"
            >
              You
            </text>
            <text
              x="60"
              y="166"
              text-anchor="middle"
              fill="#6b7280"
              font-size="10"
              font-family="system-ui"
            >
              Developer
            </text>

            <!-- Arrow 1 -->
            <line
              x1="128"
              y1="130"
              x2="218"
              y2="105"
              stroke="#4b5563"
              stroke-width="1.5"
            />
            <polygon points="218,105 208,100 210,110" fill="#4b5563" />
            <line
              x1="128"
              y1="130"
              x2="218"
              y2="155"
              stroke="#4b5563"
              stroke-width="1.5"
            />
            <polygon points="218,155 208,150 210,160" fill="#4b5563" />

            <!-- CLI node -->
            <rect
              x="226"
              y="60"
              width="140"
              height="68"
              rx="12"
              fill="#1f2937"
              stroke="#374151"
              stroke-width="1.5"
            />
            <!-- Terminal icon -->
            <rect
              x="248"
              y="76"
              width="20"
              height="16"
              rx="3"
              fill="none"
              stroke="#9ca3af"
              stroke-width="1.2"
            />
            <path
              d="M252 82 L256 86 L252 90"
              stroke="#9ca3af"
              stroke-width="1.2"
              stroke-linecap="round"
              fill="none"
            />
            <text
              x="276"
              y="88"
              fill="#e5e7eb"
              font-size="13"
              font-weight="600"
              font-family="system-ui"
            >
              CLI
            </text>
            <text
              x="296"
              y="108"
              text-anchor="middle"
              fill="#6b7280"
              font-size="10"
              font-family="system-ui"
            >
              Local Terminal
            </text>

            <!-- WASM node -->
            <rect
              x="226"
              y="142"
              width="140"
              height="68"
              rx="12"
              fill="#1f2937"
              stroke="#374151"
              stroke-width="1.5"
            />
            <!-- Globe icon -->
            <circle
              cx="258"
              cy="168"
              r="10"
              fill="none"
              stroke="#9ca3af"
              stroke-width="1.2"
            />
            <ellipse
              cx="258"
              cy="168"
              rx="5"
              ry="10"
              fill="none"
              stroke="#9ca3af"
              stroke-width="0.8"
            />
            <line
              x1="248"
              y1="168"
              x2="268"
              y2="168"
              stroke="#9ca3af"
              stroke-width="0.8"
            />
            <text
              x="276"
              y="172"
              fill="#e5e7eb"
              font-size="13"
              font-weight="600"
              font-family="system-ui"
            >
              WASM
            </text>
            <text
              x="296"
              y="192"
              text-anchor="middle"
              fill="#6b7280"
              font-size="10"
              font-family="system-ui"
            >
              In-Browser
            </text>

            <!-- Arrow 2 -->
            <line
              x1="374"
              y1="94"
              x2="470"
              y2="122"
              stroke="#4b5563"
              stroke-width="1.5"
            />
            <polygon points="470,122 460,117 462,127" fill="#4b5563" />
            <line
              x1="374"
              y1="176"
              x2="470"
              y2="140"
              stroke="#4b5563"
              stroke-width="1.5"
            />
            <polygon points="470,140 460,135 462,145" fill="#4b5563" />

            <!-- API node (highlighted) -->
            <rect
              x="478"
              y="90"
              width="160"
              height="80"
              rx="16"
              fill="#6B2D8B"
              stroke="#9B5DBB"
              stroke-width="2"
            />
            <text
              x="558"
              y="126"
              text-anchor="middle"
              fill="white"
              font-size="15"
              font-weight="700"
              font-family="system-ui"
            >
              Megaport API
            </text>
            <text
              x="558"
              y="148"
              text-anchor="middle"
              fill="rgba(255,255,255,0.6)"
              font-size="10"
              font-family="system-ui"
            >
              api.megaport.com
            </text>

            <!-- Arrow 3 -->
            <line
              x1="646"
              y1="130"
              x2="710"
              y2="130"
              stroke="#4b5563"
              stroke-width="1.5"
            />
            <polygon points="710,130 700,125 700,135" fill="#4b5563" />

            <!-- Resources grid -->
            <rect
              x="718"
              y="40"
              width="192"
              height="180"
              rx="12"
              fill="#0f172a"
              stroke="#134e4a"
              stroke-width="1"
            />
            <text
              x="814"
              y="62"
              text-anchor="middle"
              fill="#5eead4"
              font-size="11"
              font-weight="600"
              font-family="system-ui"
            >
              Resources
            </text>

            <!-- Resource badges -->
            <rect
              x="730"
              y="74"
              width="80"
              height="28"
              rx="6"
              fill="#1f2937"
              stroke="#134e4a"
              stroke-width="1"
            />
            <text
              x="770"
              y="93"
              text-anchor="middle"
              fill="#5eead4"
              font-size="11"
              font-weight="500"
              font-family="system-ui"
            >
              Ports
            </text>

            <rect
              x="818"
              y="74"
              width="80"
              height="28"
              rx="6"
              fill="#1f2937"
              stroke="#134e4a"
              stroke-width="1"
            />
            <text
              x="858"
              y="93"
              text-anchor="middle"
              fill="#5eead4"
              font-size="11"
              font-weight="500"
              font-family="system-ui"
            >
              VXCs
            </text>

            <rect
              x="730"
              y="110"
              width="80"
              height="28"
              rx="6"
              fill="#1f2937"
              stroke="#134e4a"
              stroke-width="1"
            />
            <text
              x="770"
              y="129"
              text-anchor="middle"
              fill="#5eead4"
              font-size="11"
              font-weight="500"
              font-family="system-ui"
            >
              MCR
            </text>

            <rect
              x="818"
              y="110"
              width="80"
              height="28"
              rx="6"
              fill="#1f2937"
              stroke="#134e4a"
              stroke-width="1"
            />
            <text
              x="858"
              y="129"
              text-anchor="middle"
              fill="#5eead4"
              font-size="11"
              font-weight="500"
              font-family="system-ui"
            >
              MVE
            </text>

            <rect
              x="730"
              y="146"
              width="80"
              height="28"
              rx="6"
              fill="#1f2937"
              stroke="#134e4a"
              stroke-width="1"
            />
            <text
              x="770"
              y="165"
              text-anchor="middle"
              fill="#5eead4"
              font-size="11"
              font-weight="500"
              font-family="system-ui"
            >
              IX
            </text>

            <rect
              x="818"
              y="146"
              width="80"
              height="28"
              rx="6"
              fill="#1f2937"
              stroke="#134e4a"
              stroke-width="1"
            />
            <text
              x="858"
              y="165"
              text-anchor="middle"
              fill="#5eead4"
              font-size="11"
              font-weight="500"
              font-family="system-ui"
            >
              Locations
            </text>

            <!-- Arrow labels -->
            <text
              x="171"
              y="98"
              text-anchor="middle"
              fill="#6b7280"
              font-size="9"
              font-family="system-ui"
            >
              Terminal
            </text>
            <text
              x="171"
              y="170"
              text-anchor="middle"
              fill="#6b7280"
              font-size="9"
              font-family="system-ui"
            >
              Browser
            </text>
            <text
              x="425"
              y="104"
              text-anchor="middle"
              fill="#6b7280"
              font-size="9"
              font-family="system-ui"
            >
              HTTPS
            </text>
            <text
              x="680"
              y="120"
              text-anchor="middle"
              fill="#6b7280"
              font-size="9"
              font-family="system-ui"
            >
              REST
            </text>
          </svg>

          <!-- Mobile fallback: stacked layout -->
          <div class="md:hidden w-full space-y-4">
            <div class="flex flex-col items-center gap-4">
              <!-- You -->
              <div
                class="w-full max-w-xs rounded-xl bg-gray-800 border border-gray-700 p-4 text-center"
              >
                <svg
                  class="w-8 h-8 mx-auto text-gray-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0"
                  />
                </svg>
                <p class="text-sm font-semibold text-white">You</p>
                <p class="text-xs text-gray-400">Developer</p>
              </div>
              <!-- Down arrow -->
              <svg
                class="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              <!-- CLI / WASM -->
              <div class="flex gap-3 w-full max-w-xs">
                <div
                  class="flex-1 rounded-xl bg-gray-800 border border-gray-700 p-3 text-center"
                >
                  <p class="text-sm font-semibold text-white">CLI</p>
                  <p class="text-xs text-gray-400">Terminal</p>
                </div>
                <div
                  class="flex-1 rounded-xl bg-gray-800 border border-gray-700 p-3 text-center"
                >
                  <p class="text-sm font-semibold text-white">WASM</p>
                  <p class="text-xs text-gray-400">Browser</p>
                </div>
              </div>
              <!-- Down arrow -->
              <svg
                class="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              <!-- Megaport API -->
              <div
                class="w-full max-w-xs rounded-xl p-4 text-center border-2"
                style="background-color: #6b2d8b; border-color: #9b5dbb"
              >
                <p class="text-sm font-bold text-white">Megaport API</p>
              </div>
              <!-- Down arrow -->
              <svg
                class="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
              <!-- Resources -->
              <div class="grid grid-cols-3 gap-2 w-full max-w-xs">
                <div
                  v-for="r in [
                    'Ports',
                    'VXCs',
                    'MCR',
                    'MVE',
                    'IX',
                    'Locations',
                  ]"
                  :key="r"
                  class="px-3 py-1.5 rounded-md bg-gray-800 border border-teal-800 text-xs font-medium text-teal-300 text-center"
                >
                  {{ r }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Resource types ── -->
      <section class="section-reveal">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-white mb-3">9 Resource Types</h2>
          <p class="text-gray-400">
            Complete CLI coverage across the entire Megaport platform.
          </p>
        </div>
        <div class="flex flex-wrap gap-3 justify-center">
          <NuxtLink
            v-for="r in resourceTypes"
            :key="r.type"
            :to="r.href"
            class="hover:opacity-80 transition-opacity"
          >
            <ResourceBadge :type="r.type" />
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'landing' });

useHead({
  title: 'Megaport CLI — Tutorials, Live Demo & Reference',
});

// ── Section reveal observer ──
const sectionObserver = ref<IntersectionObserver | null>(null);

onMounted(() => {
  sectionObserver.value = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('section-visible');
          sectionObserver.value?.unobserve(e.target);
        }
      }),
    { threshold: 0.1 },
  );
  document
    .querySelectorAll('.section-reveal')
    .forEach((el) => sectionObserver.value?.observe(el));
});

onUnmounted(() => {
  sectionObserver.value?.disconnect();
});

// ── Hero copy button ──
const heroCopied = ref(false);
async function copyHeroCommand() {
  await navigator.clipboard.writeText('megaport-cli ports list --table');
  heroCopied.value = true;
  setTimeout(() => {
    heroCopied.value = false;
  }, 2000);
}

// ── SVG Icon components (monochromatic, no emoji) ──
function createSvgIcon(
  pathData: string,
  opts: { viewBox?: string; strokeWidth?: string } = {},
) {
  return defineComponent({
    inheritAttrs: true,
    setup(
      _props: Record<string, unknown>,
      { attrs }: { attrs: Record<string, unknown> },
    ) {
      return () =>
        h(
          'svg',
          {
            fill: 'none',
            viewBox: opts.viewBox ?? '0 0 24 24',
            stroke: 'currentColor',
            'aria-hidden': 'true',
            ...attrs,
          },
          [
            h('path', {
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'stroke-width': opts.strokeWidth ?? '1.5',
              d: pathData,
            }),
          ],
        );
    },
  });
}

const IconCube = createSvgIcon(
  'M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9',
);
const IconTarget = createSvgIcon(
  'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 100 12 6 6 0 000-12zm0 4a2 2 0 100 4 2 2 0 000-4z',
);
const IconBolt = createSvgIcon(
  'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
);
const IconCloud = createSvgIcon(
  'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z',
);
const IconCog = createSvgIcon(
  'M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495',
);
const IconContainer = createSvgIcon(
  'M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z',
);

// ── CLI highlights ──
const cliHighlights = [
  {
    title: 'Provision Infrastructure',
    description:
      'Create ports, VXCs, MCRs, MVEs, and cloud on-ramps directly from your terminal — no portal clicks required.',
    icon: 'M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z',
  },
  {
    title: 'Multiple Input Modes',
    description:
      'Interactive prompts for exploration, CLI flags for scripting, and JSON file input for full automation and CI/CD pipelines.',
    icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    title: 'Try It in the Browser',
    description:
      'A live WASM-powered terminal lets you explore commands without installing anything — great for learning and quick demos.',
    icon: 'M12 21a9.004 9.004 0 008.354-5.646M12 21a9.004 9.004 0 01-8.354-5.646M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
  },
];

// ── Features grid (SVG icons + linked titles) ──
const features = [
  {
    iconComponent: IconCube,
    title: '9 Resource Types',
    description:
      'Ports, VXCs, MCR, MVE, Internet Exchange, and more — the complete Megaport platform.',
    href: '/core-concepts/resource-types',
  },
  {
    iconComponent: IconTarget,
    title: '3 Input Modes',
    description:
      'Interactive prompts for beginners, CLI flags for power users, JSON files for automation.',
    href: '/core-concepts/input-modes',
  },
  {
    iconComponent: IconBolt,
    title: 'Runs in the Browser',
    description:
      'Compiled to WebAssembly — try every command live without installing anything.',
    href: '/demos',
  },
  {
    iconComponent: IconCloud,
    title: 'Multi-Cloud Ready',
    description:
      'Native connectors for AWS Direct Connect, Azure ExpressRoute, and Google Cloud Interconnect.',
    href: '/tutorials/multi-cloud',
  },
  {
    iconComponent: IconCog,
    title: 'Automation Friendly',
    description:
      'Structured JSON output, exit codes, and JSON input mode for CI/CD pipelines and scripts.',
    href: '/tutorials/automation',
  },
  {
    iconComponent: IconContainer,
    title: 'Docker Deploy',
    description:
      'Run the web terminal in any environment with a single Docker command.',
    href: '/reference/troubleshooting',
  },
];

// ── Quick Start: Tabbed install (Step 1) ──
const activeInstallTab = ref('mac');

const installTabs = [
  // { id: 'homebrew', label: 'Homebrew' }, // TODO: re-enable once custom brew tap is published
  { id: 'mac', label: 'Mac' },
  { id: 'windows', label: 'Windows' },
  { id: 'go', label: 'Go' },
];

const installCommands: Record<
  string,
  { command: string; description: string }
> = {
  // homebrew: {
  //   command: 'brew install megaport/tap/megaport-cli',
  //   description: 'Mac & Linux via Homebrew',
  // },
  mac: {
    command:
      'curl -sSL https://github.com/megaport/megaport-cli/releases/latest/download/megaport-cli_darwin_arm64.zip -o megaport-cli.zip',
    description: 'Download pre-built binary for macOS (Apple Silicon)',
  },
  windows: {
    command:
      'curl -sSL https://github.com/megaport/megaport-cli/releases/latest/download/megaport-cli_windows_amd64.zip -o megaport-cli.zip',
    description: 'Download pre-built binary for Windows',
  },
  go: {
    command: 'go install github.com/megaport/megaport-cli@latest',
    description: 'Build from source (requires Go 1.21+)',
  },
};

const activeInstallCommand = computed(
  () => installCommands[activeInstallTab.value],
);

const installCopied = ref(false);
async function copyInstallCommand() {
  await navigator.clipboard.writeText(activeInstallCommand.value.command);
  installCopied.value = true;
  setTimeout(() => {
    installCopied.value = false;
  }, 2000);
}

// ── Quick Start: Steps 2–3 ──
const quickStartSteps = [
  {
    num: 2,
    label: 'Authenticate',
    command: 'megaport-cli config create-profile default',
    description: 'Enter your API key and secret',
  },
  {
    num: 3,
    label: 'Create Resources',
    command: 'megaport-cli ports list --table',
    description: 'List all your ports',
  },
];

// ── Resource types ──
const resourceTypes = [
  { type: 'Port', href: '/core-concepts/resource-types#port' },
  { type: 'VXC', href: '/core-concepts/resource-types#vxc' },
  { type: 'MCR', href: '/core-concepts/resource-types#mcr' },
  { type: 'MVE', href: '/core-concepts/resource-types#mve' },
  { type: 'IX', href: '/core-concepts/resource-types#ix' },
  { type: 'Location', href: '/core-concepts/resource-types#location' },
  { type: 'Partner', href: '/core-concepts/resource-types#partner' },
  { type: 'Service Key', href: '/core-concepts/resource-types#service-key' },
  { type: 'User', href: '/reference/command-reference#users' },
];
</script>
