const loadScripts = (urls) => {
  return Promise.all(urls.map((url) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')

      script.src = url
      script.onload = () => {
        const msg = `${url} 加载成功`
        console.log(`-------${msg}-------`)
        resolve(msg)
      }
      script.onerror = () => {
        const msg = `${url} 加载失败`
        console.log(`-------${msg}-------`)
        reject(msg)
      }

      document.head.appendChild(script)
    })
  }))
}

window.jUtils = {
  loadScripts
}

// 扩展圈子功能
const extendTopickFeature = () => {
  let hasInitCircleClick = false
  const TOPPIC_SELECTED_IMG_URL = 'https://i.postimg.cc/t4b4dtFH/o.png'
  const toppicSelectedImg = `<img class="toppic-selected-img" src="${TOPPIC_SELECTED_IMG_URL}" style="width: 22px; position: absolute; right: 15px;" />`

  const onCircleClick = () => {
    $('.topicwrapper .new_topic_picker .contents .item').on('click', function () {
      const $selectedImg = $(this).find('.toppic-selected-img')

      debugger

      setTimeout(() => {
        $('.topicwrapper .byte-popover').show()
        console.log('1000')
      }, 1000)

      $(this).css({
        position: 'relative'
      })

      if ($selectedImg.length) {
        $selectedImg.remove()
      } else {
        $(this).append(toppicSelectedImg)
      }
    })
  }
  // 通过点击xxx来添加事件监听
  const onTopicClick = () => {
    // 不知道为什么jQ的$(document)不生效, 暂时使用原生
    $(document).on('click', (event) => {
      event = event || window.event
      const target = event.target || event.srcElement

      console.log(target.className, 'target.classNametarget.className')

      if (target.className === 'new_topic' && !hasInitCircleClick) {
        hasInitCircleClick = true
        onCircleClick()
      }
    })
  }

  onTopicClick()
}

// 初始化各种前置资源
const initResources = async () => {
  const jQUrl = 'https://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1.min.js'

  await loadScripts([ jQUrl ])
}

const init = async () => {
  await initResources()
  extendTopickFeature()
}

window.addEventListener('load', () => {
  init()
}, false)