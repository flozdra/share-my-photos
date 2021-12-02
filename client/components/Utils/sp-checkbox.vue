<template>
  <div
    class="flex items-center group cursor-pointer sp-checkbox"
    @click="$emit('change', !checked)"
  >
    <input v-model="inputValue" name="label" type="checkbox" class="h-4 w-4" />
    <div
      class="relative w-5 h-5 transition duration-150"
      :class="{ ['shadow-lg']: checked }"
    >
      <span
        class="
          absolute
          inset-0
          rounded-md
          bg-gray-50
          border-2 border-gray-200
          transition
          duration-150
          group-hover:bg-gray-200
        "
      ></span>
      <span
        class="absolute inset-0 rounded-md bg-blue-600 transition duration-150 transform scale-0"
        :class="{
          ['scale-100']: checked,
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          style="fill: white"
        >
          <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
        </svg>
      </span>
    </div>
    <label class="ml-2 block text-xs text-gray-900 select-none cursor-pointer"> {{ label }} </label>
  </div>
</template>

<script>
import SpIcon from '~/components/Utils/sp-icon'
export default {
  name: 'SpCheckbox',
  components: { SpIcon },
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    inputValue() {
      return this.checked
    },
  },
}
</script>

<style scoped>
.sp-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.sp-checkmark {
  height: 25px;
  width: 25px;
  background-color: #eee;
}
</style>
