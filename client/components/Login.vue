<template>
  <div class="bg-white py-8 px-5 rounded-2xl shadow-lg pb-10">
    <span class="font-bold text-3xl"> Qu'en penses-tu ? </span>
    <div class="mt-10 flex flex-col space-y-4 items-center">
      <div class="flex flex-row space-x-4">
        <sp-checkbox v-model="label" label="Label"></sp-checkbox>
        <sp-checkbox v-model="icon" label="Icon"></sp-checkbox>
      </div>
      <div class="flex flex-row space-x-4">
        <sp-checkbox v-model="disabled" label="Disabled"></sp-checkbox>
        <sp-checkbox v-model="loading" label="Loading"></sp-checkbox>
      </div>
      <div class="flex flex-row space-x-4">
        <sp-checkbox v-model="done" label="Done"></sp-checkbox>
        <sp-checkbox v-model="error" label="Error"></sp-checkbox>
      </div>

      <sp-btn
        v-for="(type, i) of ['Primary', 'Secondary', 'Tertiary', 'Warning', 'Danger']"
        :key="i"
        :type="type.toLowerCase()"
        :label="label ? type : null"
        :icon="icon ? 'mdi-shield' : null"
        :disabled="disabled"
        :loading="loading"
        :done="done"
        :error="error"
        @click="test"
      ></sp-btn>
    </div>
    <!--    <form class="mt-8 space-y-2 flex flex-col" action="#" method="POST">-->
    <!--      <sp-input v-model="email" label="Email address" type="email" rules></sp-input>-->
    <!--      <sp-input v-model="password" label="Password" type="password"></sp-input>-->
    <!--      <sp-checkbox v-model="remember" label="Remember me"></sp-checkbox>-->
    <!--      <sp-button class="self-end" flat text-color="white">Log in</sp-button>-->
    <!--      <sp-button type=""></sp-button>-->
    <!--      <sp-button-->
    <!--        icon="mdi-arrow-left"-->
    <!--        transparent-->
    <!--        text-color="black"-->
    <!--        class="my-2"-->
    <!--        @click="show = 'menu'"-->
    <!--      ></sp-button>-->
    <!--    </form>-->

    <!--    <div class="mt-10">-->
    <!--      <div class="flex items-center justify-between">-->
    <!--        <div class="flex items-center"></div>-->

    <!--        <div class="text-sm">-->
    <!--          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">-->
    <!--            Forgot your password?-->
    <!--          </a>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import SpCheckbox from '~/components/Utils/sp-checkbox'
import SpBtn from '~/components/Utils/sp-button'

export default {
  name: 'Login',
  components: { SpCheckbox, SpBtn },
  data() {
    return {
      email: '',
      password: '',
      remember: false,
      label: false,
      icon: false,
      disabled: false,
      loading: false,
      done: false,
      error: false,
    }
  },
  methods: {
    test() {
      console.log('Click')
    },
  },
}
</script>

<style scoped></style>
