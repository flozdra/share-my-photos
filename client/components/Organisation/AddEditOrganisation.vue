<template>
  <v-card>
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
        <v-btn v-if="organisation" text color="error" class="px-3" @click="delete_.dialog = true">
          Delete
        </v-btn>
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
        <v-icon v-else-if="done" color="success" class="mx-3" large>mdi-check</v-icon>
        <span v-else-if="error" class="error--text mx-5">Error</span>
      </v-card-actions>
    </v-form>

    <v-dialog v-model="delete_.dialog" max-width="300">
      <v-card>
        <v-card-title class="text-h5 font-weight-bold">Warning</v-card-title>
        <v-card-text>Are you sure you want to delete this organisation?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            class="px-3"
            @click="delete_.done ? $emit('close', delete_.done) : (delete_.dialog = false)"
          >
            Close
          </v-btn>
          <v-btn
            v-if="!delete_.done && !delete_.error"
            class="error px-3"
            :loading="delete_.loading"
            :disabled="delete_.loading"
            color="primary"
            @click="deleteOrganisation"
          >
            Delete
          </v-btn>
          <v-icon v-else-if="delete_.done" color="success" class="mx-3" large>
            mdi-check
          </v-icon>
          <span v-else-if="delete_.error" class="error--text mx-5">Error</span>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      delete_: {
        dialog: false,
        loading: false,
        error: false,
        done: false,
      },
    }
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
    async deleteOrganisation() {
      this.delete_.loading = true
      try {
        await this.$axios.delete(`/api/organisations/${this.organisation.id}`)
        this.delete_.done = true
      } catch (e) {
        this.delete_.error = true
      }
      this.delete_.loading = false
    },
  },
}
</script>

<style scoped></style>
