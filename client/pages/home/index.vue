<template>
  <v-container>
    <v-row>
      <v-col class="d-flex">
        <span class="text-h5 font-weight-black">My organisations</span>
        <v-spacer></v-spacer>
        <v-btn small text @click="newOrganisation">
          <v-icon small left>mdi-plus</v-icon>
          New organisation
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0">
        <ListOrganisations></ListOrganisations>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogNewOrganisation" width="350">
      <AddEditOrganisation @close="closeDialog"></AddEditOrganisation>
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
  data() {
    return {
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
