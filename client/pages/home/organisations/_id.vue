<template>
  <v-container>
    <v-row>
      <v-col class="d-flex">
        <span class="text-h5 font-weight-black">{{ organisation.name }}</span>
        <v-spacer></v-spacer>
        <v-btn small text @click="newAlbum">
          <v-icon small left>mdi-plus</v-icon>
          New album
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <v-sheet min-height="70vh" rounded="lg" class="pa-2">
          <ListAlbums :albums="albums" @new-album="newAlbum" @edit-album="editAlbum"></ListAlbums>
        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog v-if="dialog" v-model="dialog" max-width="350">
      <AddEditAlbum
        :organisation="organisation"
        :album="albumSelected"
        @close="closeDialog"
      ></AddEditAlbum>
    </v-dialog>
  </v-container>
</template>

<script>
import ListAlbums from '@/components/Album/ListAlbums'
import AddEditAlbum from '@/components/Album/AddEditAlbum'
export default {
  name: 'OrganisationPage',
  components: { AddEditAlbum, ListAlbums },
  layout: 'default',
  async asyncData({ params, $axios, error }) {
    try {
      const organisation = await $axios.get(`/api/organisations/${params.id}`)
      const albums = await $axios.get(`/api/organisations/${params.id}/albums`)
      return { organisation: organisation.data, albums: albums.data }
    } catch (e) {
      return error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      organisation: {},
      albums: [],
      albumSelected: null,
      dialog: false,
    }
  },
  methods: {
    async closeDialog(refresh) {
      this.dialog = false
      if (refresh) await this.$nuxt.refresh()
    },

    newAlbum() {
      this.albumSelected = null
      this.dialog = true
    },
    editAlbum(album) {
      this.albumSelected = album
      this.dialog = true
    },
  },
}
</script>

<style scoped></style>
