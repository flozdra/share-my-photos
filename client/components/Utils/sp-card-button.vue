<template>
  <div
    class="
      relative
      group
      cursor-pointer
      hover:transition
      duration-300
      ease-in-out
      transform
      hover:scale-105
      active:opacity-75
    "
    @click="$emit('click')"
  >
    <div
      :class="`
        absolute
        inset-0
        bg-${color}
        shadow-lg
        transition
        duration-300
        ease-in-out
        transform
        scale-x-100
        -rotate-3
        rounded-3xl
        group-hover:-rotate-6`"
    ></div>
    <div class="relative grid grid-cols-3 bg-white rounded-3xl">
      <div class="col-span-1">
        <img :src="img" alt="card-button-image" class="p-3 object-contain" />
      </div>
      <div class="col-span-2 flex flex-wrap content-center">
        <span class="font-bold text-xl sm:text-3xl">{{ title }}</span>
        <span class="text-xs sm:text-sm">{{ text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpCardButton',
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'blue-400',
    },
  },
}
</script>

<style scoped></style>
