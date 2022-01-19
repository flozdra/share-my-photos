<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-baseline">
        <v-btn icon small color="transparent" class="mr-4" to="/home">
          <v-icon color="black">mdi-arrow-left</v-icon>
        </v-btn>
        <span class="text-h5 font-weight-black">{{ organisation.name }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="pa-1 d-flex overflow-auto" style="gap: 15px">
          <div class="d-flex flex-column">
            <div
              v-ripple
              class="avatar"
              style="border: solid 0.1rem #b9baba; cursor: pointer; background-color: #eeeeee"
              @click="addPeople.dialog = true"
            >
              <span class="white--text font-weight-medium"><v-icon>mdi-plus</v-icon></span>
            </div>
            <span
              class="text-center mt-1 text-truncate"
              style="user-select: none; width: 45px; font-size: 10px"
            >
              Invite
            </span>
          </div>

          <div
            v-for="(user, idx) in organisation.users"
            :key="idx"
            class="d-flex flex-column"
            style="user-select: none"
          >
            <div class="avatar elevation-2" :style="`background-color: ${user.color}`">
              <span class="white--text font-weight-medium">{{ user.initials }}</span>
            </div>
            <span class="text-center mt-1" style="font-size: 10px">{{ user.firstname }}</span>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <v-sheet min-height="70vh" rounded="lg" class="pa-2">
          <ListAlbums :albums="albums" @new-album="newAlbum" @edit-album="editAlbum"></ListAlbums>
        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog v-if="addEditAlbum.dialog" v-model="addEditAlbum.dialog" max-width="350">
      <AddEditAlbum
        :organisation="organisation"
        :album="albumSelected"
        @close="closeDialog"
      ></AddEditAlbum>
    </v-dialog>

    <v-dialog v-if="addPeople.dialog" v-model="addPeople.dialog" max-width="350">
      <AddPeople :organisation="organisation" @close="closeDialog"></AddPeople>
    </v-dialog>
  </v-container>
</template>

<script>
import ListAlbums from '@/components/Album/ListAlbums'
import AddEditAlbum from '@/components/Album/AddEditAlbum'
import AddPeople from '@/components/Organisation/AddPeople'

export default {
  name: 'OrganisationPage',
  components: { AddPeople, AddEditAlbum, ListAlbums },
  layout: 'default',
  async asyncData({ params, $axios, redirect, error }) {
    try {
      const organisation = await $axios.get(`/api/organisations/${params.org_id}`)
      const albums = await $axios.get(`/api/organisations/${params.org_id}/albums`)

      return { organisation: organisation.data, albums: albums.data }
    } catch (e) {
      if (e.response.status === 401) return redirect('/')
      return error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      organisation: {},
      albums: [],
      albumSelected: null,
      addEditAlbum: {
        dialog: false,
      },
      addPeople: {
        dialog: false,
      },
    }
  },
  methods: {
    async closeDialog(refresh) {
      this.addEditAlbum.dialog = false
      this.addPeople.dialog = false
      if (refresh) await this.$nuxt.refresh()
    },

    newAlbum() {
      this.albumSelected = null
      this.addEditAlbum.dialog = true
    },
    editAlbum(album) {
      this.albumSelected = album
      this.addEditAlbum.dialog = true
    },
  },
}
</script>

<style scoped lang="scss">
.avatar {
  user-focus: none;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
}
</style>
