<script>
import axios from 'axios'
export default {
  data() {
    return {
      email: '',
      name: '',
      password: '',
      user: {}
    }
  },
  methods: {
    async AddUser() {
      try {
        this.user = await axios.post('http://localhost:3000/users', {
          name: this.name,
          email: this.email,
          password: this.password
        })

        console.log(user)
      } catch (e) {
        console.log(e)
      }
    }
  },

  mounted() {
    console.log(this.user)
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="form-signup">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Inscription</h1>
      </div>

      <div class="form-label-group">
        <input
          type="name"
          id="inputName"
          class="form-control"
          v-model="name"
          placeholder="Nom & Prenom"
          required
          autofocus
        />
        <label for="inputName">Nom & Prenom</label>
      </div>
      <div class="form-label-group">
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          v-model="email"
          placeholder="Email"
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
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="AddUser">
        S'inscrire
      </button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2024-2025</p>
    </div>
  </div>
</template>

<style>
:root {
  --input-padding-x: 0.75rem;
  --input-padding-y: 0.75rem;
}

.form-signup {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: 0 auto;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}
</style>
