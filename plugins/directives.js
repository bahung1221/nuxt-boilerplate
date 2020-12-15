import Vue from 'vue'
import { directive as onClickaway } from 'vue-clickaway'
import wrapLines from './directives/dotdotdot'

Vue.directive('wrap-lines', wrapLines)
Vue.directive('on-clickaway', onClickaway)
