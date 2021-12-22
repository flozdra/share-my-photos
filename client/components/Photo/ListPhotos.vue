<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn
          :color="album.color"
          :class="getTextColor(album.color)"
          @click="$emit('upload-photos')"
        >
          <v-icon left>mdi-cloud-upload</v-icon>
          Upload
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(photo, i) in photos" :key="i">
        <v-img :src="getPhotoUrl(photo)" contain :width="imgSize" :height="imgSize"></v-img>
      </v-col>
      <v-col v-if="photos.length === 0" cols="12">
        <span>You have no photos in this album.</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ListPhotos',
  props: {
    album: {
      type: Object,
      default: null,
    },
    photos: {
      type: Array,
      default: () => [],
    },
    imgSize: {
      type: Number,
      default: 60,
    },
  },
  methods: {
    getPhotoUrl(photo) {
      return `http://localhost:3000/api/albums/${this.album.id}/photos/${photo.id}`
    },
    // getDescription(alb) {
    //   const plural = (v) => (v > 1 ? 's' : '')
    //   return `TODO ${alb.photo_count} photo${plural(alb.photo_count)}`
    // },
    // getUserAvatars(org) {
    //   const colors = ['#a11a5c', '#6f0b86', '#0f4ebb', '#14933a']
    //
    //   return org.users
    //     .map((u) => {
    //       return {
    //         initials: u.firstname[0] + u.lastname[0],
    //         color: colors[u.firstname[0].charCodeAt(0) % colors.length],
    //       }
    //     })
    //     .slice(0, 3)
    // },
    getTextColor(bgColor = '#ffffffff') {
      const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor
      const r = parseInt(color.substring(0, 2), 16) // hexToR
      const g = parseInt(color.substring(2, 4), 16) // hexToG
      const b = parseInt(color.substring(4, 6), 16) // hexToB
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'black--text' : 'white--text'
    },
    // editAlbum(e, alb) {
    //   e.stopPropagation()
    //   this.$emit('edit-album', alb)
    // },
  },
}
</script>

<style scoped>
.org-card {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(255, 255, 255, 0) 60%);
}
</style>
