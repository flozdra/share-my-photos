<template>
  <v-app id="share-my-photos-app">
    <v-app-bar app color="white" flat>
      <v-container v-if="$vuetify.breakpoint.smAndUp" class="py-0 fill-height">
        <v-avatar class="mr-5" color="primary" size="32"></v-avatar>

        <span class="font-weight-bold">Share my photos</span>

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

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
