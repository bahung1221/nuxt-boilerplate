import Dotdotdot from 'dotdotdot-js'

const applyDots = async (el, binding) => {
  let dot = await _run({ el, binding })
  if (!dot) {
    return
  }

  let windowWidth = $(window).width()
  window.addEventListener('resize', () => {
    const newWidth = $(window).width()
    if (windowWidth !== newWidth) {
      windowWidth = newWidth
      _destroy({
        dot,
        el,
      })

      setTimeout(async() => {
        dot = await _run({ el, binding })
      })
    }
  })
}

function _run({ el, binding }) {
  const input = binding.value
  const line = (typeof input === 'object' ? input.line : input) || 1
  const breakAll = (typeof input === 'object' ? input.breakAll : false) || false
  const hasMore = input.hasMore
  const ellipsis = hasMore ? '...---more---' : '...'
  const options = {
    truncate: 'letter',
    ellipsis: ellipsis, // ellipsis Placeholder
  }

  if (breakAll) {
    el.style.wordBreak = 'break-all'
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const style = window.getComputedStyle(el)
      const lineHeight = style.lineHeight.split('px')[0]
      const height = style.height.split('px')[0]
      const maxHeight = lineHeight * line + 10

      if (maxHeight >= parseInt(height)) {
        return resolve()
      }

      const dot = new Dotdotdot(el, {
        ...options,
        height: maxHeight,
        callback: function() {
          if (!hasMore) {
            return
          }

          el.innerHTML = _getTruncatedHtml(el)
          const readMoreBtn = document.createElement('span')
          const arrow = document.createElement('span')

          readMoreBtn.classList.add('readmore')
          readMoreBtn.innerHTML = ' more'

          arrow.classList.add('readmore-arrow')
          arrow.innerHTML = ' &#8594;'

          let truncated = true
          const clickHandler = function() {
            if (!truncated) {
              _truncate({ dot, el })
              truncated = true
              return
            }

            _restore({
              dot,
              el,
              arrowEl: arrow,
              btnEl: readMoreBtn,
            })
            truncated = false
          }
          readMoreBtn.addEventListener('click', clickHandler)
          arrow.addEventListener('click', clickHandler)

          const contentEl = _getContentElement(el)
          contentEl.appendChild(readMoreBtn)
          contentEl.appendChild(arrow)
        },
      })

      dot.API.unwatch()

      resolve(dot)
    }, 50)
  })
}

function _destroy({ dot, el }) {
  const contentEl = _getContentElement(el)
  const readmoreEl = contentEl.querySelector('.readmore')
  const arrowEl = contentEl.querySelector('.readmore-arrow')
  readmoreEl && contentEl.removeChild(readmoreEl)
  arrowEl && contentEl.removeChild(arrowEl)

  dot.API.destroy()
}

function _truncate({ dot, el }) {
  const contentEl = _getContentElement(el)
  const readmoreEl = contentEl.querySelector('.readmore')
  const arrowEl = contentEl.querySelector('.readmore-arrow')
  readmoreEl && contentEl.removeChild(readmoreEl)
  arrowEl && contentEl.removeChild(arrowEl)

  dot.API.truncate()
}

function _restore({ dot, el, arrowEl, btnEl }) {
  dot.API.restore()
  btnEl.innerHTML = ' less '
  arrowEl.innerHTML = '&#8592;'

  const contentEl = _getContentElement(el)
  contentEl.appendChild(btnEl)
  contentEl.appendChild(arrowEl)
}

function _getContentElement(el) {
  const hasChild = !!(el.childNodes.length)
  const lastChildTag = el.lastElementChild ? el.lastElementChild.tagName : ''
  return hasChild && lastChildTag.toLowerCase() === 'p'
    ? el.lastElementChild
    : el
}

function _getTruncatedHtml(el) {
  return el.innerHTML.split('---more---')[0]
}

const WrapLines = {
  inserted(el, binding) {
    applyDots(el, binding)
  },
  update(el, binding) {
    applyDots(el, binding)
  },
}

export default WrapLines
