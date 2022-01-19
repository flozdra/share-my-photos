import colors from 'vuetify/es5/util/colors'

export default {
  publicRuntimeConfig: {
    backendHost: process.env.BACKEND_HOST,
    backendPort: process.env.BACKEND_PORT,
    backendPathRewrite: process.env.BACKEND_PATH_REWRITE,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Share my photos',
    title: 'Share my photos',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap',
        as: 'font',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/router',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],

  auth: {
    strategies: {
      cookie: {
        cookie: {
          // (optional) If set, we check this cookie existence for loggedIn check
          name: 'XSRF-TOKEN',
        },
        user: {
          property: '',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' },
        },
      },
    },
    redirect: {
      login: '/',
      logout: '/',
      callback: '/home',
      home: '/home',
    },
  },

  // router: {
  //   middleware: ['auth'],
  //   routes: [
  //     // dynamic segments start with a colon
  //     { path: '/user/:id', component: 'HomePage' },
  //   ],
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true, // proxy only for API
    credentials: true,
  },
  proxy: {
    '/api/': {
      target: `${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`,
      pathRewrite: { '^/api/': process.env.BACKEND_PATH_REWRITE },
      changeOrigin: true,
    },
  },
  googleFonts: {
    families: {
      Sora: true,
      Roboto: true,
    },
    display: 'swap',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      source: './static/pwa/icon.png',
      filename: 'icon.png',
    },
    manifest: {
      name: 'Share my photos',
      lang: 'en',
      theme_color: '#03224A',
      background_color: '#03224A',
      short_name: 'Share my photos',
      crossorigin: 'use-credentials',
    },
    meta: {
      name: 'Share my photos',
      og: {
        title: 'Share my photos',
      },
      theme_color: '#03224A',
      background_color: '#03224A',
      appleStatusBarStyle: 'black',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#3b82f6',
          secondary: '#ec4899',
          info: '#facc15',
          warning: '#f97316',
          error: '#dc2626',
          success: '#10b981',
          shade: '#eeeeee',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    host: '0.0.0.0',
  },
}
