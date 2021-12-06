<template>
  <button
    class="relative rounded-lg"
    :class="{
      [`sp-btn-${type}`]: type,
      [`py-2 px-4`]: (label || error) && !done,
      [`pt-2 pb-1.5 px-3`]: (!label && icon) || done,
      [`pointer-events-none`]: disabled || loading || done || error,
      [`opacity-70`]: disabled,
    }"
    @click="!disabled && !loading && !error && !done ? $emit('click') : {}"
  >
    <sp-icon
      v-if="loading"
      class="cursor-default absolute inset-0 flex justify-center items-center flex"
      icon="mdi-loading"
      size="md"
      spin
    ></sp-icon>
    <span
      :class="{
        ['opacity-30']: disabled || loading,
        ['select-none']: disabled || loading || done || error,
      }"
    >
      <sp-icon
        v-if="icon || done || error"
        :icon="error ? 'mdi-alert-circle' : done ? 'mdi-check' : icon"
        :size="(label || error) && !done ? 'xs' : 'sm'"
        :class="{
          ['-ml-1 mr-1']: (label || error) && !done,
        }"
      ></sp-icon>
      <span v-if="(label || error) && !done">{{ error ? 'Error' : label }}</span>
    </span>
  </button>
</template>

<script>
import SpIcon from '~/components/Utils/sp-icon'

export default {
  name: 'SpBtn',
  components: { SpIcon },
  props: {
    /**
     * The size of the button
     * @values primary, secondary, tertiary, warning, danger
     */
    type: {
      type: String,
      validator: (val) => ['primary', 'secondary', 'tertiary', 'warning', 'danger'].includes(val),
      default: 'primary',
    },
    label: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    done: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.sp-btn-primary {
  @apply bg-blue-500 text-white text-sm transition;
  @apply hover:duration-200 transform hover:-translate-y-0.5 hover:shadow-md;
  @apply active:duration-100 active:bg-blue-400;
}
.sp-btn-danger {
  @apply bg-red-500 text-white text-sm transition;
  @apply hover:duration-200 transform hover:-translate-y-0.5 hover:shadow-md;
  @apply active:duration-100 active:bg-red-400;
}
.sp-btn-secondary {
  @apply bg-blue-100 text-sm text-blue-500 transition;
  @apply hover:duration-200 hover:bg-blue-200;
  @apply active:duration-100 transform active:scale-95;
}
.sp-btn-warning {
  @apply bg-red-100 text-sm text-red-500 transition;
  @apply hover:duration-200 hover:bg-red-200;
  @apply active:duration-100 transform active:scale-95;
}
.sp-btn-tertiary {
  @apply text-sm text-blue-600 transition;
  @apply hover:duration-200 hover:bg-blue-50;
  @apply active:duration-100 transform active:scale-95;
}

@keyframes sp-btn-load {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
