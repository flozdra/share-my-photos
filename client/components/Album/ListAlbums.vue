<template>
  <v-container>
    <v-row>
      <v-col v-for="(alb, i) in albums" :key="i" cols="12" sm="6" md="4" lg="3">
        <v-card
          height="150"
          class="d-flex flex-column org-card"
          :color="alb.color || 'secondary'"
          :to="{ path: `albums/${alb.id}` }"
          append
        >
          <div style="position: absolute; right: 1px; top: 1px">
            <v-btn icon @click.stop.prevent="$emit('edit-album', alb)">
              <v-icon :class="getTextColor(alb.color)">mdi-dots-vertical</v-icon>
            </v-btn>
          </div>
          <v-card-title
            class="pb-0 text-subtitle-1 font-weight-bold d-inline text-truncate"
            :class="getTextColor(alb.color)"
          >
            {{ alb.name }}
          </v-card-title>
          <v-card-text class="text-caption" :class="getTextColor(alb.color)">
            {{ getDescription(alb) }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="albums.length === 0" cols="12">
        <span>You have no albums in this organisation.</span>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card height="150" class="d-flex flex-column" color="shade" @click="$emit('new-album')">
          <v-card-title class="pb-0 text-subtitle-1 font-weight-bold">
            <v-icon color="black" left>mdi-plus</v-icon>
            Add
          </v-card-title>
          <v-card-text class="text-caption">Create new album</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ListAlbums',
  props: {
    albums: {
      type: Array,
      default: () => [],
    },
  },
  created() {},
  methods: {
    getDescription(alb) {
      const plural = (v) => (v > 1 ? 's' : '')
      return `${alb.photo_count} photo${plural(alb.photo_count)}`
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
