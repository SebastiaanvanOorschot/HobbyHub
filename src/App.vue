<template>
  <div class="hub">
    <header class="topbar">
      <span class="brand">sebaslive</span>

      <nav class="topbar-actions">
        <a
          class="ghost-button"
          href="https://github.com/SebastiaanvanOorschot"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
          <span>GitHub</span>
        </a>

        <a
          class="cv-button"
          href="https://resume.sebaslive.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          Curriculum Vitae
        </a>
      </nav>
    </header>

    <div class="content">
      <div class="intro">
        <h1>Projects</h1>
        <p>Personal projects &amp; tools</p>
      </div>

      <div class="terminal-dock">
        <div class="terminal-window" :class="{ open: openId }" @mouseenter="cancelClose" @mouseleave="scheduleClose">
          <div class="terminal" v-if="openId">
            <button type="button" class="terminal-close" aria-label="Sluit terminal" @click="closeDetails">
              &times;
            </button>
            <p v-for="(line, i) in visibleLines" :key="i" class="term-line" :class="line.type">
              <span v-if="line.glyph" class="glyph">{{ line.glyph }}</span>
              <span>{{ line.plain }}</span>
              <a
                v-if="line.linkReady"
                :href="line.href"
                target="_blank"
                rel="noopener noreferrer"
                class="term-link"
                >{{ line.linkText }}</a
              ><span v-else-if="line.href">{{ line.linkShown }}</span>
            </p>
            <span class="cursor" aria-hidden="true"></span>
          </div>
        </div>
      </div>

      <main>
        <div
          v-for="app in apps"
          :key="app.href"
          class="card-wrap"
          @mouseenter="scheduleOpen(app)"
          @mouseleave="scheduleClose"
        >
          <a :href="app.href" class="card" target="_blank" rel="noopener noreferrer">
            <span class="material-symbols-outlined icon" aria-hidden="true">{{ app.icon }}</span>
            <span class="label">{{ app.label }}</span>
            <span class="desc">{{ app.desc }}</span>
          </a>

          <button
            type="button"
            class="details-toggle"
            :class="{ active: openId === app.href }"
            :aria-expanded="openId === app.href"
            :aria-label="(openId === app.href ? 'Sluit' : 'Toon') + ' details voor ' + app.label"
            @click="toggleDetails(app)"
          >
            <span aria-hidden="true">&gt;_</span>
          </button>
        </div>
      </main>
    </div>

    <footer>sebaslive.xyz</footer>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useTypewriter } from './composables/useTypewriter'

function promptLine(text) {
  return { type: 'prompt', glyph: '$', text }
}

function outputLine(text) {
  return { type: 'output', glyph: '>', text }
}

// meta lines like "live:  https://…" — the trailing URL (href) becomes the clickable part
function metaLine(text, href = null) {
  return { type: 'meta', glyph: '', text, href, linkText: href }
}

const apps = [
  {
    href: 'https://calendar.sebaslive.xyz',
    icon: 'calendar_month',
    label: 'Family Calendar',
    desc: 'Shared calendar with recurring events & weather',
    details: {
      lines: [
        promptLine('cat family-calendar'),
        outputLine('A shared family agenda: recurring events via RRULE/iCal,'),
        outputLine('Google Calendar import, import of other iCal calendars,'),
        outputLine('a 2-week weather forecast, calendar sharing between users,'),
        outputLine('and Google sign-in.'),
        metaLine('stack: Vue.js · ASP.NET (C#)'),
        metaLine('live:  https://calendar.sebaslive.xyz', 'https://calendar.sebaslive.xyz'),
        metaLine(
          'code:  https://github.com/SebastiaanvanOorschot/illAdvisedCalendarApp',
          'https://github.com/SebastiaanvanOorschot/illAdvisedCalendarApp'
        )
      ]
    }
  },
  {
    href: 'https://secretshare.sebaslive.xyz',
    icon: 'lock_person',
    label: 'Secret Share',
    desc: 'Share sensitive info via one-time encrypted links',
    details: {
      lines: [
        promptLine('cat secret-share'),
        outputLine('Share sensitive info via one-time encrypted links.'),
        outputLine('Built to practice encryption and to share passwords'),
        outputLine('securely at work.'),
        metaLine('stack: Vue.js · ASP.NET (C#)'),
        metaLine('live:  https://secretshare.sebaslive.xyz', 'https://secretshare.sebaslive.xyz'),
        metaLine(
          'code:  https://github.com/SebastiaanvanOorschot/SecretShareApp',
          'https://github.com/SebastiaanvanOorschot/SecretShareApp'
        )
      ]
    }
  }
]

