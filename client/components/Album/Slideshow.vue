<template>
  <v-container>
    <v-btn @click='changeImagePrevious'>Previous</v-btn>
    <v-btn @click='changeImageNext'>Next</v-btn>
    <v-container>
      <v-row v-if='photos.length>0'>
        <v-col class='py-0'>
          <v-sheet rounded='lg' class='overflow-auto'>
            <PhotoView :album='album' :photo='photos[currentIndex]'></PhotoView>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <span>You have no photos in this album.</span>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>

import { io } from 'socket.io-client'
import PhotoView from '~/components/Photo/PhotoView'


export default {
  name: 'SlideShow',
  components: { PhotoView },
  props: {
    album: {
      type: Object,
      default: null,
    },
    photos: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      socket: null,
      imgSize: 100,
      currentIndex: 0,
    }
  },
  mounted() {
    this.socket = io('http://localhost:3333')
    this.socket.emit('create', { room: this.$route.path, user: this.$auth.user })
    this.socket.on('imageChangeClient', (message) => {
      this.currentIndex = this.photos.findIndex((photo) => photo.id === message.photo.id)
    })
    this.socket.on('connectToRoom', (message) => {
      this.socket.emit('imageChangeServer', { photo: this.photos[this.currentIndex] })
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

<style scoped>

</style>
