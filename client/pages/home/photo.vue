<template>
  <v-container>
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
