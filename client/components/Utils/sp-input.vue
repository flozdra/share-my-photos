<template>
  <div>
    <div
      class="z-0 px-1 text-xs text-gray-500 transition-all duration-300"
      :class="{ ['transform translate-y-6']: field === '' }"
    >
      <span>{{ label }}</span>
    </div>
    <input
      :value="field"
      :name="type"
      :type="type"
      :autocomplete="type"
      :required="isRequired"
      :placeholder="placeholder"
      class="
        appearance-none
        text-sm
        rounded-xl
        relative
        block
        w-full
        px-3
        py-2
        border border-gray-300
        placeholder-gray-500
        text-gray-900
        z-10
      "
      @input="$emit('input', $event.target.value)"
    />
    <div
      class="z-0 px-1 text-xs text-red-600 transition-all duration-300"
      :class="{ ['transform -translate-y-6']: !validField && field !== '' }"
    >
      <span>{{ 'Invalid email' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpInput',
  model: {
    prop: 'field',
    event: 'input',
  },
  props: {
    field: {
      type: String,
      default: '',
    },
    type: {
      type: String, // enum('email', 'password')
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      regex: {
        email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/,
        password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[()#?!@$%^&*+\-_]).{8,}$/,
      },
    }
  },
  computed: {
    validField() {
      return this.regex[this.type]?.test(this.field) || true
    },
    isRequired() {
      return this.required || ['email', 'password'].includes(this.type)
    },
  },
}
</script>

<style scoped></style>
