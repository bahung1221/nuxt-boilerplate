import * as mutationMethods from './mutations'
import * as getterMethods from './getters'

export const state = () => ({
  isMobileWidth: false,
  isMobileOrTabletWidth: false,
})

export const actions = {
  checkDeviceWidth({ commit }) {
    setTimeout(() => {
      const width = (window.innerWidth > 0) ? window.innerWidth : screen.width
      commit('SET_IS_MOBILE_Width', width < 600)
      commit('SET_IS_MOBILE_OR_TABLET_WIDTH', width <= 1024)
    })
  },

  async nuxtServerInit({ dispatch, commit }, { req, route }) {
    if (!route || !route.name) {
      return
    }

    console.log('nuxtInitServerCalled')
  },
}

export const mutations = mutationMethods
export const getters = getterMethods
