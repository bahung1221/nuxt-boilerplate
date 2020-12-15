import * as utils from '@/utils/common'

export default function({ app, req, res }, inject) {
  return inject('utils', utils)
}
