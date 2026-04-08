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
              <span class="megaport-gradient-text-animated"> Megaport CLI</span>
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
                class="btn-shimmer px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-95"
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
            <div class="glow-border">
              <TerminalMockup />
            </div>
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
            class="group card-glow p-6 rounded-2xl border border-gray-800 bg-gray-900/50"
          >
            <div
              class="icon-box w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              :style="{ background: item.bgGradient }"
            >
              <svg
                class="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                :style="{ color: item.color }"
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
            class="btn-shimmer inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
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
            class="group card-glow p-6 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div
              class="icon-box w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-all duration-300"
              :style="{ background: feature.bgGradient }"
            >
              <component
                :is="feature.iconComponent"
                class="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                :style="{ color: feature.color }"
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
          <div class="grid grid-rows-[auto_188px_112px] gap-3 h-full">
            <div class="flex items-center justify-center gap-2">
              <span
                class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style="background-color: #6b2d8b"
              >
                1
              </span>
              <span class="font-semibold text-white text-sm">Install CLI</span>
            </div>
            <div
              class="flex flex-col rounded-xl border border-gray-700 overflow-hidden h-[188px]"
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
              <div
                class="p-3 bg-gray-900/50 flex-1 flex flex-col justify-between font-mono text-sm"
              >
                <div class="flex items-center justify-between gap-2">
                  <div
                    class="flex items-center gap-2 min-w-0 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700"
                  >
                    <span class="text-green-400 shrink-0 select-none">$</span>
                    <span class="text-gray-100 text-xs whitespace-nowrap">{{
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
                <div class="mt-2 border-t border-gray-800 pt-2">
                  <p class="text-[11px] text-gray-500 mb-1 font-sans">
                    {{ activeInstallCommand.verifyHint }}
                  </p>
                  <p
                    class="text-[11px] text-gray-300 leading-relaxed break-all"
                  >
                    {{ activeInstallCommand.verifyCommand }}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="rounded-lg border border-gray-800 bg-gray-900/40 px-3 py-2 h-[112px]"
            >
              <ul class="space-y-1">
                <li
                  v-for="line in activeInstallCommand.helpLines"
                  :key="line"
                  class="text-xs text-gray-500 leading-relaxed"
                >
                  {{ line }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Steps 2-4 -->
          <div
            v-for="step in quickStartSteps"
            :key="step.label"
            class="grid grid-rows-[auto_188px_112px] gap-3 h-full"
          >
            <div class="flex items-center justify-center gap-2">
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
            <div class="flex flex-col h-[188px]">
              <CommandExample
                :command="step.command"
                :description="step.description"
                :output="step.output"
                class="!my-0 h-full"
              />
            </div>

            <div
              class="rounded-lg border border-gray-800 bg-gray-900/40 px-3 py-2 h-[112px]"
            >
              <ul class="space-y-1">
                <li
                  v-for="line in step.helpLines"
                  :key="line"
                  class="text-xs text-gray-500 leading-relaxed"
                >
                  {{ line }}
                </li>
              </ul>
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
            viewBox="0 0 920 240"
            class="w-full max-w-4xl hidden md:block"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Architecture diagram: User connects via CLI or WASM to the Megaport API, which manages Ports, VXCs, MCR, MVE, IX, and Locations"
          >
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 6"
                refX="10"
                refY="3"
                markerWidth="8"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0 0 L10 3 L0 6 Z" fill="#6b7280" />
              </marker>
              <filter id="apiGlow">
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="6"
                  flood-color="#6B2D8B"
                  flood-opacity="0.4"
                />
              </filter>
            </defs>

            <!-- ── User node ── -->
            <rect
              x="10"
              y="70"
              width="110"
              height="100"
              rx="16"
              fill="#111827"
              stroke="#374151"
              stroke-width="1.5"
            />
            <!-- Person icon -->
            <circle
              cx="65"
              cy="100"
              r="12"
              fill="#1f2937"
              stroke="#6b7280"
              stroke-width="1.2"
            />
            <circle
              cx="65"
              cy="96"
              r="5"
              fill="none"
              stroke="#9ca3af"
              stroke-width="1.3"
            />
            <path
              d="M54 112 a11 8 0 0 1 22 0"
              fill="none"
              stroke="#9ca3af"
              stroke-width="1.3"
            />
            <text
              x="65"
              y="140"
              text-anchor="middle"
              fill="#e5e7eb"
              font-size="13"
              font-weight="600"
              font-family="system-ui"
            >
              You
            </text>
            <text
              x="65"
              y="155"
              text-anchor="middle"
              fill="#6b7280"
              font-size="10"
              font-family="system-ui"
            >
              Developer
            </text>

            <!-- ── Arrows: User → CLI / WASM ── -->
            <path
              d="M120 105 C160 105, 180 88, 225 88"
              stroke="#4b5563"
              stroke-width="1.5"
              marker-end="url(#arrow)"
            />
            <path
              d="M120 105 C160 105, 180 88, 225 88"
              class="data-flow"
              stroke="#9b5dbb"
              stroke-width="1.5"
              fill="none"
            />
            <path
              d="M120 135 C160 135, 180 152, 225 152"
              stroke="#4b5563"
              stroke-width="1.5"
              marker-end="url(#arrow)"
            />
            <path
              d="M120 135 C160 135, 180 152, 225 152"
              class="data-flow"
              stroke="#9b5dbb"
              stroke-width="1.5"
              fill="none"
            />
            <text
              x="170"
              y="88"
              text-anchor="middle"
              fill="#6b7280"
              font-size="9"
              font-family="system-ui"
            >
              Terminal
            </text>
            <text
              x="170"
              y="162"
              text-anchor="middle"
              fill="#6b7280"
              font-size="9"
              font-family="system-ui"
            >
              Browser
            </text>

            <!-- ── CLI node ── -->
            <rect
              x="232"
              y="58"
              width="140"
              height="60"
              rx="12"
              fill="#111827"
              stroke="#374151"
              stroke-width="1.5"
            />
            <rect
              x="252"
              y="76"
              width="16"
              height="12"
              rx="2"
              fill="none"
              stroke="#9ca3af"
              stroke-width="1.2"
            />
            <path
              d="M255 80 L259 84 L255 88"
              stroke="#9ca3af"
              stroke-width="1.2"
              stroke-linecap="round"
              fill="none"
            />
            <text
              x="278"
              y="87"
              fill="#e5e7eb"
              font-size="13"
              font-weight="600"
              font-family="system-ui"
            >
              CLI
            </text>
            <text
              x="302"
              y="104"
              text-anchor="middle"
              fill="#6b7280"
              font-size="10"
              font-family="system-ui"
            >
              Local Terminal
            </text>

            <!-- ── WASM node ── -->
            <rect
              x="232"
              y="130"
              width="140"
              height="60"
              rx="12"
              fill="#111827"
              stroke="#374151"
              stroke-width="1.5"
            />
            <circle
              cx="260"
              cy="154"
              r="8"
              fill="none"
              stroke="#9ca3af"
              stroke-width="1.2"
            />
            <ellipse
              cx="260"
              cy="154"
              rx="4"
              ry="8"
              fill="none"
              stroke="#9ca3af"
              stroke-width="0.8"
            />
            <line
              x1="252"
              y1="154"
              x2="268"
              y2="154"
              stroke="#9ca3af"
              stroke-width="0.8"
            />
            <text
              x="278"
              y="158"
              fill="#e5e7eb"
              font-size="13"
              font-weight="600"
              font-family="system-ui"
            >
              WASM
            </text>
            <text
              x="302"
              y="176"
              text-anchor="middle"
              fill="#6b7280"
              font-size="10"
              font-family="system-ui"
            >
              In-Browser
            </text>

            <!-- ── Arrows: CLI/WASM → API ── -->
            <path
              d="M372 88 C420 88, 430 120, 478 120"
              stroke="#4b5563"
              stroke-width="1.5"
              marker-end="url(#arrow)"
            />
            <path
              d="M372 88 C420 88, 430 120, 478 120"
              class="data-flow"
              stroke="#00bcd4"
              stroke-width="1.5"
              fill="none"
            />
            <path
              d="M372 160 C420 160, 430 128, 478 128"
              stroke="#4b5563"
              stroke-width="1.5"
              marker-end="url(#arrow)"
            />
            <path
              d="M372 160 C420 160, 430 128, 478 128"
              class="data-flow"
              stroke="#00bcd4"
              stroke-width="1.5"
              fill="none"
            />
            <text
              x="425"
              y="82"
              text-anchor="middle"
              fill="#6b7280"
              font-size="9"
              font-family="system-ui"
            >
              HTTPS
            </text>

            <!-- ── Megaport API node (hero) ── -->
            <rect
              x="484"
              y="82"
              width="170"
              height="76"
              rx="16"
              fill="#6B2D8B"
              stroke="#9B5DBB"
              stroke-width="2"
              filter="url(#apiGlow)"
            />
            <text
              x="569"
              y="116"
              text-anchor="middle"
              fill="white"
              font-size="15"
              font-weight="700"
              font-family="system-ui"
            >
              Megaport API
            </text>
            <text
              x="569"
              y="136"
              text-anchor="middle"
              fill="rgba(255,255,255,0.55)"
              font-size="10"
              font-family="system-ui"
            >
              api.megaport.com
            </text>

            <!-- ── Arrow: API → Resources ── -->
            <path
              d="M654 120 L708 120"
              stroke="#4b5563"
              stroke-width="1.5"
              marker-end="url(#arrow)"
            />
            <path
              d="M654 120 L708 120"
              class="data-flow"
              stroke="#5eead4"
              stroke-width="1.5"
              fill="none"
            />
            <text
              x="682"
              y="112"
              text-anchor="middle"
              fill="#6b7280"
              font-size="9"
              font-family="system-ui"
            >
              REST
            </text>

            <!-- ── Resources group ── -->
            <rect
              x="718"
              y="34"
              width="192"
              height="192"
              rx="12"
              fill="#0d1520"
              stroke="#134e4a"
              stroke-width="1"
            />
            <text
              x="814"
              y="57"
              text-anchor="middle"
              fill="#5eead4"
              font-size="11"
              font-weight="600"
              font-family="system-ui"
            >
              Resources
            </text>

            <!-- Row 1 -->
            <rect
              x="730"
              y="68"
              width="82"
              height="30"
              rx="6"
              fill="#111827"
              stroke="#134e4a"
              stroke-width="1"
            />
            <text
              x="771"
              y="88"
              text-anchor="middle"
              fill="#5eead4"
              font-size="11"
              font-weight="500"
              font-family="system-ui"
            >
              Ports
            </text>
            <rect
              x="820"
              y="68"
              width="82"
              height="30"
              rx="6"
              fill="#111827"
              stroke="#134e4a"
              stroke-width="1"
            />
            <text
              x="861"
              y="88"
              text-anchor="middle"
              fill="#5eead4"
              font-size="11"
              font-weight="500"
              font-family="system-ui"
            >
              VXCs
            </text>
            <!-- Row 2 -->
            <rect
              x="730"
              y="106"
              width="82"
              height="30"
              rx="6"
              fill="#111827"
              stroke="#134e4a"
              stroke-width="1"
            />
            <text
              x="771"
              y="126"
              text-anchor="middle"
              fill="#5eead4"
              font-size="11"
              font-weight="500"
              font-family="system-ui"
            >
              MCR
            </text>
            <rect
              x="820"
              y="106"
              width="82"
              height="30"
              rx="6"
              fill="#111827"
              stroke="#134e4a"
              stroke-width="1"
            />
            <text
              x="861"
              y="126"
              text-anchor="middle"
              fill="#5eead4"
              font-size="11"
              font-weight="500"
              font-family="system-ui"
            >
              MVE
            </text>
            <!-- Row 3 -->
            <rect
              x="730"
              y="144"
              width="82"
              height="30"
              rx="6"
              fill="#111827"
              stroke="#134e4a"
              stroke-width="1"
            />
            <text
              x="771"
              y="164"
              text-anchor="middle"
              fill="#5eead4"
              font-size="11"
              font-weight="500"
              font-family="system-ui"
            >
              IX
            </text>
            <rect
              x="820"
              y="144"
              width="82"
              height="30"
              rx="6"
              fill="#111827"
              stroke="#134e4a"
              stroke-width="1"
            />
            <text
              x="861"
              y="164"
              text-anchor="middle"
              fill="#5eead4"
              font-size="11"
              font-weight="500"
              font-family="system-ui"
            >
              Locations
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

      <!-- ── Why Megaport CLI? ── -->
      <section class="section-reveal">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-white mb-3">
            Why Use the CLI?
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto">
            Move faster, reduce errors, and scale your network operations.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl border border-gray-800 bg-gray-900/50 text-center">
            <p class="text-4xl font-extrabold text-violet-400 mb-2">Minutes</p>
            <p class="text-sm text-gray-300 font-medium mb-1">vs. days with manual processes</p>
            <p class="text-xs text-gray-500">Provision a port, connect to AWS, and route traffic — all from one terminal session.</p>
          </div>
          <div class="p-6 rounded-2xl border border-gray-800 bg-gray-900/50 text-center">
            <p class="text-4xl font-extrabold text-violet-400 mb-2">Repeatable</p>
            <p class="text-sm text-gray-300 font-medium mb-1">Script once, deploy everywhere</p>
            <p class="text-xs text-gray-500">JSON templates and CI/CD pipelines replace portal clicks with auditable, version-controlled infrastructure.</p>
          </div>
          <div class="p-6 rounded-2xl border border-gray-800 bg-gray-900/50 text-center">
            <p class="text-4xl font-extrabold text-violet-400 mb-2">800+</p>
            <p class="text-sm text-gray-300 font-medium mb-1">Data centres in 26 countries</p>
            <p class="text-xs text-gray-500">Query live availability, filter by metro, and connect to any cloud provider — all via API.</p>
          </div>
        </div>
        <div class="text-center mt-8">
          <NuxtLink
            to="/getting-started/learning-paths"
            class="btn-shimmer inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
            style="background-color: #6b2d8b"
          >
            Choose your learning path →
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
    color: '#c084fc',
    bgGradient: 'linear-gradient(135deg, rgba(107,45,139,0.25) 0%, rgba(107,45,139,0.08) 100%)',
  },
  {
    title: 'Multiple Input Modes',
    description:
      'Interactive prompts for exploration, CLI flags for scripting, and JSON file input for full automation and CI/CD pipelines.',
    icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    color: '#4dd0e1',
    bgGradient: 'linear-gradient(135deg, rgba(0,188,212,0.2) 0%, rgba(0,188,212,0.06) 100%)',
  },
  {
    title: 'Try It in the Browser',
    description:
      'A live WASM-powered terminal lets you explore commands without installing anything — great for learning and quick demos.',
    icon: 'M12 21a9.004 9.004 0 008.354-5.646M12 21a9.004 9.004 0 01-8.354-5.646M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
    color: '#f87171',
    bgGradient: 'linear-gradient(135deg, rgba(228,0,70,0.2) 0%, rgba(228,0,70,0.06) 100%)',
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
    color: '#c084fc',
    bgGradient: 'linear-gradient(135deg, rgba(107,45,139,0.25) 0%, rgba(107,45,139,0.08) 100%)',
  },
  {
    iconComponent: IconTarget,
    title: '3 Input Modes',
    description:
      'Interactive prompts for beginners, CLI flags for power users, JSON files for automation.',
    href: '/core-concepts/input-modes',
    color: '#4dd0e1',
    bgGradient: 'linear-gradient(135deg, rgba(0,188,212,0.2) 0%, rgba(0,188,212,0.06) 100%)',
  },
  {
    iconComponent: IconBolt,
    title: 'Runs in the Browser',
    description:
      'Compiled to WebAssembly — try every command live without installing anything.',
    href: '/demos',
    color: '#f87171',
    bgGradient: 'linear-gradient(135deg, rgba(228,0,70,0.2) 0%, rgba(228,0,70,0.06) 100%)',
  },
  {
    iconComponent: IconCloud,
    title: 'Multi-Cloud Ready',
    description:
      'Native connectors for AWS Direct Connect, Azure ExpressRoute, and Google Cloud Interconnect.',
    href: '/tutorials/multi-cloud',
    color: '#38bdf8',
    bgGradient: 'linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(56,189,248,0.06) 100%)',
  },
  {
    iconComponent: IconCog,
    title: 'Automation Friendly',
    description:
      'Structured JSON output, exit codes, and JSON input mode for CI/CD pipelines and scripts.',
    href: '/tutorials/automation',
    color: '#fbbf24',
    bgGradient: 'linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(251,191,36,0.06) 100%)',
  },
  {
    iconComponent: IconContainer,
    title: 'Docker Deploy',
    description:
      'Run the web terminal in any environment with a single Docker command.',
    href: '/reference/troubleshooting',
    color: '#34d399',
    bgGradient: 'linear-gradient(135deg, rgba(52,211,153,0.2) 0%, rgba(52,211,153,0.06) 100%)',
  },
];

// ── Quick Start: Tabbed install (Step 1) ──
const activeInstallTab = ref('homebrew');

const installTabs = [
  { id: 'homebrew', label: 'Homebrew' },
  { id: 'mac', label: 'Mac' },
  { id: 'windows', label: 'Windows' },
  { id: 'go', label: 'Go' },
];

const installCommands: Record<
  string,
  { command: string; description: string; verifyHint: string; verifyCommand: string; helpLines: string[] }
> = {
  homebrew: {
    command: 'brew install megaport/tap/megaport-cli',
    description: 'Mac & Linux via Homebrew',
    verifyHint: 'Then verify:',
    verifyCommand: 'megaport-cli version',
    helpLines: [
      'The easiest way to install on macOS or Linux.',
      'Run "brew upgrade megaport-cli" to update.',
      'Tap is auto-updated with each new release.',
    ],
  },
  mac: {
    command:
      'curl -sSL https://github.com/megaport/megaport-cli/releases/latest/download/megaport-cli_darwin_arm64.zip -o megaport-cli.zip',
    description: 'Download macOS binary (Apple Silicon)',
    verifyHint: 'Then unzip and verify:',
    verifyCommand: 'unzip megaport-cli.zip && ./megaport-cli version',
    helpLines: [
      'Choose Mac for Apple Silicon machines.',
      'For Intel Macs, use the darwin_amd64 release asset.',
      'Move the binary to your PATH for global use.',
    ],
  },
  windows: {
    command:
      'curl -sSL https://github.com/megaport/megaport-cli/releases/latest/download/megaport-cli_windows_amd64.zip -o megaport-cli.zip',
    description: 'Download pre-built binary for Windows',
    verifyHint: 'Then unzip and verify:',
    verifyCommand: 'unzip megaport-cli.zip && ./megaport-cli version',
    helpLines: [
      'Use PowerShell or Git Bash to download and extract.',
      'Add megaport-cli.exe to your PATH.',
      'Run "megaport-cli version" to verify installation.',
    ],
  },
  go: {
    command: 'go install github.com/megaport/megaport-cli@latest',
    description: 'Build from source (requires Go 1.21+)',
    verifyHint: 'Then verify:',
    verifyCommand: 'megaport-cli version',
    helpLines: [
      'Great for environments that manage tools with Go modules.',
      'Keep Go updated to avoid build/runtime mismatches.',
      'Pin versions in CI for predictable builds.',
    ],
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
    output:
      'Profile "default" created\nEnvironment: production\nActive profile: default',
    helpLines: [
      'Use production for live resources and real changes.',
      'Use staging while learning and testing safely.',
      'Switch profiles quickly with config use-profile.',
    ],
  },
  {
    num: 3,
    label: 'Create Resources',
    command: 'megaport-cli ports list --table',
    description: 'List all your ports',
    output:
      'UID       NAME          SPEED   STATUS\nabc-123   Sydney Port   10G     LIVE\ndef-456   Melbourne     1G      LIVE',
    helpLines: [
      'Run get/status/update commands on any returned UID.',
      'Use --output json for script-friendly automation.',
      'Add --profile to target another environment quickly.',
    ],
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
