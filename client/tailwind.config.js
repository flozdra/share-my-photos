module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Sora', 'Arial', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      transitionProperty: ['hover', 'focus'],
      translate: ['hover'],
      scale: ['active', 'group-hover'],
      rotate: ['group-hover'],
      opacity: ['active'],
      dropShadow: ['hover', 'group-hover'],
    },
  },
  plugins: [],
}
