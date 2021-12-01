<template>
  <span
    class="mdi"
    :class="{
      [`${icon}`]: !!icon,
      ['mdi-spin']: spin,
      [`mdi-rotate-${rotate}`]: +rotate > 0,
      [`mdi-${getSize}px`]: size,
      [`text-${color}`]: color,
    }"
  ></span>
</template>

<script>
export default {
  name: 'SpIcon',
  model: {
    prop: 'icon',
  },
  props: {
    icon: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    spin: {
      type: Boolean,
      default: false,
    },
    rotate: {
      type: String || Number,
      default: null,
    },
    size: {
      type: String || Number,
      default: 'sm',
    },
  },
  computed: {
    getSize() {
      switch (this.size) {
        case 'xs':
          return 12
        case 'sm':
          return 18
        case 'md':
          return 24
        case 'lg':
          return 36
        case 'xl':
          return 48
        default:
          if (Number.isInteger(this.size)) return this.size
      }
      return 18
    },
  },
}
</script>

<style scoped></style>
