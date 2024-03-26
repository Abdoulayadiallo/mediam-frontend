<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'SignUp',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const schema = yup.object().shape({
      name: yup
        .string()
        .required('Nom est requis!')
        .min(3, 'Must be at least 3 characters!')
        .max(20, 'Must be maximum 20 characters!'),
      email: yup
        .string()
        .required('Email est requis!')
        .email('Email is invalid!')
        .max(50, 'Must be maximum 50 characters!'),
      password: yup
        .string()
        .required('Mots de passe requis!')
        .min(6, 'Must be at least 6 characters!')
        .max(40, 'Must be maximum 40 characters!'),
      passwordConfirmed: yup
        .string()
        .required('Mots de passe requis!')
        .min(6, 'Must be at least 6 characters!')
        .max(40, 'Must be maximum 40 characters!')
    })
    return {
      email: '',
      name: '',
      password: '',
      passwordConfirmed: '',
      passwordError: '',
      schema
    }
  },
  methods: {
    showAlert() {},

    async AddUser() {
      if (this.password == this.passwordConfirmed) {
        try {
          const user = await axios.post('http://localhost:3000/users', {
            name: this.name,
            email: this.email,
            password: this.password
          })
          Swal.fire({
            title: 'Creation de compte?',
            text: 'Compte crée avec succès',
            icon: 'success',
            timer: 2000
          }).then(setTimeout(() => this.$router.push('/login'), 2000))
          console.log(user)
        } catch (e) {
          console.log(e)
        }
      } else {
        this.passwordError = 'Les deux mots de passe ne corresponde pas'
      }
    }
  },

  mounted() {}
}
</script>

<template>
  <div class="container-fluid">
    <Form class="form-signup" @submit="AddUser" :validation-schema="schema">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Inscription</h1>
      </div>

      <div class="form-label-group">
        <Field
          name="name"
          type="name"
          id="inputName"
          class="form-control"
          v-model="name"
          placeholder="Nom & Prenom"
          required
        />
        <label for="inputName">Nom & Prenom</label>
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <div class="form-label-group">
        <Field
          name="email"
          type="email"
          id="inputEmail"
          class="form-control"
          v-model="email"
          placeholder="Email"
          required
        />
        <label for="inputEmail">Email</label>
        <ErrorMessage name="email" class="error-feedback" />
      </div>

      <div class="form-label-group">
        <Field
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
      <div class="form-label-group">
        <Field
          name="passwordConfirmed"
          type="password"
          id="inputPasswordConfirmed"
          class="form-control"
          v-model="passwordConfirmed"
          placeholder="Confirmer mot de passe"
          required
        />
        <label for="inputPasswordConfirmed">Confirmer mot de passe</label>
        <ErrorMessage name="passwordConfirmed" class="error-feedback" />
      </div>
      <div v-if="passwordError">{{ passwordError }}</div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">S'inscrire</button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2024-2025</p>
    </Form>
  </div>
</template>

<style>
:root {
  --input-padding-x: 0.75rem;
  --input-padding-y: 0.75rem;
}

.form-signup,
.form-signin {
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
