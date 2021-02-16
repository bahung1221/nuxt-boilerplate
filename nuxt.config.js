const webpack = require('webpack')
const isLocal = require('./utils/dev').isLocal()
const hasDevtool = require('./utils/dev').hasDevtool()
if (!isLocal) {
  require('dotenv-safe').config({
    path: `.env.${process.env.NODE_ENV}`,
    allowEmptyValues: true,
  })
}

const nuxtConfigs = {
  render: {
    fallback: false,
  },
  telemetry: false,
  vue: {
    config: {
      productionTip: !hasDevtool,
      devtools: hasDevtool,
    },
  },
  router: {
    trailingSlash: true,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Site Title (REPLACE)',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Description (REPLACE)' },
      { hid: 'og:title', property: 'og:title', content: 'Site Title (REPLACE)' },
      { hid: 'og:description', property: 'og:description', content: 'Description (REPLACE)' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@@/assets/scss/common.scss',
    '@@/assets/scss/variables.scss',
    '@@/assets/scss/mixins.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@@plugins/http.js',
    '@@plugins/mock',
    '@@plugins/time.js',
    '@@plugins/common.js',
    { src: '@@plugins/directives.js', ssr: false },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'nuxt-i18n',
    '@nuxtjs/style-resources',
    '@nuxtjs/redirect-module',
    ['@nuxtjs/google-analytics', {
      id: process.env.GA_ID,
    }],
  ],

  axios: {
    retry: { retries: 3 },
    proxy: true,
  },

  proxy: {
    '/api/': { target: process.env.API_URL, ws: false },
  },

  /*
   ** Style resources loader for load global variables, mixins
   */
  styleResources: {
    scss: ['./assets/scss/mixins.scss', './assets/scss/variables.scss'],
  },

  redirect: [
    {
      from: '^(\\/[^\\?]*[^\\/])(\\?.*)?$',
      to: '$1/$2',
      statusCode: 301,
    },
  ],

  /*
  ** Build configuration
  */
  build: {
    extractCSS: !isLocal,
    filenames: {
      css: ({ isDev }) => isDev ? '[name].css' : '[name].[contenthash].css',
      app: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js',
      chunk: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js',
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
    plugins: [
      // Set env variable
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(process.env.API_URL),
        SURFACE_URL: JSON.stringify(process.env.SURFACE_URL),
      }),
      // set shortcuts as global for bootstrap
      new webpack.ProvidePlugin({
        $: 'jquery',
        dayjs: 'dayjs',
      }),
    ],
  },

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en',
      },
      {
        code: 'vi',
        iso: 'vi',
      },
    ],
    defaultLocale: 'vi',
    seo: false,
    baseUrl: process.env.SURFACE_URL,
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   cookieKey: 'i18n_redirected',
    // },
    vueI18nLoader: true,
    vueI18n: {
      fallbackLocale: 'vi',
    },
  },
}

module.exports = nuxtConfigs
