<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" class="black pa-0 align-center justify-center d-flex">
        <v-img
          :src="photoUrl"
          contain
          max-height="90vh"
          class="d-flex align-self-stretch"
          position="center"
        >
          <template #placeholder>
            <div class="d-flex fill-height align-center justify-center">
              <v-progress-circular indeterminate color="secondary" size="60"></v-progress-circular>
            </div>
          </template>
        </v-img>
      </v-col>
      <v-col cols="6" class="pa-0 d-flex flex-column">
        <div class="ma-2 px-2">
          <v-avatar :color="photo.user.color" size="30" class="my-1">
            <span class="white--text text-body-2">{{ photo.user.initials }}</span>
          </v-avatar>
          <span class="font-weight-medium text-body-2 ml-2">
            {{ photo.user.fullName }}
          </span>
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
          <div v-for="(comment, i) of photo.comments" :key="i" class="ma-2 px-2 d-flex">
            <v-avatar :color="photo.user.color" size="24" class="my-1">
              <span class="white--text text-caption">{{ photo.user.initials }}</span>
            </v-avatar>
            <div class="ml-2 d-flex flex-column">
              <span class="text-caption">
                <span class="font-weight-bold mr-1">
                  {{ 'Florian Zdrada' }}
                </span>
                {{ comment.text }}
              </span>
              <span class="text--secondary" style="font-size: 10px">
                {{ formatDate(comment.creation) }}
              </span>
            </div>
          </div>

          <span v-if="photo.comments.length === 0" class="mx-2 px-2 text-caption">
            There are no comments.
          </span>
        </div>
        <v-divider></v-divider>

        <div class="ma-2 px-2 d-flex align-center">
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
  </v-container>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'PhotoView',
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
    }
  },
  computed: {
    photoUrl() {
      return `http://localhost:3000/api/albums/${this.album.id}/photos/${this.photo.id}`
    },
    formattedDate() {
      return DateTime.fromISO(this.photo.creation).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    },
  },
  methods: {
    async postComment() {
      this.loading = true
      try {
        if (this.comment.trim() === '') return

        await this.$axios.post(`/api/photos/${this.photo.id}/comments`, {
          text: this.comment,
        })
        this.comment = ''
        await this.$nuxt.refresh()
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
