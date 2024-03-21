<script>
import axios from 'axios'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async Login() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.email,
          password: this.password
        })

        console.log(response)
        console.log(response.data)
        const accessToken = response.data.accessToken
        localStorage.setItem('token',accessToken)

      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {}
}
</script>

<template>
  <div class="container-fluid">
    <div class="form-signin">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Connexion</h1>
      </div>

      <div class="form-label-group">
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email"
          v-model="email"
          required
          autofocus
        />
        <label for="inputEmail">Email</label>
      </div>

      <div class="form-label-group">
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          v-model="password"
          placeholder="Password"
          required
        />
        <label for="inputPassword">Mot de passe</label>
      </div>

      <div class="checkbox mb-3">
        <label> <input type="checkbox" value="remember-me" /> Remember me </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" @click="Login">Se connecter</button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2024-2025</p>
    </div>
  </div>
</template>

<style></style>
