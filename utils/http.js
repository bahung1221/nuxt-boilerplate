let httpClient

export function setClient(newHttpClient) {
  httpClient = newHttpClient
}

const reqMethods = [
  'request', 'delete', 'get', 'head', 'options', // url, config
  'post', 'put', 'patch', // url, data, config
]

const httpUtil = {}

reqMethods.forEach((method) => {
  httpUtil[method] = function () {
    if (!httpClient) throw new Error('httpClient not installed')
    return httpClient[method].apply(null, arguments)
  }
})

export default httpUtil
