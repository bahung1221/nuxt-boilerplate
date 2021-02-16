import * as common from '@/utils/common'
import { setClient } from '@/utils/http'

export default function({ $axios, res }) {
  $axios.defaults.timeout = 20000

  $axios.onRequest(config => {
    return config
  })

  $axios.onResponse(response => {
    if (process.server) {
      // only accept on server side
      const resCookie = response.headers['set-cookie']
      if (resCookie) {
        res.setHeader('Set-Cookie', resCookie)
      }
    }

    // Browser config
    if (process.browser) {
      if (response.data && response.data.cookies) {
        response.data.cookies.forEach(cookie => {
          common.setCookie(
            cookie.name,
            cookie.value,
            cookie.domain,
            cookie.expire || 24 * 60,
            cookie.path || '/',
            cookie.secure || false,
            cookie.httpOnly || false
          )
        })
      }
    }

    response = response.data
  })

  setClient($axios)
}
