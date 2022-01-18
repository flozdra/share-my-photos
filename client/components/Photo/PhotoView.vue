<template>
  <v-container fluid>
    <v-row v-if="$vuetify.breakpoint.xs">
      <v-col cols="12" class="py-2">
        <div class="d-flex align-center">
          <v-avatar :color="photo.user.color" size="30" class="my-1">
            <span class="white--text text-body-2">{{ photo.user.initials }}</span>
          </v-avatar>
          <span class="font-weight-medium text-body-2 ml-2">
            {{ photo.user.fullName }}
          </span>
          <v-spacer></v-spacer>
          <v-icon @click="dialog = true">mdi-pencil</v-icon>
        </div>
      </v-col>
      <v-col cols="12" class="black pa-0">
        <v-img :src="photoUrl" max-height="250" contain>
          <template #placeholder>
            <div class="d-flex fill-height align-center justify-center">
              <v-progress-circular indeterminate color="secondary" size="60"></v-progress-circular>
            </div>
          </template>
        </v-img>
      </v-col>
      <v-col
        class="pa-0 d-flex flex-column"
        :style="`max-height: ${$vuetify.breakpoint.xs ? undefined : 500}px`"
      >
        <v-divider></v-divider>

        <div class="ma-2 px-2">
          <span class="text-body-2">
            {{ photo.description }}
          </span>
          <v-chip-group column>
            <v-chip v-for="tag in photo.tags" :key="tag" small active-class="null">
              {{ tag }}
            </v-chip>
          </v-chip-group>
          <span class="text-caption text--secondary">
            {{ formattedDate }}
          </span>
        </div>
        <v-divider></v-divider>

        <div class="ma-2 px-2">
          <span class="text-caption text--secondary">Comments</span>
        </div>
        <div
          class="flex-grow-1 overflow-auto"
          :style="`max-height: ${$vuetify.breakpoint.xs ? 150 : undefined}px`"
        >
          <div v-for="(comm, i) of photo.comments" :key="i" class="ma-2 px-2 d-flex">
            <v-avatar :color="comm.user.color" size="26" class="my-1">
              <span class="white--text text-caption">{{ comm.user.initials }}</span>
            </v-avatar>
            <div class="ml-2 d-flex flex-column">
              <span class="text-caption">
                <span class="font-weight-bold mr-1">
                  {{ comm.user.fullName }}
                </span>
                {{ comm.text }}
              </span>
              <span class="text--secondary" style="font-size: 10px">
                {{ formatDate(comm.creation) }}
              </span>
            </div>
          </div>

          <span v-if="photo.comments.length === 0" class="mx-2 px-2 text-caption">
            There are no comments.
          </span>
        </div>

        <v-divider></v-divider>

        <div class="ma-2 px-2 d-flex align-end">
          <v-text-field
            v-model="comment"
            class="text-body-2 pa-0 my-1 align-center"
            hide-details
            persistent-placeholder
            :readonly="loading"
            placeholder="Add a comment"
            @keydown.enter="postComment"
          >
            <template #prepend>
              <v-icon size="18">mdi-comment-processing</v-icon>
            </template>
          </v-text-field>
          <v-btn
            small
            :disabled="!comment"
            :loading="loading"
            color="primary"
            class="ml-2"
            @click="postComment"
          >
            Post
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="black pa-0 d-flex align-center">
        <v-img :src="photoUrl" :height="photoSize" :width="photoSize" contain>
          <template #placeholder>
            <div class="d-flex fill-height align-center justify-center">
              <v-progress-circular indeterminate color="secondary" size="60"></v-progress-circular>
            </div>
          </template>
        </v-img>
      </v-col>
      <v-col class="pa-0 d-flex flex-column" :style="`height: ${photoSize}px`">
        <div class="ma-2 px-2 d-flex align-center">
          <v-avatar :color="photo.user.color" size="30" class="my-1">
            <span class="white--text text-body-2">{{ photo.user.initials }}</span>
          </v-avatar>
          <span class="font-weight-medium text-body-2 ml-2">
            {{ photo.user.fullName }}
          </span>
          <v-spacer></v-spacer>
          <v-icon @click="dialog = true">mdi-pencil</v-icon>
        </div>
        <v-divider></v-divider>

        <div class="ma-2 px-2">
          <span class="text-body-2">
            {{ photo.description }}
          </span>
          <v-chip-group column>
            <v-chip v-for="tag in photo.tags" :key="tag" small active-class="null">
              {{ tag }}
            </v-chip>
          </v-chip-group>
          <span class="text-caption text--secondary">
            {{ formattedDate }}
          </span>
        </div>
        <v-divider></v-divider>

        <div class="ma-2 px-2">
          <span class="text-caption text--secondary">Comments</span>
        </div>
        <div class="flex-grow-1 overflow-auto">
          <div v-for="(comm, i) of photo.comments" :key="i" class="ma-2 px-2 d-flex">
            <v-avatar :color="comm.user.color" size="26" class="my-1">
              <span class="white--text text-caption">{{ comm.user.initials }}</span>
            </v-avatar>
            <div class="ml-2 d-flex flex-column">
              <span class="text-caption">
                <span class="font-weight-bold mr-1">
                  {{ comm.user.fullName }}
                </span>
                {{ comm.text }}
              </span>
              <span class="text--secondary" style="font-size: 10px">
                {{ formatDate(comm.creation) }}
              </span>
            </div>
          </div>

          <span v-if="photo.comments.length === 0" class="mx-2 px-2 text-caption">
            There are no comments.
          </span>
        </div>
        <v-divider></v-divider>

        <div class="ma-2 px-2 d-flex align-b">
          <v-text-field
            v-model="comment"
            class="text-body-2 pa-0 my-1 align-center"
            hide-details
            persistent-placeholder
            :readonly="loading"
            placeholder="Add a comment"
            @keydown.enter="postComment"
          >
            <template #prepend>
              <v-icon size="18">mdi-comment-processing</v-icon>
            </template>
          </v-text-field>
          <v-btn
            small
            :disabled="!comment"
            :loading="loading"
            color="primary"
            class="ml-2"
            @click="postComment"
          >
            Post
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-if="dialog" v-model="dialog" max-width="350">
      <EditPhoto :album="album" :photo="photo" @close="closeDialog"></EditPhoto>
    </v-dialog>
  </v-container>
