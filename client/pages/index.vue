<template>
  <div class="bg-gray-200 h-screen w-full sm:grid sm:grid-cols-2">
    <div
      style="background-image: url('/home-bg.svg')"
      :class="{ [`h-2/4`]: show === 'menu', [`h-1/4`]: show !== 'menu' }"
      class="
        sm:h-screen
        bg-cover bg-right-bottom
        flex flex-wrap flex-col
        content-center
        justify-center
        transition-h
        duration-500
        ease-in-out
      "
    >
      <span class="mt-2 px-3 font-black text-4xl sm:text-5xl text-center"> Share my photos </span>
      <span class="mt-2 px-6 text-sm text-center inline-block">
        Watch your photos with your friends and family.
      </span>
    </div>
    <div class="flex flex-col flex-wrap content-center justify-center px-8">
      <div v-show="show === 'login'">
        <sp-button
          icon="mdi-arrow-left"
          transparent
          text-color="black"
          class="my-2"
          @click="show = 'menu'"
        ></sp-button>

        <Login></Login>
      </div>
      <div v-show="show === 'register'">
        <!--        <vs-button transparent size="l" @click="show = 'menu'">-->
        <!--          <i class="bx bx-left-arrow-alt bx-sm"></i>-->
        <!--        </vs-button>-->

        <Login></Login>
      </div>
      <div v-show="show === 'menu'">
        <sp-card-button
          class="max-w-64 sm:max-w-72 md:max-w-96 my-8"
          title="Login"
          text="Log in the application to start sharing your photos."
          img="/login-icon.svg"
          @click="show = 'login'"
        ></sp-card-button>
        <sp-card-button
          class="max-w-64 sm:max-w-72 md:max-w-96 my-8"
          title="Register"
          text="Don't have an account yet ? Join the community."
          img="/register-icon.svg"
          color="green-400"
          @click="show = 'register'"
        ></sp-card-button>
      </div>
    </div>
  </div>
</template>

<script>
import SpCardButton from '~/components/Utils/sp-card-button'
import SpButton from '~/components/Utils/sp-button'
export default {
  name: 'Index',
  layout: 'empty',
  components: { SpCardButton, SpButton },
  data() {
    return {
      show: 'menu', // enum('menu', 'login', 'register')
    }
  },
}
</script>

<style scoped></style>
