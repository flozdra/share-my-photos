<template>
  <div class="bg-gray-200 h-screen w-full sm:grid sm:grid-cols-2">
    <div
      style="background-image: url('/home-bg.svg')"
      :class="{ [`h-2/4`]: show === 'menu', [`h-1/4`]: show !== 'menu' }"
      class="sm:h-screen bg-cover bg-right-bottom flex flex-wrap flex-col content-center justify-center transition-h duration-300 ease-in-out"
    >
      <span class="mt-2 px-3 font-black text-4xl sm:text-5xl text-center"> Share my photos </span>
      <span class="mt-2 px-6 text-sm text-center inline-block">
        Watch your photos with your friends and family.
      </span>
    </div>
    <div class="relative flex flex-col flex-wrap content-center justify-center p-5">
      <div v-show="show === 'menu'" class="flex flex-col justify-center">
        <v-card @click="show = 'login'">
          <v-img
            src="/login-icon.svg"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title>Login</v-card-title>
            <v-card-subtitle>Log in the application to start sharing your photos.</v-card-subtitle>
          </v-img>
        </v-card>

        <v-card @click="show = 'register'">
          <v-img
            src="/register-icon.svg"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title>Register</v-card-title>
            <v-card-subtitle>Don't have an account yet ? Join the community.</v-card-subtitle>
          </v-img>
        </v-card>
      </div>

      <div v-show="show !== 'menu'" class="w-full sm:w-72 md:w-80 xl:w-96 flex flex-col gap-4">
        <sp-btn
          type="tertiary"
          icon="mdi-arrow-left"
          class="self-start"
          @click="show = 'menu'"
        ></sp-btn>

        <Login v-show="show === 'login'"></Login>
        <Register v-show="show === 'register'"></Register>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '~/components/Login'
import Register from '~/components/Register'

export default {
  name: 'IndexPageBla',
  auth: 'guest',
  components: { Login, Register },
  layout: 'empty',
  data() {
    return {
      show: 'menu', // enum('menu', 'login', 'register')
    }
  },
}
</script>

<style scoped></style>
