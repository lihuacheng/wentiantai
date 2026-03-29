/* ══ 导航栏滚动效果 ════════════════════════════════ */
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20)
})

/* ══ 滚动入场动画 ══════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // 同一父容器内的子元素依次延迟出现
      const siblings = entry.target.parentElement.querySelectorAll('.reveal')
      let delay = 0
      siblings.forEach((el, idx) => {
        if (el === entry.target) delay = idx * 80
      })
      setTimeout(() => entry.target.classList.add('visible'), delay)
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))

/* ══ 截图 Tab 切换 ═════════════════════════════════ */
const tabBtns   = document.querySelectorAll('.tab-btn')
const thumbs    = document.querySelectorAll('.thumb')
const mainImg   = document.getElementById('screenshotImg')
const frameUrl  = document.getElementById('frameUrl')

function switchScreenshot(src, label) {
  mainImg.style.opacity = '0'
  mainImg.style.transform = 'scale(.98)'
  setTimeout(() => {
    mainImg.src = src
    mainImg.alt = label
    frameUrl.textContent = label
    mainImg.style.opacity = '1'
    mainImg.style.transform = 'scale(1)'
  }, 180)
}

mainImg.style.transition = 'opacity .18s, transform .18s'

tabBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'))
    thumbs.forEach(t => t.classList.remove('active'))
    btn.classList.add('active')
    thumbs[i].classList.add('active')
    const { src, label } = thumbs[i].dataset
    switchScreenshot(src, label)
  })
})

thumbs.forEach((thumb, i) => {
  thumb.addEventListener('click', () => {
    thumbs.forEach(t => t.classList.remove('active'))
    tabBtns.forEach(b => b.classList.remove('active'))
    thumb.classList.add('active')
    tabBtns[i].classList.add('active')
    const { src, label } = thumb.dataset
    switchScreenshot(src, label)
  })
})

/* ══ 复制代码 ═══════════════════════════════════════ */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const code = btn.dataset.code.replace(/&#10;/g, '\n')
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = '已复制 ✓'
      btn.classList.add('copied')
      setTimeout(() => {
        btn.textContent = '复制'
        btn.classList.remove('copied')
      }, 2000)
    })
  })
})

/* ══ 移动端导航切换 ════════════════════════════════ */
const navToggle = document.getElementById('navToggle')
const navLinks  = document.querySelector('.nav-links')
navToggle.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex'
  navLinks.style.display = open ? '' : 'flex'
  navLinks.style.flexDirection = 'column'
  navLinks.style.position = 'absolute'
  navLinks.style.top = '60px'
  navLinks.style.left = '0'
  navLinks.style.right = '0'
  navLinks.style.background = '#fff'
  navLinks.style.padding = '12px 24px'
  navLinks.style.borderBottom = '1px solid #f0f0f0'
  navLinks.style.boxShadow = '0 8px 20px rgba(0,0,0,.08)'
  if (open) navLinks.removeAttribute('style')
})

/* ══ 平滑锚点（补偿导航栏高度）══════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1)
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    const top = target.getBoundingClientRect().top + window.scrollY - 70
    window.scrollTo({ top, behavior: 'smooth' })
  })
})
