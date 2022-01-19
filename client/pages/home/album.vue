<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-baseline">
        <v-btn
          icon
          small
          color="transparent"
          class="mr-4"
          :to="`/home/organisations/${$route.params.org_id}`"
        >
          <v-icon color="black">mdi-arrow-left</v-icon>
        </v-btn>
        <span class="text-h5 font-weight-black mr-3">{{ album.name }}</span>
        <span class="text--secondary text-caption">
          {{ `${photos.length} photos` }}
        </span>
        <v-spacer />
        <v-btn
          small
          :color="album.color"
          :class="getTextColor(album.color)"
          :to="{ path: 'slideshow' }"
          append
        >
          Slideshow
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="py-0">
        <v-sheet min-height="70vh" rounded="lg" class="overflow-auto pa-2">
          <ClientOnly>
            <ListPhotos :album="album" :photos="photos" @upload-photos="dialog = true"></ListPhotos>
          </ClientOnly>
        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog v-if="dialog" v-model="dialog" max-width="350">
      <UploadPhotos :album="album" @close="closeDialog"></UploadPhotos>
    </v-dialog>

    <v-dialog
      v-if="photoView.dialog"
      v-model="photoView.dialog"
      width="unset"
      @click:outside="exitPhotoView"
    >
      <v-sheet rounded="lg" class="overflow-auto">
        <ClientOnly>
          <PhotoView
            :album="album"
            :photo="photos[photoView.index]"
            @close="exitPhotoView"
          ></PhotoView>
        </ClientOnly>
      </v-sheet>
    </v-dialog>
  </v-container>
</template>

<script>
import ListPhotos from '@/components/Photo/ListPhotos'
import UploadPhotos from '@/components/Photo/UploadPhotos'
import PhotoView from '@/components/Photo/PhotoView'

export default {
  name: 'AlbumPage',
  components: { PhotoView, UploadPhotos, ListPhotos },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'photo-page') {
      this.photoView.index = this.photos.findIndex((p) => +p.id === +to.params.photo_id)
      this.photoView.dialog = true
      window.history.pushState({}, null, to.path)
    } else {
      next()
    }
  },
  layout: 'default',
  async asyncData({ params, $axios, redirect, error }) {
    try {
      const album = await $axios.get(`/api/organisations/${params.org_id}/albums/${params.alb_id}`)
      const photos = await $axios.get(`/api/albums/${params.alb_id}/photos`)
      return { album: album.data, photos: photos.data }
    } catch (e) {
      if (e.response.status === 401) return redirect('/')
      return error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      album: {},
      photos: [],
      dialog: false,
      photoView: {
        dialog: false,
        photo: null,
      },
    }
  },
  methods: {
    async closeDialog(refresh) {
      this.dialog = false
      if (refresh) await this.$nuxt.refresh()
    },
    exitPhotoView() {
      this.photoView.photo = null
      this.photoView.dialog = false
      // const params = this.$route.params
      this.$router.go(-1)
    },
    getTextColor(bgColor = '#ffffffff') {
      const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor
      const r = parseInt(color.substring(0, 2), 16) // hexToR
      const g = parseInt(color.substring(2, 4), 16) // hexToG
      const b = parseInt(color.substring(4, 6), 16) // hexToB
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'black--text' : 'white--text'
    },
  },
}
</script>

<style scoped></style>
