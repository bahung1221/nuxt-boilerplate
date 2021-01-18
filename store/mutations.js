function SET_IS_MOBILE_WIDTH(state, val) {
  state.isMobileWidth = val
}

function SET_IS_MOBILE_OR_TABLET_WIDTH(state, val) {
  state.isMobileOrTabletWidth = val
}

export default {
  SET_IS_MOBILE_WIDTH,
  SET_IS_MOBILE_OR_TABLET_WIDTH,
}
