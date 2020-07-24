/**
 * 修改icon路径
 * @module src/utils/BrowserUtils.js
 * @desc 修改小icon的路径
 * @author Dicky
 * @date 2018-7-16
 * @example 调用示例
 *    changeBrowserIcon('https://cdn.chipsgames.com/h5client/static/static/img/favicon.ico')
 */
export function changeBrowserIcon(url) {
  var link = document.querySelector("link[rel*='icon']") || document.createElement('link')
  link.type = 'image/x-icon'
  link.rel = 'shortcut icon'
  link.href = url
  document.getElementsByTagName('head')[0].appendChild(link)
}


/**
 * 获取语言
 * @module src/utils/BrowserUtils.js
 * @desc 获取浏览器语言，浏览器的语言可能出现多种格式的返回值，如：“zh-CN”或“zh”这两种，我们需要统一处理作为请求参数请求接口
 * @author Dicky
 * @date 2018-7-16
 * @example 调用示例
 *    getLanguage()
 */
export function getLanguage() {
  // console.log(navigator.language.toString().replace(/-/,'_'))
  let language = navigator.language || navigator.userLanguage
  if (language.indexOf('-') > -1) {
    let languages = language.split('-')
    let lan0 = languages[0].toString()
    let lan1 = languages[1].toString()
    language = lan0.toLowerCase()
    language += '_'
    language += lan1.toUpperCase()
    return language
  }
  // language = language.toUpperCase()
  switch (language) {
    case 'zh':
      return 'zh_CN'
      break
    case 'en':
      return 'en_US'
      break
    default:
      return 'en_US'
      break
  }
}

export function getCurrentIP() {
  
}
