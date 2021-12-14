<template>
  <v-card :width="$vuetify.breakpoint.xs ? 300 : 350">
    <v-card-title class="text-h5 font-weight-bold">
      {{ (organisation ? 'Edit' : 'Create') + ' organisation' }}
    </v-card-title>
    <v-form ref="form" v-model="formValid" lazy-validation autocomplete="off">
      <v-card-text>
        <v-text-field v-model="name" :rules="requiredRule" label="Name"></v-text-field>

        <span class="d-block mt-3 text-caption font-weight-light">Color</span>
        <v-color-picker v-model="color" dot-size="25" swatches-max-height="200"></v-color-picker>
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
          @click="submit"
        >
          {{ organisation ? 'Edit' : 'Create' }}
        </v-btn>
        <v-icon v-else-if="done" color="success" class="mx-3" large>mdi-check-bold</v-icon>
        <span v-else-if="error" class="error--text mx-5">Error</span>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'AddEditOrganisation',
  props: {
    organisation: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formValid: false,
      requiredRule: [(v) => !!v || 'Required!'],
      name: '',
      color: '',
      loading: false,
      done: false,
      error: false,
    }
  },
  computed: {
    title() {
      return this.organisation ? 'Edit organisation' : 'New organisation'
    },
  },
  mounted() {
    this.name = this.organisation?.name || ''
    this.color = this.organisation?.color || '#3b82f6ff'
  },
  methods: {
    async submit() {
      await this.$refs.form.validate()
      if (!this.formValid) return
      this.loading = true
      try {
        if (this.organisation) {
          await this.$axios.patch(`/api/organisations/${this.organisation.id}`, {
            name: this.name,
            color: this.color,
          })
        } else {
          await this.$axios.post(`/api/organisations`, {
            name: this.name,
            color: this.color,
          })
        }
        this.done = true
      } catch (e) {
        this.error = true
      }
      this.loading = false
    },
  },
}
</script>

<style scoped></style>
