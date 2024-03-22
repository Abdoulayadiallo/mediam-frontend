<script>
import axios from 'axios'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
export default {
  name: 'loginView',
  components: {
    Form,
    Field,
    ErrorMessage
  },

  data() {
    const schema = yup.object().shape({
      email: yup.string().required('Email est requis'),
      password: yup.string().required('Mot de passe est requis!')
    })
    return {
      email: '',
      password: '',
      schema
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  methods: {
    // async Login() {
    //   try {
    //     const response = await axios.post('http://localhost:3000/auth/login', {
    //       email: this.email,
    //       password: this.password
    //     })

    //     console.log(response)
    //     console.log(response.data)
    //     const accessToken = response.data.accessToken
    //     localStorage.setItem('token', accessToken)
    //   } catch (e) {
    //     console.log(e)
    //   }
    // },
    handleLogin(user) {
      console.log(user)
      this.$store.dispatch('auth/login', user).then(
        () => {
          this.$router.push('/')
        },
        (error) => {
          this.loading = false
          this.message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        }
      )
    }
  },
  mounted() {}
}
</script>

<template>
  <div class="container-fluid">
    <Form class="form-signin" @submit="handleLogin" :validation-schema="schema">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Connexion</h1>
      </div>

      <div class="form-label-group">
        <input
          name="email"
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email"
          v-model="email"
          required
          autofocus
        />
        <label for="inputEmail">Email</label>
        <ErrorMessage name="email" class="error-feedback" />
      </div>

      <div class="form-label-group">
        <input
          name="password"
          type="password"
          id="inputPassword"
          class="form-control"
          v-model="password"
          placeholder="Password"
          required
        />
        <label for="inputPassword">Mot de passe</label>
        <ErrorMessage name="password" class="error-feedback" />
      </div>

      <div class="checkbox mb-3">
        <label> <input type="checkbox" value="remember-me" /> Remember me </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block">Se connecter</button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2024-2025</p>
    </Form>
  </div>
</template>

<style></style>
