/* Docs scroll progress: standalone widget for static Astro docs pages */

;(function () {
  'use strict'

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const easeInOut = [0.65, 0, 0.35, 1]
  const easeOut = [0.22, 1, 0.36, 1]

  const fallbackByHref = {
    '/docs': [
      ['why-twent-exists','Why Twent exists'],
      ['what-twent-can-do','What Twent can do'],
      ['quick-start','Quick start'],
      ['next-steps','Next steps'],
    ],
    '/docs/getting-started/installation': [
      ['system-requirements','System requirements'],
      ['download','Download'],
      ['permissions','Permissions'],
      ['troubleshooting','Troubleshooting'],
    ],
    '/docs/getting-started/first-setup': [
      ['provider','Provider'],
      ['permissions','Permissions'],
      ['verify','Verify setup'],
    ],
    '/docs/getting-started/first-chat': [
      ['start','Start chatting'],
      ['streaming','Streaming'],
      ['tools','Tools'],
    ],
    '/docs/getting-started/permissions': [
      ['required','Required permissions'],
      ['optional','Optional permissions'],
      ['revoking','Revoking access'],
    ],
    '/docs/chat/overview': [
      ['key-features','Key features'],
      ['context-window','Context window'],
    ],
    '/docs/chat/chat-styles': [
      ['builtin','Built-in styles'],
      ['custom','Custom styles'],
    ],
    '/docs/chat/floating-chat': [
      ['enable','Enable floating chat'],
      ['behavior','Behavior'],
    ],
    '/docs/automation/overview': [
      ['overview','Overview'],
      ['limits','Limits'],
    ],
    '/docs/automation/tasker': [
      ['setup','Tasker setup'],
      ['actions','Actions'],
    ],
    '/docs/tools/overview': [
      ['parallel-execution','Parallel execution'],
      ['permissions','Permissions'],
    ],
    '/docs/tools/file-system': [
      ['paths','Paths'],
      ['safety','Safety'],
    ],
    '/docs/tools/javascript': [
      ['runtime','Runtime'],
      ['limits','Limits'],
    ],
    '/docs/tools/mcp': [
      ['servers','Servers'],
      ['auth','Authentication'],
    ],
    '/docs/tools/media': [
      ['audio','Audio'],
      ['video','Video'],
    ],
    '/docs/tools/shell': [
      ['commands','Commands'],
      ['security','Security'],
    ],
    '/docs/tools/ui-automation': [
      ['accessibility','Accessibility'],
      ['caveats','Caveats'],
    ],
    '/docs/tools/web': [
      ['fetching','Fetching'],
      ['dom','DOM'],
    ],
    '/docs/packages/overview': [
      ['install','Install'],
      ['update','Update'],
    ],
    '/docs/packages/skills': [
      ['builtin','Built-in'],
      ['community','Community'],
    ],
    '/docs/packages/marketplace': [
      ['publish','Publish'],
      ['review','Review'],
    ],
    '/docs/more/memory': [
      ['storage','Storage'],
      ['export','Export'],
    ],
    '/docs/more/settings': [
      ['models','Models'],
      ['behavior','Behavior'],
    ],
    '/docs/more/toolbox': [
      ['shortcuts','Shortcuts'],
      ['preferences','Preferences'],
    ],
    '/docs/more/voice': [
      ['stt','Speech to text'],
      ['tts','Text to speech'],
    ],
    '/docs/more/tool-reference': [
      ['shell','Shell'],
      ['files','Files'],
    ],
    '/docs/legal/data-deletion': [
      ['request','Request deletion'],
      ['retention','Retention'],
    ],
    '/docs/workflows/overview': [
      ['triggers','Triggers'],
      ['agents','Agents'],
    ],
    '/docs/workflows/examples': [
      ['automation','Automation'],
      ['research','Research'],
    ],
  }
  const fallbackSections = (fallbackByHref[location.pathname] || []).map(([id,label]) => ({ id, label }))

  const discoveredSections = Array.from(document.querySelectorAll('h2[id], h3[id]')).map((el) => ({
    id: el.getAttribute('id') || '',
    label: (el.textContent || '').trim(),
  }))

  const current = {
    href: location.pathname,
    label: (document.querySelector('h1')?.textContent || '').trim() || 'Page',
    sections: discoveredSections.length
      ? discoveredSections
      : fallbackSections,
  }

  if (!current || current.sections.length === 0) return

  const root = document.createElement('div')
  root.setAttribute('data-slot', 'docs-scroll-progress')
  root.style.position = 'fixed'
  root.style.bottom = '16px'
  root.style.left = '50%'
  root.style.zIndex = '50'
  root.style.transform = 'translateX(-50%)'
  document.body.appendChild(root)

  const surface = document.createElement('div')
  surface.style.position = 'absolute'
  surface.style.bottom = '0'
  surface.style.left = '50%'
  surface.style.transform = 'translateX(-50%)'
  surface.style.overflow = 'hidden'
  surface.style.border = '1px solid rgba(0,0,0,0.12)'
  surface.style.background = 'rgba(255,255,255,0.75)'
  surface.style.boxShadow = '0 10px 25px rgba(0,0,0,0.12)'
  surface.style.backdropFilter = 'blur(14px)'
  surface.style.color = 'inherit'
  surface.style.borderRadius = '999px'
  surface.style.transition = prefersReducedMotion
    ? 'none'
    : 'width 0.5s cubic-bezier(0.22,1,0.36,1), height 0.5s cubic-bezier(0.22,1,0.36,1), border-radius 0.5s cubic-bezier(0.22,1,0.36,1)'
  root.appendChild(surface)

  const hiddenMeasure = document.createElement('div')
  hiddenMeasure.style.position = 'absolute'
  hiddenMeasure.style.visibility = 'hidden'
  hiddenMeasure.style.pointerEvents = 'none'
  document.body.appendChild(hiddenMeasure)

  const collapsedMeasure = document.createElement('div')
  collapsedMeasure.style.display = 'inline-flex'
  collapsedMeasure.style.alignItems = 'center'
  collapsedMeasure.style.gap = '10px'
  collapsedMeasure.style.padding = '6px 2px 6px 8px'
  collapsedMeasure.innerHTML = `
    <span style="display:inline-flex;height:20px;width:20px;"></span>
    <span style="white-space:nowrap;font-size:14px;font-weight:500;line-height:20px;"></span>
  `
  hiddenMeasure.appendChild(collapsedMeasure)

  const openMeasure = document.createElement('div')
  openMeasure.style.padding = '6px'
  openMeasure.style.display = 'inline-flex'
  openMeasure.style.flexDirection = 'column'
  openMeasure.style.gap = '4px'
  openMeasure.style.minWidth = '180px'
  openMeasure.innerHTML = current.sections
    .map(
      (s) => `
    <div style="display:flex;align-items:center;gap:12px;padding:8px 12px;font-size:14px;font-weight:500;line-height:16px;white-space:nowrap;">
      <span style="display:inline-block;height:6px;width:6px;border-radius:999px;"></span>
      <span>${escapeHtml(s.label)}</span>
    </div>
  `
    )
    .join('')
  hiddenMeasure.appendChild(openMeasure)

  const collapsedLabelEl = collapsedMeasure.querySelector('span:last-child')
  collapsedLabelEl.textContent = current.sections[0]?.label ?? ''

  let collapsedWidth = collapsedMeasure.offsetWidth
  let collapsedHeight = collapsedMeasure.offsetHeight
  let openWidth = openMeasure.offsetWidth
  let openHeight = openMeasure.offsetHeight
  let labelWidth = collapsedLabelEl.offsetWidth

  const ro = new ResizeObserver(() => {
    collapsedWidth = collapsedMeasure.offsetWidth
    collapsedHeight = collapsedMeasure.offsetHeight
    openWidth = openMeasure.offsetWidth
    openHeight = openMeasure.offsetHeight
    labelWidth = collapsedLabelEl.offsetWidth
    if (!open) applySize(false)
  })
  ro.observe(collapsedMeasure)
  ro.observe(openMeasure)
  ro.observe(collapsedLabelEl)
  document.fonts.ready.then(() => {
    collapsedWidth = collapsedMeasure.offsetWidth
    collapsedHeight = collapsedMeasure.offsetHeight
    openWidth = openMeasure.offsetWidth
    openHeight = openMeasure.offsetHeight
    labelWidth = collapsedLabelEl.offsetWidth
    if (!open) applySize(false)
  }).catch(() => {})

  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.style.height = '20px'
  svg.style.width = '20px'
  svg.style.transform = 'rotate(-90deg)'
  svg.style.display = 'block'
  svg.setAttribute('aria-hidden', 'true')

  const bgCircle = document.createElementNS(svgNS, 'circle')
  bgCircle.setAttribute('cx', '12')
  bgCircle.setAttribute('cy', '12')
  bgCircle.setAttribute('r', '10')
  bgCircle.setAttribute('fill', 'none')
  bgCircle.setAttribute('stroke-width', '2.5')
  bgCircle.style.stroke = 'rgba(0,0,0,0.12)'

  const progressCircle = document.createElementNS(svgNS, 'circle')
  progressCircle.setAttribute('cx', '12')
  progressCircle.setAttribute('cy', '12')
  progressCircle.setAttribute('r', '10')
  progressCircle.setAttribute('fill', 'none')
  progressCircle.setAttribute('stroke-width', '2.5')
  progressCircle.setAttribute('stroke-linecap', 'round')
  progressCircle.style.stroke = 'currentColor'
  progressCircle.style.transition = 'none'

  svg.appendChild(bgCircle)
  svg.appendChild(progressCircle)

  const circleWrap = document.createElement('span')
  circleWrap.style.display = 'inline-flex'
  circleWrap.style.flexShrink = '0'
  circleWrap.appendChild(svg)

  const labelWrap = document.createElement('span')
  labelWrap.style.position = 'relative'
  labelWrap.style.height = '20px'
  labelWrap.style.width = `${labelWidth}px`
  labelWrap.style.display = 'inline-block'
  labelWrap.style.verticalAlign = 'middle'

  const collapsedInner = document.createElement('button')
  collapsedInner.type = 'button'
  collapsedInner.setAttribute('aria-label', 'Show sections')
  collapsedInner.style.display = 'inline-flex'
  collapsedInner.style.alignItems = 'center'
  collapsedInner.style.gap = '10px'
  collapsedInner.style.padding = '6px 14px 6px 8px'
  collapsedInner.style.background = 'transparent'
  collapsedInner.style.border = 'none'
  collapsedInner.style.color = 'inherit'
  collapsedInner.style.cursor = 'pointer'
  collapsedInner.style.font = 'inherit'
  collapsedInner.appendChild(circleWrap)

  const currentLabel = document.createElement('span')
  currentLabel.textContent = current.sections[0]?.label ?? ''
  currentLabel.style.whiteSpace = 'nowrap'
  currentLabel.style.fontSize = '14px'
  currentLabel.style.fontWeight = '500'
  currentLabel.style.lineHeight = '20px'
  collapsedInner.appendChild(currentLabel)

  const openList = document.createElement('ul')
  openList.style.position = 'absolute'
  openList.style.inset = '0'
  openList.style.display = 'flex'
  openList.style.flexDirection = 'column'
  openList.style.padding = '6px'
  openList.style.margin = '0'
  openList.style.listStyle = 'none'
  openList.style.gap = '4px'
  openList.style.opacity = '0'
  openList.style.transform = 'translateY(4px)'
  openList.style.filter = 'blur(4px)'
  openList.style.transition = prefersReducedMotion
    ? 'opacity 0.24s ease-in-out'
    : 'opacity 0.24s ease-in-out, transform 0.24s ease-in-out, filter 0.24s ease-in-out'

  const layersWrap = document.createElement('div')
  layersWrap.style.position = 'relative'
  layersWrap.style.minWidth = '0px'
  layersWrap.appendChild(collapsedInner)
  layersWrap.appendChild(openList)
  surface.appendChild(layersWrap)

  let open = false
  let activeId = current.sections[0]?.id ?? null
  let labelVersion = 0
  let prevLabel = current.sections[0]?.label ?? null

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  function applySize(isOpen) {
    const w = isOpen ? openWidth : collapsedWidth
    const h = isOpen ? openHeight : collapsedHeight
    surface.style.width = `${w}px`
    surface.style.height = `${h}px`
    const radius = isOpen ? 16 : collapsedHeight / 2
    surface.style.borderRadius = `${radius}px`
  }

  function setProgress(value) {
    const clamped = Math.max(0, Math.min(1, value))
    const circumference = 2 * Math.PI * 10
    progressCircle.setAttribute('stroke-dasharray', `${circumference}`)
    progressCircle.setAttribute('stroke-dashoffset', `${circumference * (1 - clamped)}`)
  }

  function setActiveLabel(id) {
    const section = current.sections.find((s) => s.id === id)
    if (!section) return
    activeId = id
    const label = section.label
    if (label !== prevLabel) {
      prevLabel = label
      labelVersion++
    }
    currentLabel.textContent = label
    const openItems = openList.querySelectorAll('[data-section-id]')
    openItems.forEach((el) => {
      const item = el
      const isActive = item.dataset.sectionId === id
      item.setAttribute('aria-current', isActive ? 'true' : 'false')
      const dot = item.querySelector('span:first-child')
      const text = item.querySelector('span:last-child')
      if (dot) dot.style.background = isActive ? 'currentColor' : 'rgba(0,0,0,0.22)'
      if (text) text.style.color = isActive ? 'inherit' : 'rgba(0,0,0,0.65)'
    })
  }

  function openMenu() {
    open = true
    openList.style.opacity = '1'
    openList.style.transform = 'translateY(0)'
    openList.style.filter = 'blur(0px)'
    applySize(true)
  }

  function closeMenu() {
    open = false
    openList.style.opacity = '0'
    openList.style.transform = 'translateY(4px)'
    openList.style.filter = 'blur(4px)'
    applySize(false)
  }

  function scrollToSection(id) {
    const target = document.getElementById(id)
    if (!target) return
    const prefersSmooth = !prefersReducedMotion
    target.scrollIntoView({ behavior: prefersSmooth ? 'smooth' : 'auto', block: 'start' })
  }

  function renderOpenList() {
    openList.innerHTML = ''
    current.sections.forEach((s) => {
      const li = document.createElement('li')
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.dataset.sectionId = s.id
      btn.setAttribute('aria-current', s.id === activeId ? 'true' : 'false')
      btn.style.display = 'flex'
      btn.style.alignItems = 'center'
      btn.style.gap = '12px'
      btn.style.width = '100%'
      btn.style.padding = '8px 12px'
      btn.style.fontSize = '14px'
      btn.style.fontWeight = '500'
      btn.style.lineHeight = '16px'
      btn.style.whiteSpace = 'nowrap'
      btn.style.background = 'transparent'
      btn.style.border = 'none'
      btn.style.color = 'inherit'
      btn.style.cursor = 'pointer'
      btn.style.font = 'inherit'
      btn.style.textAlign = 'left'
      btn.style.borderRadius = '14px'
      btn.addEventListener('click', () => {
        scrollToSection(s.id)
        closeMenu()
      })

      const dot = document.createElement('span')
      dot.style.display = 'inline-block'
      dot.style.height = '6px'
      dot.style.width = '6px'
      dot.style.borderRadius = '999px'
      dot.style.background = s.id === activeId ? 'currentColor' : 'rgba(0,0,0,0.22)'

      const text = document.createElement('span')
      text.textContent = s.label
      text.style.color = s.id === activeId ? 'inherit' : 'rgba(0,0,0,0.65)'

      btn.appendChild(dot)
      btn.appendChild(text)
      li.appendChild(btn)
      openList.appendChild(li)
    })
  }

  function updateActiveFromScroll() {
    const scroller = document.scrollingElement || document.documentElement
    const anchor = 120
    const active = current.sections
      .slice()
      .reverse()
      .find(({ id }) => {
        const el = document.getElementById(id)
        if (!el) return false
        const top = el.getBoundingClientRect().top + scroller.scrollTop
        return scroller.scrollTop + anchor >= top
      })
    const next = active?.id || current.sections[0]?.id || null
    if (next && next !== activeId) setActiveLabel(next)

    const first = current.sections[0]?.id
    const firstEl = first ? document.getElementById(first) : null
    const last = current.sections[current.sections.length - 1]?.id
    const lastEl = last ? document.getElementById(last) : null
    const startTop = firstEl ? firstEl.getBoundingClientRect().top + scroller.scrollTop : 0
    const endBottom = lastEl
      ? lastEl.getBoundingClientRect().bottom + scroller.scrollTop
      : document.body.scrollHeight
    const total = endBottom - startTop
    const currentTop = scroller.scrollTop + anchor
    let progress = total > 0 ? (currentTop - startTop) / total : 0
    progress = Math.max(0, Math.min(1, progress))
    setProgress(progress)
  }

  collapsedInner.addEventListener('click', () => {
    if (open) closeMenu()
    else {
      renderOpenList()
      openMenu()
    }
  })

  document.addEventListener('pointerdown', (e) => {
    if (open && !root.contains(e.target)) closeMenu()
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) closeMenu()
  })

  let ticking = false
  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      updateActiveFromScroll()
      ticking = false
    })
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', updateActiveFromScroll)

  applySize(false)
  setActiveLabel(activeId)
  updateActiveFromScroll()
})();
