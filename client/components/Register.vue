<template>
  <v-card :width="$vuetify.breakpoint.xs ? 300 : 350">
    <v-card-title class="text-h5 font-weight-bold">Create my account</v-card-title>
    <v-form ref="form" v-model="formValid" lazy-validation>
      <v-card-text>
        <v-text-field v-model="firstname" label="Firstname" :rules="requiredRule"></v-text-field>
        <v-text-field v-model="lastname" label="Lastname" :rules="requiredRule"></v-text-field>
        <v-text-field v-model="email" label="Email" :rules="emailRules"></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
          autocomplete="new-password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!done && !error"
          class="px-3"
          :loading="loading"
          :disabled="loading"
          color="primary"
          @click="submitRegister"
        >
          Register
        </v-btn>
        <v-icon v-else-if="done" color="success" class="mx-3" large>mdi-check</v-icon>
        <span v-else-if="error" class="error--text mx-5">Error</span>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      formValid: false,
      firstname: '',
      lastname: '',
      requiredRule: [(v) => !!v || 'Required!'],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) =>
          /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/.test(v) ||
          'Password too weak',
      ],

      loading: false,
      done: false,
      error: false,
    }
  },
  methods: {
    async submitRegister() {
      try {
        this.$refs.form.validate()

        if (this.formValid) {
          this.loading = true
          await this.$axios.post('/api/auth/register', {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
          })
          this.done = true
        }
      } catch (e) {
        this.error = true
      }
      this.loading = false
    },
  },
}
</script>

<style scoped></style>
