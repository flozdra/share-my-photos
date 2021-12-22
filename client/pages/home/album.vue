<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-baseline flex-column flex-sm-row">
        <span class="text-h5 font-weight-black mr-3">{{ album.name }}</span>
        <span class="text--secondary text-caption">
          {{ `${photos.length} photos` }}
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <v-sheet min-height="70vh" rounded="lg" class="overflow-auto pa-2">
          <ListPhotos :album="album" :photos="photos" @upload-photos="dialog = true"></ListPhotos>
        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog v-if="dialog" v-model="dialog" max-width="350">
      <UploadPhotos :album="album" @close="closeDialog"></UploadPhotos>
    </v-dialog>
  </v-container>
</template>

<script>
import ListPhotos from '@/components/Photo/ListPhotos'
import UploadPhotos from '@/components/Photo/UploadPhotos'
export default {
  name: 'AlbumPage',
  components: { UploadPhotos, ListPhotos },
  layout: 'default',
  async asyncData({ params, $axios, error }) {
    try {
      const album = await $axios.get(`/api/organisations/${params.org_id}/albums/${params.alb_id}`)
      const photos = await $axios.get(`/api/albums/${params.alb_id}/photos`)
      return { album: album.data, photos: photos.data }
    } catch (e) {
      return error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      album: {},
      photos: [],
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
