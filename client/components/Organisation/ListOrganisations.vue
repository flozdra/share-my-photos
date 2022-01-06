<template>
  <v-container>
    <v-row>
      <v-col v-for="(org, i) in organisations" :key="i" cols="12" sm="6" md="4" lg="3">
        <v-card
          height="150"
          class="d-flex flex-column org-card"
          :color="org.color"
          :to="{ path: `organisations/${org.id}` }"
          append
        >
          <div style="position: absolute; right: 1px; top: 1px">
            <v-btn icon @click.stop.prevent="$emit('edit-organisation', org)">
              <v-icon :class="getTextColor(org.color)">mdi-dots-vertical</v-icon>
            </v-btn>
          </div>
          <v-card-title
            class="pb-0 text-subtitle-1 font-weight-bold d-inline text-truncate"
            :class="getTextColor(org.color)"
          >
            {{ org.name }}
          </v-card-title>
          <v-card-text class="text-caption" :class="getTextColor(org.color)">
            {{ getDescription(org) }}
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-avatar
              v-for="(user, idx) in org.users.slice(0, 3)"
              :key="idx"
              class="ml-n2 elevation-2"
              :color="user.color"
              size="30"
            >
              <span class="white--text text-caption font-weight-medium">{{ user.initials }}</span>
            </v-avatar>
            <span
              v-if="org.users.length > 3"
              class="text-caption ml-2"
              :class="getTextColor(org.color)"
            >
              {{ `+${org.users.length - 3} more` }}
            </span>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col v-if="organisations.length === 0" cols="12">
        <span>You have no organization at this time.</span>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card
          height="150"
          class="d-flex flex-column"
          color="shade"
          @click="$emit('new-organisation')"
        >
          <v-card-title class="pb-0 text-subtitle-1 font-weight-bold">
            <v-icon color="black" left>mdi-plus</v-icon>
            Add
          </v-card-title>
          <v-card-text class="text-caption">Create new organisation</v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <span class="text-caption font-weight-bold ml-2">
              {{ `Invite people` }}
            </span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ListOrganisations',
  props: {
    organisations: {
      type: Array,
      default: () => [],
    },
  },
  created() {},
  methods: {
    getDescription(org) {
      const a = org.album_count
      const p = org.photo_count
      const plural = (v) => (v > 1 ? 's' : '')
      return `${a} album${plural(a)} • ${p} photo${plural(p)}`
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
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 60%);
}
</style>