const openId = ref(null)
const typewriter = useTypewriter()

const CLOSE_DELAY = 250
let closeTimer = null

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

function supportsHover() {
  return window.matchMedia?.('(hover: hover)').matches ?? false
}

function clearCloseTimer() {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

function openDetails(app) {
  clearCloseTimer()
  if (openId.value === app.href) return

  openId.value = app.href
  const fullTexts = app.details.lines.map((line) => line.text)
  typewriter.start(fullTexts, { instant: prefersReducedMotion() })
}

function closeDetails() {
  clearCloseTimer()
  openId.value = null
  typewriter.stop()
}

function toggleDetails(app) {
  if (openId.value === app.href) {
    closeDetails()
    return
  }
  openDetails(app)
}

// Desktop-only bonus trigger — gated so touch devices never open on tap-hover.
function scheduleOpen(app) {
  if (!supportsHover()) return
  openDetails(app)
}

function cancelClose() {
  clearCloseTimer()
}

function scheduleClose() {
  if (!supportsHover()) return
  clearCloseTimer()
  closeTimer = setTimeout(closeDetails, CLOSE_DELAY)
}

const visibleLines = computed(() => {
  const app = apps.find((a) => a.href === openId.value)
  if (!app) return []

  return app.details.lines.map((line, i) => {
    const revealedCount = typewriter.revealed.value[i] ?? 0

    if (!line.href) {
      return {
        type: line.type,
        glyph: line.glyph,
        plain: line.text.slice(0, revealedCount),
        href: null
      }
    }

    const labelLen = line.text.length - line.linkText.length
    const plain = line.text.slice(0, Math.min(revealedCount, labelLen))
    const linkChars = Math.max(0, revealedCount - labelLen)
    const linkShown = line.linkText.slice(0, linkChars)
    const linkReady = revealedCount >= line.text.length

    return {
      type: line.type,
      glyph: line.glyph,
      plain,
      href: line.href,
      linkText: line.linkText,
      linkShown,
      linkReady
    }
  })
})

onBeforeUnmount(() => {
  typewriter.stop()
  clearCloseTimer()
})
</script>

<style>
:root {
  /* surfaces */
  --bg: #0a0e14;
  --surface: #111823;
  --surface-hover: #132030;
  --border: #1e2937;
  --border-hover: var(--accent);

  /* accent */
  --accent: #10b981;
  --accent-soft: rgba(16, 185, 129, 0.12);

  /* text */
  --text: #e2e8f0;
  --text-heading: #f8fafc;
  --text-strong: #f1f5f9;
  --text-muted: #94a3b8;
  --text-subtle: #64748b;
  --text-faint: #334155;

  /* terminal */
  --terminal-bg: #060a10;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Space Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
}

.hub {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem 2rem 2rem;
  gap: 2rem;
}

.topbar {
  width: 100%;
  max-width: 800px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);
}

.brand {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-strong);
}

.topbar-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.75rem;
}

.ghost-button,
.cv-button {
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.ghost-button {
  gap: 0.5rem;
  padding: 0.45rem 0.9rem;
  border: 1px solid var(--border);
  color: var(--text-muted);
}

.ghost-button:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.button-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.cv-button {
  padding: 0.4rem 1rem;
  border: 2px solid var(--accent);
  color: var(--accent);
  background: transparent;
}

.cv-button:hover {
  background: var(--accent-soft);
}

.content {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
}

.intro {
  text-align: center;
}

.intro h1 {
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text-heading);
}

