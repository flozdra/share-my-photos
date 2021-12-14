<template>
  <v-container>
    <v-row>
      <v-col class="d-flex">
        <span class="text-h5 font-weight-black">{{ organisation.name }}</span>
        <v-spacer></v-spacer>
        <v-btn small text @click="newOrganisation">
          <v-icon small left>mdi-plus</v-icon>
          New album
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0">
        <ListAlbums></ListAlbums>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogNewOrganisation" width="350">
      <AddEditAlbum @close="closeDialog"></AddEditAlbum>
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
      const response = await $axios.get(`/api/organisations/${params.id}`)
      return { organisation: response.data }
    } catch (e) {
      return error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      organisation: {},
      dialogNewOrganisation: false,
    }
  },
  methods: {
    newOrganisation() {
      this.dialogNewOrganisation = true
    },
    closeDialog(refresh) {
      this.dialogNewOrganisation = false
      if (refresh) window.location.reload()
    },
  },
}
</script>

<style scoped></style>
