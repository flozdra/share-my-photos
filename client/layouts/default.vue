<template>
  <v-app id="share-my-photos-app">
    <v-app-bar app color="#03224A" flat>
      <v-container v-if="$vuetify.breakpoint.smAndUp" class="py-0 fill-height">
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

        <v-responsive max-width="260">
          <v-text-field
            class="text-caption"
            rounded
            placeholder="Search album, photo, ..."
            hide-details
            background-color="shade"
          ></v-text-field>
        </v-responsive>
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
      links: ['Dashboard'],
    }
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
