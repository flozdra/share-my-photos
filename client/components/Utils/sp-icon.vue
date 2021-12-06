<template>
  <!--  <div :style="`width: ${getSize}px; height: ${getSize}px;`">-->
  <span
    class="mdi"
    :class="{
      [`${icon}`]: !!icon,
      ['sp-icon-spin']: spin,
      [`mdi-rotate-${rotate}`]: +rotate > 0,
      [`mdi-${getSize}px`]: size,
      [`text-${color}`]: color,
    }"
  ></span>
  <!--  </div>-->
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

<style scoped>
.sp-icon-spin {
  animation: sp-icon-rotate 0.7s ease infinite;
}

@keyframes sp-icon-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
