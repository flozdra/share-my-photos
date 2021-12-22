<template>
  <v-card>
    <v-card-title class="text-h5 font-weight-bold">Upload photos</v-card-title>
    <v-form ref="form" v-model="formValid" lazy-validation autocomplete="off">
      <v-card-text>
        <v-file-input
          v-model="photos"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-camera"
          label="Choose your photos"
          multiple
          counter
          :rules="requiredRule"
        ></v-file-input>
        <v-text-field
          v-model="description"
          :rules="requiredRule"
          label="Description"
        ></v-text-field>

        <v-combobox
          v-model="tags"
          label="Add tags"
          multiple
          small-chips
          deletable-chips
          clearable
        ></v-combobox>

        <span v-if="photos.length > 0" class="d-block mt-3 text-caption font-weight-light">
          Photo(s)
        </span>
        <div
          class="scroller-days mx-n2 d-flex"
          :class="{
            'hide-scroll-mobile': $vuetify.breakpoint.xsOnly,
            'justify-center': photos.length < 3,
          }"
        >
          <div v-for="(file, i) in photos" :key="i" class="mx-1 my-2 d-flex align-center">
            <v-img
              :src="getUrlFromFile(file)"
              max-width="120"
              max-height="120"
              :alt="file.name"
            ></v-img>
          </div>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text class="px-3" @click="$emit('close', done)">Close</v-btn>
        <v-btn
          v-if="!done && !error"
          class="px-3"
          :loading="loading"
          :disabled="loading"
          color="primary"
          @click.stop.prevent="submit"
        >
          Upload
        </v-btn>
        <v-icon v-else-if="done" color="success" class="mx-3" large>mdi-check</v-icon>
        <span v-else-if="error" class="error--text mx-5">Error</span>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'UploadPhotos',
  props: {
    organisation: {
      type: Object,
      default: null,
    },
    album: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formValid: false,
      requiredRule: [(v) => (!!v && v.length > 0) || 'Required!'],
      photos: [],
      name: '',
      description: '',
      tags: [],
      loading: false,
      done: false,
      error: false,

      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
    }
  },
  methods: {
    async submit() {
      await this.$refs.form.validate()
      if (!this.formValid) return
      this.loading = true
      try {
        for (const file of this.photos) {
          const formData = new FormData()
          formData.append('name', file.name)
          formData.append('description', this.description)
          for (const tag of this.tags) {
            formData.append('tags[]', tag)
          }

          formData.append('file', file)
          await this.$axios.post(`/api/albums/${this.album.id}/photos`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        }

        this.done = true
      } catch (e) {
        this.error = true
      }
      this.loading = false
    },

    getUrlFromFile(file) {
      return URL.createObjectURL(file)
    },
  },
}
</script>

<style scoped>
.scroller-days {
  overflow: auto;
  white-space: nowrap;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scroll-mobile::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.hide-scroll-mobile {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
