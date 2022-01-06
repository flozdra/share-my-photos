<template>
  <v-app id="share-my-photos-app">
    <v-app-bar app color="#03224A" flat>
      <v-container class="py-0 fill-height">
        <nuxt-link to="/home" style="text-decoration: none; color: inherit">
          <div class="d-flex align-center">
            <v-img
              src="/share-my-photo-logo-light.svg"
              :width="$vuetify.breakpoint.smAndDown ? 40 : 40"
              contain
            />
            <span class="ml-3 font-weight-bold white--text">Share my photos</span>
          </div>
        </nuxt-link>

        <v-spacer></v-spacer>

        <v-responsive v-if="$vuetify.breakpoint.smAndUp" max-width="260">
          <v-text-field
            v-model="search"
            class="text-caption"
            rounded
            placeholder="Search album, photo, ..."
            hide-details
            background-color="shade"
            @keydown.enter="lookup"
          ></v-text-field>
        </v-responsive>

        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-avatar
              :color="$auth.user.color"
              size="32"
              class="ml-4 my-1"
              v-bind="attrs"
              v-on="on"
            >
              <span class="white--text text-body-2">{{ $auth.user.initials }}</span>
            </v-avatar>
          </template>
          <v-card width="180">
            <v-card-title class="pa-0 shade">
              <v-avatar
                :color="$auth.user.color"
                size="40"
                class="mt-3 mx-auto mb-n5"
                style="border: solid 2px white"
              >
                <span class="white--text text-body-2">{{ $auth.user.initials }}</span>
              </v-avatar>
            </v-card-title>
            <div class="mt-5 px-3 text-center d-flex flex-column">
              <span class="text-caption font-weight-medium">
                {{ $auth.user.fullName }}
              </span>
              <span class="text--secondary" style="font-size: 10px">
                {{ $auth.user.email }}
              </span>
            </div>
            <v-card-actions class="d-flex justify-center">
              <v-btn x-small text color="error" @click="logout">Logout</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="11" lg="10">
            <nuxt></nuxt>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      search: '',
      links: ['Dashboard'],
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },

    async lookup() {
      await this.$router.push(`/home/lookup/${this.search}`)
    },
  },
}
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 6px;
  height: 4px;
}

/* Track */
::-webkit-scrollbar-track {
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #bdc2c9;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #9ba2ab;
}
</style>
