<template>
  <v-card :width="$vuetify.breakpoint.xs ? 300 : 350">
    <v-card-title class="text-h5 font-weight-bold">Login</v-card-title>
    <v-form ref="form" v-model="formValid" lazy-validation>
      <v-card-text>
        <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <v-checkbox v-model="remember" label="Remember me"></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="loading" color="primary" @click="submitLogin">Login</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      formValid: false,
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [(v) => !!v || 'Password is required'],
      remember: false,
      label: false,
      icon: false,
      disabled: false,
      loading: false,
      done: false,
      error: false,
    }
  },
  methods: {
    async submitLogin() {
      await this.$refs.form.validate()
      if (this.formValid) {
        // login : What do ?
      }
    },
  },
}
</script>

<style scoped></style>
