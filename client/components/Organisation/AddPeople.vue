<template>
  <v-card>
    <v-card-title class="text-h5 font-weight-bold">Add people</v-card-title>

    <v-card-text class="pt-4 px-4">
      <p class="text-caption">Search by username, full name or email address.</p>
      <v-text-field v-model="search" label="Add people"></v-text-field>

      <div v-for="(user, i) of filteredUsers" :key="i">
        <p>{{ user }}</p>
      </div>
      <span v-if="search.trim() !== '' && filteredUsers.length === 0">No users were found.</span>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text class="px-3" @click="$emit('close', done)">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const searchFunction = (a, b) => a.toLowerCase().startsWith(b.toLowerCase())

export default {
  name: 'AddPeople',
  props: {
    organisation: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      search: '',
      users: [],
      loading: false,
      done: false,
      error: false,
    }
  },
  computed: {
    filteredUsers() {
      const search = this.search.trim()
      if (search === '') return []
      return this.users.filter((u) => {
        if (this.organisation.users.some((user) => user.id === u.id)) return false

        return (
          searchFunction(u.firstname, search) ||
          searchFunction(u.lastname, search) ||
          searchFunction(u.email, search)
        )
      })
    },
  },
  async mounted() {
    try {
      const response = await this.$axios.get('/api/users')
      this.users = response.data
    } catch {}
  },
  methods: {
    async addPerson() {
      await this.$refs.form.validate()
      if (!this.formValid) return
      this.loading = true
      try {
        await this.$axios.post(`/api/organisations/${this.organisation.id}/albums`, {
          name: this.name,
          color: this.color,
        })
      } catch (e) {
        this.error = true
      }
      this.loading = false
    },
  },
}
</script>

<style scoped></style>
