function checkDeviceWidth({ commit }) {
  setTimeout(() => {
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width
    commit('SET_IS_MOBILE_WIDTH', width < 600)
    commit('SET_IS_MOBILE_OR_TABLET_WIDTH', width <= 1024)
  })
}

async function nuxtServerInit({ dispatch, commit }, { req, route }) {
  if (!route || !route.name) {
    return
  }

  console.log('nuxtInitServerCalled')
}

export default {
  checkDeviceWidth,
  nuxtServerInit,
}
