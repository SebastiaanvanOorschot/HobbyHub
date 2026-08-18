import { ref } from 'vue'

/**
 * Reveals an array of line-strings one character at a time, terminal-style.
 * `revealed` holds, per line, how many characters of that line are currently shown.
 */
export function useTypewriter({ charDelay = 16, linePause = 120 } = {}) {
  const revealed = ref([])
  const isDone = ref(false)

  let timer = null
  let generation = 0

  function clearTimer() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function stop() {
    generation++
    clearTimer()
  }

  function start(lines, { instant = false } = {}) {
    stop()
    const myGeneration = generation
    isDone.value = false

    if (instant) {
      revealed.value = lines.map((line) => line.length)
      isDone.value = true
      return
    }

    revealed.value = lines.map(() => 0)
    let lineIndex = 0
    let charIndex = 0

    function tick() {
      if (myGeneration !== generation) return

      if (lineIndex >= lines.length) {
        isDone.value = true
        return
      }

      const line = lines[lineIndex]
      if (charIndex < line.length) {
        charIndex++
        revealed.value[lineIndex] = charIndex
        timer = setTimeout(tick, charDelay)
      } else {
        lineIndex++
        charIndex = 0
        timer = setTimeout(tick, linePause)
      }
    }

    timer = setTimeout(tick, charDelay)
  }

  return { revealed, isDone, start, stop }
}
