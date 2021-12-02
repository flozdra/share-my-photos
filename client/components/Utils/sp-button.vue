<template>
  <button
    v-if="icon"
    class="base-button w-12 h-12"
    :class="{
      [`elevated`]: elevated && !transparent,
      [`w-12 h-12 `]: icon,
      [`transparent`]: transparent,
      [`py-3 px-4`]: !icon,
      [`bg-${color}`]: color,
      [`text-${textColor}`]: textColor,
    }"
    @click="$emit('click')"
  >
    <sp-icon v-if="icon" :icon="icon" size="md" :color="textColor"></sp-icon>
    <slot v-else></slot>
  </button>
</template>

<script>
import SpIcon from '~/components/Utils/sp-icon'

export default {
  name: 'SpButton',
  components: { SpIcon },
  props: {
    icon: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      default: 'black',
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    elevated: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style scoped>
.base-button {
  @apply filter drop-shadow-xl rounded-xl active:opacity-75;
}
.elevated {
  @apply hover:transition duration-200 transform hover:-translate-y-0.5;
}
.transparent {
  @apply hover:transition duration-300 transform hover:bg-gray-300 hover:bg-opacity-50;
}
</style>
