<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn
          small
          :color="album.color"
          :class="getTextColor(album.color)"
          @click="$emit('upload-photos')"
        >
          <v-icon left>mdi-cloud-upload</v-icon>
          Upload
        </v-btn>
        <v-spacer></v-spacer>
        <div
          class="align-self-end align-self-sm-baseline"
          :style="`width: ${$vuetify.breakpoint.xs ? 140 : 200}px`"
        >
          <v-slider
            v-model="imgSize"
            min="50"
            max="300"
            step="10"
            dense
            :color="album.color"
            hide-details
            class="align-center"
          >
            <template #prepend>
              <v-icon small :color="album.color" @click="imgSize -= 10">mdi-image</v-icon>
            </template>
            <template #append>
              <v-icon :color="album.color" @click="imgSize += 10">mdi-image</v-icon>
            </template>
          </v-slider>
        </div>
      </v-col>
    </v-row>

    <div v-for="(dayPhotos, date) of groupedByDay" :key="date">
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col>
          <span class="font-weight-bold text-body-2">{{ formatDate(date) }}</span>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col v-for="(photo, i) in dayPhotos" :key="i" class="flex-grow-0">
          <router-link :to="{ path: `photos/${photo.id}` }" append>
            <v-img
              :src="getPhotoUrl(photo)"
              contain
              :height="imgSize"
              :width="imgSize"
              class="d-flex"
            >
              <template #placeholder>
                <v-skeleton-loader
                  type="image"
                  :height="imgSize"
                  :width="imgSize"
                ></v-skeleton-loader>
              </template>
            </v-img>
          </router-link>
        </v-col>
      </v-row>
    </div>

    <v-row v-if="Object.keys(groupedByDay).length === 0">
      <v-col>
        <span>You have no photos in this album.</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DateTime } from 'luxon'
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
  },
  data() {
    return {
      imgSize: 100,
    }
  },
  computed: {
    groupedByDay() {
      const ISODate = (d) => DateTime.fromISO(d).toISODate()

      return this.photos.reduce((acc, cur) => {
        acc[ISODate(cur.creation)] = [...(acc[ISODate(cur.creation)] || []), cur]
        return acc
      }, {})
    },
  },
  methods: {
    formatDate(date) {
      return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    },
    getPhotoUrl(photo) {
      return `http://${window.location.host}/api/albums/${this.album.id}/photos/${photo.id}`
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

<style scoped>
.org-card {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(255, 255, 255, 0) 60%);
}
</style>
