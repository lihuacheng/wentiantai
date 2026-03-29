/* ══ 三视图 Tab 切换 ═══════════════════════════════ */
const vtabs   = document.querySelectorAll('.vtab')
const panels  = document.querySelectorAll('.view-panel')

vtabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view
    vtabs.forEach(b => b.classList.remove('active'))
    panels.forEach(p => p.classList.remove('active'))
    btn.classList.add('active')
    const target = document.getElementById(`view-${view}`)
    if (target) target.classList.add('active')
  })
})

/* ══ 左侧导航高亮 ══════════════════════════════════ */
const navLinks = document.querySelectorAll('.nav-link')
const sections = document.querySelectorAll('.doc-section')

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    const id = entry.target.id
    navLinks.forEach(l => {
      l.classList.remove('active')
      if (l.getAttribute('href') === `#${id}`) l.classList.add('active')
    })
  })
}, { rootMargin: '-20% 0px -70% 0px', threshold: 0 })

sections.forEach(s => observer.observe(s))

/* ══ 子锚点（缺陷三视图）激活对应 tab ═══════════ */
document.querySelectorAll('.nav-sub').forEach(link => {
  link.addEventListener('click', e => {
    const href  = link.getAttribute('href')   // e.g. #s-defect-kanban
    const viewId = href.replace('#s-defect-', '') // kanban | gantt | list
    if (['list','kanban','gantt'].includes(viewId)) {
      vtabs.forEach(b => b.classList.remove('active'))
      panels.forEach(p => p.classList.remove('active'))
      const btn = document.querySelector(`.vtab[data-view="${viewId}"]`)
      if (btn) btn.classList.add('active')
      const panel = document.getElementById(`view-${viewId}`)
      if (panel) panel.classList.add('active')
    }
  })
})

/* ══ 平滑锚点（补偿顶栏高度）═══════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1)
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    const top = target.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: 'smooth' })
  })
})
