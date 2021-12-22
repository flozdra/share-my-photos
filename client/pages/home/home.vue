<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-baseline">
        <span class="text-h5 font-weight-black">My organisations</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <v-sheet min-height="70vh" rounded="lg" class="pa-2">
          <ListOrganisations
            :organisations="organisations"
            @new-organisation="newOrganisation"
            @edit-organisation="editOrganisation"
          ></ListOrganisations>
        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog v-if="dialog" v-model="dialog" max-width="350">
      <AddEditOrganisation
        :organisation="organisationSelected"
        @close="closeDialog"
      ></AddEditOrganisation>
    </v-dialog>
  </v-container>
</template>

<script>
import ListOrganisations from '@/components/Organisation/ListOrganisations'
import AddEditOrganisation from '@/components/Organisation/AddEditOrganisation'

export default {
  name: 'HomePage',
  components: { AddEditOrganisation, ListOrganisations },
  layout: 'default',
  middleware: 'auth',
  async asyncData({ $axios, error }) {
    try {
      const response = await $axios.get(`/api/organisations`)
      return { organisations: response.data }
    } catch (e) {
      return error({ statusCode: 500, message: 'Internal server error' })
    }
  },
  data() {
    return {
      organisations: [],
      organisationSelected: null,
      dialog: false,
    }
  },
  methods: {
    async closeDialog(refresh) {
      this.dialog = false
      if (refresh) await this.$nuxt.refresh()
    },
    newOrganisation() {
      this.organisationSelected = null
      this.dialog = true
    },
    editOrganisation(org) {
      this.organisationSelected = org
      this.dialog = true
    },
  },
}
</script>

<style scoped></style>
