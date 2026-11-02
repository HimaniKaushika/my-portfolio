const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

function hasFinePointer() {
  return window.matchMedia?.('(pointer: fine)').matches
}

function addMagnetic(el) {
  let frame = 0

  const reset = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      el.style.setProperty('--mag-x', '0px')
      el.style.setProperty('--mag-y', '0px')
    })
  }

  const onMove = (event) => {
    const rect = el.getBoundingClientRect()
    const x = event.clientX - (rect.left + rect.width / 2)
    const y = event.clientY - (rect.top + rect.height / 2)
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      el.style.setProperty('--mag-x', `${clamp(x * 0.18, -6, 6).toFixed(2)}px`)
      el.style.setProperty('--mag-y', `${clamp(y * 0.2, -4, 4).toFixed(2)}px`)
    })
  }

  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerleave', reset)

  return () => {
    cancelAnimationFrame(frame)
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerleave', reset)
    el.style.removeProperty('--mag-x')
    el.style.removeProperty('--mag-y')
  }
}

function addTilt(el) {
  let frame = 0

  const reset = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      el.style.setProperty('--tilt-x', '0deg')
      el.style.setProperty('--tilt-y', '0deg')
      el.style.setProperty('--glow-x', '50%')
      el.style.setProperty('--glow-y', '50%')
    })
  }

  const onMove = (event) => {
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      el.style.setProperty('--tilt-x', `${(-y * 4).toFixed(2)}deg`)
      el.style.setProperty('--tilt-y', `${(x * 4).toFixed(2)}deg`)
      el.style.setProperty('--glow-x', `${((x + 0.5) * 100).toFixed(1)}%`)
      el.style.setProperty('--glow-y', `${((y + 0.5) * 100).toFixed(1)}%`)
    })
  }

  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerleave', reset)

  return () => {
    cancelAnimationFrame(frame)
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerleave', reset)
    el.style.removeProperty('--tilt-x')
    el.style.removeProperty('--tilt-y')
    el.style.removeProperty('--glow-x')
    el.style.removeProperty('--glow-y')
  }
}

function addHeroGlow(el) {
  let frame = 0

  const reset = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      el.style.setProperty('--cursor-x', '70%')
      el.style.setProperty('--cursor-y', '40%')
    })
  }

  const onMove = (event) => {
    const rect = el.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      el.style.setProperty('--cursor-x', `${x.toFixed(1)}%`)
      el.style.setProperty('--cursor-y', `${y.toFixed(1)}%`)
    })
  }

  el.addEventListener('pointermove', onMove)
  el.addEventListener('pointerleave', reset)

  return () => {
    cancelAnimationFrame(frame)
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerleave', reset)
    el.style.removeProperty('--cursor-x')
    el.style.removeProperty('--cursor-y')
  }
}

function initDesktopFx() {
  const cleanups = [
    ...Array.from(document.querySelectorAll('.btn'), addMagnetic),
    ...Array.from(document.querySelectorAll('[data-tilt]'), addTilt),
    ...Array.from(document.querySelectorAll('.hero'), addHeroGlow),
  ]

  return () => cleanups.forEach((cleanup) => cleanup())
}

function initTouchFx() {
  const cards = Array.from(document.querySelectorAll('[data-tilt]'))
  let frame = 0

  const updateScrollTilt = () => {
    frame = 0
    const viewportHeight = window.innerHeight || 1

    cards.forEach((el) => {
      const rect = el.getBoundingClientRect()
      const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1)
      const tilt = (0.5 - progress) * 2.4
      el.style.setProperty('--scroll-tilt', `${tilt.toFixed(2)}deg`)
    })
  }

  const scheduleScrollTilt = () => {
    if (!frame) frame = requestAnimationFrame(updateScrollTilt)
  }

  updateScrollTilt()
  window.addEventListener('scroll', scheduleScrollTilt, { passive: true })
  window.addEventListener('resize', scheduleScrollTilt, { passive: true })

  const tapCleanups = cards.map((el) => {
    let start = null
    let timer = 0

    const stopPress = () => el.classList.remove('is-pressed')

    const onDown = (event) => {
      if (event.pointerType === 'mouse') return
      start = { x: event.clientX, y: event.clientY, time: performance.now() }
      el.classList.add('is-pressed')
    }

    const onUp = (event) => {
      if (!start || event.pointerType === 'mouse') return

      const dx = event.clientX - start.x
      const dy = event.clientY - start.y
      const isTap = performance.now() - start.time < 450 && Math.hypot(dx, dy) < 12

      start = null
      stopPress()
      if (!isTap) return

      const rect = el.getBoundingClientRect()
      const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100)
      const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100)

      el.style.setProperty('--glow-x', `${x.toFixed(1)}%`)
      el.style.setProperty('--glow-y', `${y.toFixed(1)}%`)
      el.classList.add('is-tapped')

      clearTimeout(timer)
      timer = window.setTimeout(() => {
        el.classList.remove('is-tapped')
        timer = 0
      }, 450)
    }

    const onCancel = () => {
      start = null
      stopPress()
    }

    el.addEventListener('pointerdown', onDown, { passive: true })
    el.addEventListener('pointerup', onUp, { passive: true })
    el.addEventListener('pointercancel', onCancel, { passive: true })
    el.addEventListener('pointerleave', onCancel, { passive: true })

    return () => {
      clearTimeout(timer)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onCancel)
      el.removeEventListener('pointerleave', onCancel)
      el.classList.remove('is-pressed', 'is-tapped')
      el.style.removeProperty('--scroll-tilt')
      el.style.removeProperty('--glow-x')
      el.style.removeProperty('--glow-y')
    }
  })

  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', scheduleScrollTilt)
    window.removeEventListener('resize', scheduleScrollTilt)
    tapCleanups.forEach((cleanup) => cleanup())
  }
}

export function initPointerFx() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return () => {}

  return hasFinePointer() ? initDesktopFx() : initTouchFx()
}
