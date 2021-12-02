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
      select-none
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
    <div class="relative bg-white rounded-3xl flex justify-start items-center">
      <div class="flex-none w-24 sm:w-32 relative">
        <img :src="img" alt="card-button-image" class="p-3 object-contain" />
      </div>
      <div class="p-3 flex flex-col justify-center align-middle">
        <span class="font-bold text-xl sm:text-2xl">{{ title }}</span>
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
