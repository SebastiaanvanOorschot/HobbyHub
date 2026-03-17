<template>
  <div class="hub">
    <header>
      <h1>Seb's Hub</h1>
      <p>Personal projects &amp; tools</p>
    </header>

    <main>
      <a
        v-for="app in apps"
        :key="app.href"
        :href="app.href"
        class="card"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="icon">{{ app.icon }}</span>
        <span class="label">{{ app.label }}</span>
        <span class="desc">{{ app.desc }}</span>
      </a>
    </main>

    <footer>sebaslive.xyz</footer>
  </div>
</template>

<script setup>
const apps = [
  {
    href: 'https://calendar.sebaslive.xyz',
    icon: '📅',
    label: 'Family Calendar',
    desc: 'Shared calendar with recurring events & weather'
  },
  {
    href: 'https://secretshare.sebaslive.xyz',
    icon: '🔒',
    label: 'Secret Share',
    desc: 'Share sensitive info via one-time encrypted links'
  },
  {
    href: 'https://resume.sebaslive.xyz',
    icon: '📄',
    label: 'Resume',
    desc: 'Professional background & experience'
  }
]
</script>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0f1117;
  color: #e2e8f0;
  min-height: 100vh;
}

.hub {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 2.5rem;
}

header {
  text-align: center;
}

header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #f8fafc;
}

header p {
  margin-top: 0.5rem;
  color: #94a3b8;
  font-size: 1rem;
}

main {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  max-width: 800px;
  width: 100%;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem 1.5rem;
  background: #1e2433;
  border: 1px solid #2d3748;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  width: 220px;
  transition: border-color 0.15s, transform 0.15s, background 0.15s;
  cursor: pointer;
}

.card:hover {
  border-color: #4f8ef7;
  background: #1a2540;
  transform: translateY(-2px);
}

.icon {
  font-size: 2rem;
}

.label {
  font-size: 1rem;
  font-weight: 600;
  color: #f1f5f9;
  text-align: center;
}

.desc {
  font-size: 0.8rem;
  color: #64748b;
  text-align: center;
  line-height: 1.4;
}

footer {
  color: #334155;
  font-size: 0.8rem;
}
</style>
