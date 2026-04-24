<template>
  <div class="loader-container" role="status" aria-label="Loading">
    <!-- Outer rotating gradient ring -->
    <div class="loader-ring">
      <svg viewBox="0 0 120 120" class="ring-svg">
        <defs>
          <linearGradient id="loader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6b2d8b" />
            <stop offset="50%" stop-color="#00bcd4" />
            <stop offset="100%" stop-color="#e40046" />
          </linearGradient>
        </defs>
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="url(#loader-grad)"
          stroke-width="3"
          stroke-linecap="round"
          stroke-dasharray="200 140"
          class="ring-circle"
        />
      </svg>
    </div>

    <!-- Pulsing glow backdrop -->
    <div class="loader-glow" aria-hidden="true" />

    <!-- Megaport rocket icon (inlined SVG for animation control) -->
    <svg
      class="loader-icon"
      viewBox="0 0 199 199"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        class="icon-inner"
        d="m86,80.9v26.6l13.5,13.5,13.4-13.4v-26.7l-13.4-13.4-13.5,13.4Z"
      />
      <path
        class="icon-outer"
        d="m99.5,0C44.5,0,0,44.5,0,99.5s44.5,99.5,99.5,99.5,99.5-44.5,99.5-99.5S154.4,0,99.5,0Zm58.2,166.3l-10.5,7.7-10.5-7.7v-26.3l-13.4-13.4-13.3,13.4v26.3l-10.5,7.7-10.5-7.7v-26.3l-13.4-13.4-13.4,13.4v26.3l-10.5,7.7-10.5-7.7v-34.9l23.9-23.9v-35.3l23.9-23.9v-30.3l10.5-7.7,10.5,7.7v30.3l23.9,23.9v35.2l23.9,23.9v35h-.1Z"
      />
    </svg>

    <!-- Loading text -->
    <p class="loader-text">Loading</p>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  position: relative;
}

/* ── Rotating ring ── */
.loader-ring {
  position: absolute;
  width: 96px;
  height: 96px;
  animation: ring-spin 1.8s linear infinite;
}

.ring-svg {
  width: 100%;
  height: 100%;
}

.ring-circle {
  transform-origin: center;
}

@keyframes ring-spin {
  to {
    transform: rotate(360deg);
  }
}

/* ── Pulsing glow ── */
.loader-glow {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(107, 45, 139, 0.3) 0%, transparent 70%);
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.15;
  }
}

/* ── Rocket icon ── */
.loader-icon {
  width: 56px;
  height: 56px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 0 12px rgba(228, 0, 70, 0.3));
  animation: icon-float 2s ease-in-out infinite;
}

.icon-inner {
  fill: #e40046;
  fill-rule: evenodd;
  animation: inner-pulse 2s ease-in-out infinite;
}

.icon-outer {
  fill: #e40046;
  fill-rule: evenodd;
}

@keyframes icon-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

@keyframes inner-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* ── Loading text ── */
.loader-text {
  margin-top: 1.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #6b7280;
  animation: text-fade 2s ease-in-out infinite;
}

@keyframes text-fade {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .loader-ring,
  .loader-glow,
  .loader-icon,
  .icon-inner,
  .loader-text {
    animation: none;
  }
  .loader-glow {
    opacity: 0.3;
  }
  .loader-text {
    opacity: 0.7;
  }
}
</style>
