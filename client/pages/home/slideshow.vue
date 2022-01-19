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
        <span class="text-h5 font-weight-black mr-3">Slideshow</span>
        <span class="text-h6 font-weight-light mr-3">{{ album.name }}</span>
        <span v-if="$vuetify.breakpoint.smAndUp" class="text--secondary text-caption">
          {{ `${album.photos.length} photos` }}
        </span>
        <v-spacer></v-spacer>
        <div v-if="$vuetify.breakpoint.smAndUp">
          <v-btn text outlined small class="mr-3" @click="changeImagePrevious">Previous</v-btn>
          <v-btn text outlined small @click="changeImageNext">Next</v-btn>
        </div>
      </v-col>
      <v-col v-if="$vuetify.breakpoint.xsOnly" cols="12" class="d-flex align-baseline pt-0">
        <div>
          <v-btn text outlined small class="mr-3" @click="changeImagePrevious">Previous</v-btn>
          <v-btn text outlined small @click="changeImageNext">Next</v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="py-0">
        <v-sheet rounded="lg" class="overflow-auto">
          <ClientOnly v-if="photos.length > 0">
            <PhotoView
              :album="album"
              :photo="photos[currentIndex]"
              @posted-comment="socket.emit('refresh')"
            ></PhotoView>
          </ClientOnly>

          <v-container v-else>
            <v-row>
              <v-col>
                <span>You have no photos in this album.</span>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { io } from 'socket.io-client'
import PhotoView from '@/components/Photo/PhotoView'

export default {
  name: 'SlideshowPage',
  components: { PhotoView },
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
      socket: null,
      currentIndex: 0,
    }
  },

  mounted() {
    this.socket = io.connect(`${this.$config.backendHost}:${this.$config.backendPort}`, {
      path: `${this.$config.backendPathRewrite}socket.io`,
    })

    this.socket.emit('create', { room: this.$route.path, user: this.$auth.user })
    this.socket.on('imageChangeClient', (message) => {
      this.currentIndex = this.photos.findIndex((photo) => photo.id === message.photo.id)
    })
    this.socket.on('connectToRoom', () => {
      this.socket.emit('imageChangeServer', { photo: this.photos[this.currentIndex] })
    })
    this.socket.on('refresh', () => {
      this.$nuxt.refresh()
    })
  },
  methods: {
    changeImagePrevious() {
      if (this.currentIndex === 0) {
        this.currentIndex = this.photos.length - 1
      } else {
        this.currentIndex--
      }
      this.socket.emit('imageChangeServer', { photo: this.photos[this.currentIndex] })
    },
    changeImageNext() {
      if (this.currentIndex === this.photos.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
      this.socket.emit('imageChangeServer', { photo: this.photos[this.currentIndex] })
    },
  },
}
</script>

<style scoped></style>