.intro p {
  margin-top: 0.6rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

main {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1rem;
  justify-content: center;
  max-width: 800px;
  width: 100%;
}

.card-wrap {
  position: relative;
  width: 220px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  width: 100%;
  transition: border-color 0.15s, transform 0.15s, background 0.15s;
  cursor: pointer;
  /* De kaart krijgt een eigen compositor-laag (translate3d + will-change), zodat de
     tekst één keer gerasterd wordt en tijdens de hover-lift als geheel meeschuift.
     Zonder dit wordt de tekst elke frame op een subpixel-offset opnieuw geantialiast,
     wat er uitziet alsof de letters trillen. */
  transform: translate3d(0, 0, 0);
  will-change: transform;
  backface-visibility: hidden;
}

.card:hover {
  border-color: var(--border-hover);
  background: var(--surface-hover);
  transform: translate3d(0, -2px, 0);
}

/* kaart-iconen: Material Symbols Outlined, dun (wght 300) en niet gevuld (FILL 0),
   zodat ze bij de strakke terminal-look passen. Eén regel = alle iconen consistent. */
.material-symbols-outlined.icon {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
  font-size: 2rem;
  line-height: 1;
  color: var(--accent);
  user-select: none;
}

.label {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-strong);
  text-align: center;
}

.desc {
  font-size: 0.72rem;
  color: var(--text-subtle);
  text-align: center;
  line-height: 1.6;
  /* reserveert ruimte voor 3 regels, zodat kaarten altijd gelijk hoog zijn
     ongeacht beschrijvingslengte of een geopend detailpaneel op een buurkaart */
  min-height: calc(1.6em * 3);
}

.details-toggle {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-subtle);
  font-family: inherit;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.details-toggle:hover,
.details-toggle:focus-visible {
  border-color: var(--accent);
  color: var(--accent);
}

.details-toggle.active {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-soft);
}

/* Zero-height anchor: participates in the flex flow so it sits between the
   intro and the cards, but never itself pushes them apart. The floating
   window inside is absolutely positioned, so opening/closing it causes no
   reflow of the surrounding layout. */
.terminal-dock {
  position: relative;
  width: 100%;
  max-width: 560px;
  height: 0;
}

.terminal-window {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: min(560px, 92vw);
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 20;
  transition: opacity 0.2s ease, max-height 0.3s ease;
}

.terminal-window.open {
  max-height: min(60vh, 420px);
  opacity: 1;
  overflow-y: auto;
  pointer-events: auto;
}

.terminal {
  position: relative;
  padding: 1.5rem 1rem 1.1rem;
  background: var(--terminal-bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 0.72rem;
  line-height: 1.7;
  color: var(--text);
  word-break: break-word;
}

.terminal-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-subtle);
  font-family: inherit;
  font-size: 0.9rem;
  line-height: 1;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.terminal-close:hover,
.terminal-close:focus-visible {
  border-color: var(--accent);
  color: var(--accent);
}

.term-line {
  white-space: pre-wrap;
}

.term-line .glyph {
  color: var(--accent);
  font-weight: 700;
  margin-right: 0.45em;
}

.term-line.output {
  color: var(--text-muted);
}

.term-link {
  color: var(--accent);
  text-decoration: underline;
  text-decoration-color: var(--accent-soft);
}

.term-link:hover {
  text-decoration-color: var(--accent);
}

.cursor {
  display: inline-block;
  width: 0.55em;
  height: 1em;
  margin-left: 0.15em;
  background: var(--accent);
  vertical-align: text-bottom;
  animation: blink 1s step-start infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

footer {
  color: var(--text-faint);
  font-size: 0.72rem;
}

@media (prefers-reduced-motion: reduce) {
  .terminal-window {
    transition: none;
  }

  .cursor {
    animation: none;
  }
}

@media (max-width: 520px) {
  .hub {
    padding: 1.25rem 1rem 2rem;
  }

  .topbar-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .intro h1 {
    font-size: 1.75rem;
  }

  .terminal-window {
    width: 94vw;
  }

  .terminal-window.open {
    max-height: min(50vh, 320px);
  }

  .terminal {
    font-size: 0.68rem;
    padding: 1.4rem 0.85rem 1rem;
  }
}
</style>
