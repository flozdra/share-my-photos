<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-baseline">
        <v-btn
          icon
          small
          color="transparent"
          class="mr-4"
          :to="`/home/organisations/${$route.params.org_id}/albums/${$route.params.alb_id}`"
        >
          <v-icon color="black">mdi-arrow-left</v-icon>
        </v-btn>
        <span class="text-h5 font-weight-black mr-3">{{ album.name }}</span>
        <span class="text--secondary text-caption">
          {{ `${album.photos.length} photos` }}
        </span>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="py-0">
        <v-sheet rounded="lg" class="overflow-auto">
          <PhotoView :album="album" :photo="photo"></PhotoView>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PhotoView from '@/components/Photo/PhotoView'
export default {
  name: 'PhotoPage',
  components: { PhotoView },
  layout: 'default',
  async asyncData({ params, $axios, error }) {
    try {
      const album = await $axios.get(`/api/organisations/${params.org_id}/albums/${params.alb_id}`)
      const photo = await $axios.get(`/api/albums/${params.alb_id}/photos/${params.photo_id}`)
      return { album: album.data, photo: photo.data }
    } catch (e) {
      return error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      album: {},
      photo: {},
      dialog: false,
    }
  },
  methods: {
    async closeDialog(refresh) {
      this.dialog = false
      if (refresh) await this.$nuxt.refresh()
    },
  },
}
</script>

<style scoped></style>
