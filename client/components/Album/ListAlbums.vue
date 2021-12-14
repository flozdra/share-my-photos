<template>
  <v-container>
    <v-row v-if="albums.length > 0">
      <v-col v-for="(org, i) in albums" :key="i" cols="12" sm="4" lg="3">
        <v-card :color="org.color" @click="openOrganisation(org)">
          <v-card-title class="text-subtitle-1 font-weight-bold">{{ org.name }}</v-card-title>
          <v-card-subtitle class="text-caption">{{ getDescription(org) }}</v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-avatar
              v-for="(user, idx) in getUserAvatars(org)"
              :key="idx"
              class="ml-n2"
              :color="user.color"
              size="32"
            >
              <span class="white--text">{{ user.initials }}</span>
            </v-avatar>
            <span v-if="org.users.length > 3" class="text-caption ml-2">
              {{ `+${org.users.length - 3} more` }}
            </span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="py-8">
        <span>You have no album in this organisation.</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ListAlbums',
  data() {
    return {
      albums: [],
    }
  },
  methods: {
    getDescription(org) {
      const a = org.album_count
      const p = org.photo_count
      const plural = (v) => (v > 1 ? 's' : '')
      return `${a} album${plural(a)} • ${p} photo${plural(p)}`
    },
    getUserAvatars(org) {
      const colors = ['#a11a5c', '#6f0b86', '#0f4ebb', '#14933a']

      return org.users
        .map((u) => {
          return {
            initials: u.firstname[0] + u.lastname[0],
            color: colors[u.firstname[0].charCodeAt(0) % colors.length],
          }
        })
        .slice(0, 3)
    },
    openOrganisation(org) {
      console.log(org)
    },
  },
}
</script>

<style scoped></style>
