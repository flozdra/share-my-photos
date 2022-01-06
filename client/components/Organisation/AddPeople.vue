<template>
  <v-card>
    <v-card-title class="text-h5 font-weight-bold">Add people</v-card-title>

    <v-card-text class="pt-4 px-4">
      <p class="text-caption">Search by username, full name or email address.</p>
      <v-text-field v-model="search" label="Add people" hide-details></v-text-field>

      <v-list dense>
        <v-list-item
          v-for="user of filteredUsers"
          :key="user.key"
          class="px-0"
          @click="addPerson(user)"
        >
          <v-list-item-avatar :key="user.loading">
            <v-progress-circular v-if="user.loading" indeterminate size="30"></v-progress-circular>
            <v-icon v-else-if="user.done" color="success" class="mx-3" large>mdi-check</v-icon>
            <v-avatar v-else :color="user.color" size="30" class="my-1">
              <span class="white--text text-body-2">{{ user.initials }}</span>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user.fullName }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

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
      done: false,
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
      this.users = response.data.map((u) => ({ ...u, key: this.getUserKey(u) }))
    } catch {}
  },
  methods: {
    getUserKey(user) {
      return user.id + (user.loading ? '1' : '0') + (user.done ? '1' : '0')
    },
    async addPerson(user) {
      user.loading = true
      user.key = this.getUserKey(user) // UPDATE LIST ITEM WITH KEY
      try {
        await this.$axios.post(`/api/organisations/${this.organisation.id}/users/${user.id}`)
        user.done = true
        this.done = true
      } catch {}
      user.loading = false
      user.key = this.getUserKey(user) // UPDATE LIST ITEM WITH KEY
    },
  },
}
</script>

<style scoped></style>
