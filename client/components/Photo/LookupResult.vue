<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-baseline justify-end">
        <span class="text-body-1 mr-2">
          {{ 'Result for ' + $route.params.search }}
        </span>
        <span class="text--secondary text-caption">
          {{ `${photoCount} photos` }}
        </span>
        <v-spacer></v-spacer>
        <div
          v-if="$vuetify.breakpoint.smAndUp"
          class="align-self-end align-self-sm-baseline"
          :style="`width: 200px`"
        >
          <v-slider
            v-model="imgSize"
            min="50"
            max="300"
            step="10"
            dense
            color="primary"
            hide-details
            class="align-center"
          >
            <template #prepend>
              <v-icon small color="primary" @click="imgSize -= 10">mdi-image</v-icon>
            </template>
            <template #append>
              <v-icon color="primary" @click="imgSize += 10">mdi-image</v-icon>
            </template>
          </v-slider>
        </div>
      </v-col>
    </v-row>

    <div v-for="org of result" :key="'org' + org.id">
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col class="d-flex align-baseline">
          <span class="font-weight-bold text-h6">{{ org.name }}</span>
          <v-spacer></v-spacer>
          <span class="text-caption text--secondary">Organisation</span>
        </v-col>
      </v-row>

      <div v-for="album of org.albums" :key="'alb' + album.id">
        <v-divider class="mt-4 mb-2"></v-divider>
        <v-row>
          <v-col class="d-flex align-baseline">
            <span class="font-weight-bold text-subtitle-1">{{ album.name }}</span>
            <v-spacer></v-spacer>
            <span class="text-caption text--secondary">Album</span>
          </v-col>
        </v-row>

        <v-row class="mt-0">
          <v-col v-for="photo in album.photos" :key="'photo' + photo.id" class="flex-grow-0">
            <router-link
              :to="{ path: `/home/organisations/${org.id}/albums/${album.id}/photos/${photo.id}` }"
            >
              <v-img
                :src="getPhotoUrl(album, photo)"
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
    </div>

    <v-row v-if="result.length === 0">
      <v-col>
        <span>No photo was found.</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DateTime } from 'luxon'
export default {
  name: 'LookupResult',
  props: {
    result: {
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
    photoCount() {
      let count = 0
      for (const org of this.result) {
        for (const album of org.albums) {
          count += album.photos.length
        }
      }
      return count
    },
  },
  methods: {
    formatDate(date) {
      return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    },
    getPhotoUrl(album, photo) {
      return `${this.$config.backendHost}:${this.$config.backendPort}${this.$config.backendPathRewrite}albums/${album.id}/photos/${photo.id}`
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
