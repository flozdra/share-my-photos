<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row class="fill-height ma-0">
      <v-col
        cols="12"
        md="6"
        :class="{
          'fill-height': $vuetify.breakpoint.mdAndUp,
        }"
        class="justify-center d-flex align-center"
        style="
          background-image: url('/home-bg.svg');
          background-size: cover;
          background-position: bottom right;
        "
        :style="{
          'height: 200px': $vuetify.breakpoint.smAndDown,
        }"
      >
        <div class="text-center">
          <span class="text-h4 text-sm-h3 font-weight-black black--text">Share my photos</span>
          <br />
          <span class="d-block mt-2 text-subtitle-1 black--text">
            Watch your photos with your friends and family.
          </span>
        </div>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-self-md-center justify-center">
        <div v-if="show === 'menu'" class="d-flex flex-column align-center">
          <v-hover>
            <template #default="{ hover }">
              <v-card
                :elevation="hover ? 24 : 3"
                class="my-3 transition-swing"
                max-width="400"
                @click="show = 'login'"
              >
                <v-list-item>
                  <v-list-item-avatar size="100">
                    <v-img src="/login-icon.svg" alt="login-img"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="text-h5 font-weight-bold">Login</v-list-item-title>
                    <v-list-item-subtitle style="white-space: normal">
                      Log in the application to start sharing your photos.
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </template>
          </v-hover>

          <v-hover>
            <template #default="{ hover }">
              <v-card
                :elevation="hover ? 24 : 3"
                class="my-3 transition-swing"
                max-width="400"
                @click="show = 'register'"
              >
                <v-list-item>
                  <v-list-item-avatar size="100">
                    <v-img src="/register-icon.svg" alt="login-img"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="text-h5 font-weight-bold">Register</v-list-item-title>
                    <v-list-item-subtitle style="white-space: normal">
                      Don't have an account yet ? Join the community.
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </template>
          </v-hover>
        </div>

        <div v-else class="d-flex flex-column align-center">
          <v-btn icon class="black--text align-self-start mb-3" large @click="show = 'menu'">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <Login v-show="show === 'login'"></Login>
          <Register v-show="show === 'register'"></Register>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from '~/components/Login'
import Register from '~/components/Register'

export default {
  name: 'IndexPage',
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
