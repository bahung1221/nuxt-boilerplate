import Vue from 'vue'
import customParseFormat from 'dayjs/plugin/customParseFormat'

export const FORMAT = {
  FULL: 'DD-MM-YYYY HH:mm',
  DOT_FULL: 'DD.MM.YYYY ddd.',
  DOT: 'DD.MM.YYYY',
}

export function format(time = Date.now(), format = FORMAT.FULL) {
  return dayjs(time).format(format)
}

const time = {
  format,
  FORMAT,
}

export default function({ app, req, res }, inject) {
  if (!Vue.__plugin_time_injected) {
    dayjs.extend(customParseFormat)
  }

  switch (app.i18n.locale) {
    case 'vi': {
      require('dayjs/locale/vi')
      break
    }
    case 'en': {
      require('dayjs/locale/en')
      break
    }
  }

  dayjs.locale(app.i18n.locale)

  Vue.__plugin_time_injected = true
  return inject('time', time)
}
