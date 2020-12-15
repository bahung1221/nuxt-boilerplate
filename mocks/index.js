export default async function(mock) {
  const prefix = '/api/mock'
  const products = [
    {
      id: 1,
      title: 'Labore et dolore magna aliqua',
      catchCopy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse.',
      description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse.<br/><br/>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>',
      imageUrl: '/assets/product-01.png',
      price: 370000,
      discountPrice: 350000,
    },
    {
      id: 2,
      title: 'Labore et dolore magna aliqua',
      catchCopy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse.',
      description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse.<br/><br/>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>',
      imageUrl: '/assets/product-02.png',
      price: 370000,
      discountPrice: 350000,
    },
  ]

  const accounts = [
    {
      id: 1,
      userName: 'Test',
      email: 'testahihi@gmail.com',
      password: 'testahihi',
      phone: '0869052629',
      address: 'Thủ Đức, TPHCM',
    },
  ]

  mock.onPost(`${prefix}/login`).reply((config) => {
    const body = JSON.parse(config.data)
    const account = accounts.find(cur => cur.email === body.email && cur.password === body.password)

    if (account) {
      return [200, {
        token: 'Bearer MOCK',
        ...account,
      }]
    }
    return [400]
  })

  mock.onGet(`${prefix}/products`).reply((config) => {
    return [200, response(products)]
  })

  mock.onGet(`${prefix}/products/1`).reply((config) => {
    return [200, response(products[0])]
  })

  mock.onGet(`${prefix}/products/2`).reply((config) => {
    return [200, response(products[1])]
  })

  mock.onAny().passThrough()

  function response(data) {
    return {
      result: data,
    }
  }
}
