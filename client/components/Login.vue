<template>
  <v-card :width="$vuetify.breakpoint.xs ? 300 : 350">
    <v-card-title class="text-h5 font-weight-bold">Login</v-card-title>
    <v-form ref="form" v-model="formValid" lazy-validation>
      <v-card-text>
        <v-text-field v-model="email" :rules="emailRules" label="Email" type="email"></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          type="password"
        ></v-text-field>

        <v-checkbox v-model="remember" label="Remember me"></v-checkbox>
        <v-alert v-if="error" class="error--text" color="grey lighten-3">
          <v-icon left color="error">mdi-information-outline</v-icon>
          Invalid credentials
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="px-3"
          :loading="loading"
          :disabled="loading"
          color="primary"
          @click="submitLogin"
        >
          Login
        </v-btn>
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
      loading: false,
      error: false,
    }
  },
  methods: {
    async submitLogin() {
      this.error = false
      this.loading = true
      try {
        await this.$refs.form.validate()
        if (this.formValid) {
          await this.$auth.loginWith('cookie', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
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