</template>

<script>
import { DateTime } from 'luxon'
import EditPhoto from '@/components/Photo/EditPhoto'

export default {
  name: 'PhotoView',
  components: { EditPhoto },
  props: {
    album: {
      type: Object,
      default: null,
    },
    photo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      comment: '',
      loading: false,
      dialog: false,
    }
  },
  computed: {
    photoUrl() {
      return `${this.$config.backendHost}:${this.$config.backendPort}${this.$config.backendPathRewrite}albums/${this.album.id}/photos/${this.photo.id}`
    },
    formattedDate() {
      return DateTime.fromISO(this.photo.creation).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    },
    photoSize() {
      return this.$vuetify.breakpoint.sm ? 400 : this.$vuetify.breakpoint.md ? 500 : 600
    },
  },
  methods: {
    async closeDialog(refresh, deleted) {
      this.dialog = false
      if (deleted) {
        this.$router.go(-1)
      }
      if (refresh) await this.$nuxt.refresh()
    },

    async postComment() {
      this.loading = true
      try {
        if (this.comment.trim() === '') return

        await this.$axios.post(`/api/photos/${this.photo.id}/comments`, {
          text: this.comment,
        })
        this.comment = ''
        await this.$nuxt.refresh()
        this.$emit('posted-comment')
      } catch {}
      this.loading = false
    },
    formatDate(date) {
      return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)
    },
  },
}
</script>

<style scoped></style>
