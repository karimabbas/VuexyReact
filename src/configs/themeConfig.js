// You can customize the template with the help of this file
import { isUserLoggedIn } from '@utils'

//Template config options
let appName = 'Expand'
let appLogoImage = require('@src/assets/images/icon/LOGO.png').default
//** ComponentDidMount
if (isUserLoggedIn() !== null) {
  console.log(localStorage)
  const settings = (JSON.parse(localStorage.getItem('settings')))
  appName = settings?.name_ar ?? appName
  appLogoImage = settings?.logo ?? appLogoImage
}
const themeConfig = {
  app: {
    appName,
    appLogoImage
  },
  layout: {
    isRTL: true,
    skin: 'light', // light, dark, bordered, semi-dark
    routerTransition: 'fadeIn', // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
    type: 'horizontal', // vertical, horizontal
    contentWidth: 'full', // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'floating', // static , sticky , floating, hidden
      backgroundColor: 'white' // BS color options [primary, success, etc]
    },
    footer: {
      type: 'static' // static, sticky, hidden
    },
    customizer: true,
    scrollTop: true // Enable scroll to top button
  }
}

export default themeConfig
