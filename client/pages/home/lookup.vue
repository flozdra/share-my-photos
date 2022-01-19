<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-baseline">
        <v-btn icon small color="transparent" class="mr-4" @click="$router.go(-1)">
          <v-icon color="black">mdi-arrow-left</v-icon>
        </v-btn>

        <span class="text-h5 font-weight-black mr-3">Search</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="py-0">
        <v-sheet min-height="70vh" rounded="lg" class="overflow-auto pa-2">
          <ClientOnly>
            <LookupResult :result="result"></LookupResult>
          </ClientOnly>
        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog
      v-if="photoView.dialog"
      v-model="photoView.dialog"
      width="unset"
      @click:outside="exitPhotoView"
    >
      <v-sheet rounded="lg" class="overflow-auto">
        <ClientOnly>
          <PhotoView :album="albumSelected" :photo="photoSelected"></PhotoView>
        </ClientOnly>
      </v-sheet>
    </v-dialog>
  </v-container>
</template>

<script>
import LookupResult from '@/components/Photo/LookupResult'
import PhotoView from '@/components/Photo/PhotoView'

export default {
  name: 'LookupPage',
  components: { PhotoView, LookupResult },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'photo-page') {
      for (const [orgIndex, org] of this.result.entries()) {
        for (const [albumIndex, album] of org.albums.entries()) {
          for (const [photoIndex, photo] of album.photos.entries()) {
            if (photo.id === +to.params.photo_id) {
              this.photoView.orgIndex = orgIndex
              this.photoView.albumIndex = albumIndex
              this.photoView.photoIndex = photoIndex
              this.photoView.dialog = true

              window.history.pushState({}, null, to.path)
              return
            }
          }
        }
      }
    }
    next()
  },
  layout: 'default',
  async asyncData({ params, $axios, redirect, error }) {
    try {
      const response = await $axios.get(`api/lookup/${params.search}`)
      return { result: response.data }
    } catch (e) {
      if (e.response.status === 401) return redirect('/')
      return error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      result: [],
      photoView: {
        dialog: false,
        orgIndex: null,
        albumIndex: null,
        photoIndex: null,
      },
    }
  },
  computed: {
    albumSelected() {
      return this.result[this.photoView.orgIndex]?.albums[this.photoView.albumIndex]
    },
    photoSelected() {
      return this.albumSelected?.photos[this.photoView.photoIndex]
    },
  },
  methods: {
    async closeDialog(refresh) {
      this.dialog = false
      if (refresh) await this.$nuxt.refresh()
    },
    exitPhotoView() {
      this.photoView.orgIndex = null
      this.photoView.albumIndex = null
      this.photoView.photoIndex = null
      this.photoView.dialog = false
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
