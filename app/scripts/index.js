import mainMenu from '../views/components/shared/header/main-menu/main-menu.js'
import gotoTop from '../views/components/shared/goto_top/goto_top.js'
import cookieLayer from '../views/components/shared/cookie_layer/cookie_layer.js'

const pageId = document.body.id

mainMenu.toggleMobileMenu()
gotoTop.init()
cookieLayer.init()

// Import views specific scripts
const modules = {
  home: () => import('../views/home/home.js')
}

// Execute view specific script
if (modules[pageId]) {
  modules[pageId]().then((module) => {
    module.default?.init?.()
  }).catch((err) => {
    console.error('Failed to load module:', pageId, err)
  })
}

