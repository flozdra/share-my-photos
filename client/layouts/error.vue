<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col class="py-10 text-h5 text-center font-weight-black">
          {{ error && error.statusCode === 404 ? 'Page not found' : 'Internal server error' }}
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'ErrorLayout',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped></style>
