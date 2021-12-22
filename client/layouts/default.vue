<template>
  <v-app id="share-my-photos-app">
    <v-app-bar app color="white" flat>
      <v-container v-if="$vuetify.breakpoint.smAndUp" class="py-0 fill-height">
        <nuxt-link to="/home" style="text-decoration: none; color: inherit">
          <v-avatar class="mr-5" color="primary" size="32"></v-avatar>
          <span class="font-weight-bold">Share my photos</span>
        </nuxt-link>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field dense flat hide-details rounded solo-inverted></v-text-field>
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
