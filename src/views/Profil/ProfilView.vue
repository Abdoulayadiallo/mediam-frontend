<script>
import UserService from '../../services/user.service'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import axios from 'axios'
import authHeader from '../../services/auth-header'
import Swal from 'sweetalert2'

export default {
  name: 'ProfilView',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required('Email est requis'),
      name: yup.string().required('nom et prenom est requis!')
    })
    const schemapassword = yup.object().shape({
      password: yup
        .string()
        .required('Mot de passe est requis')
        .min(6, 'le mot de passe doit contenir au moins 6 caractères'),
      newpassword: yup
        .string()
        .required('Nouveau Mot de passe est requis!')
        .min(6, 'le mot de passe doit contenir au moins 6 caractères'),
      confirmpassword: yup
        .string()
        .required('Veuillez confirmer le mot de passe!')
        .min(6, 'le mot de passe doit contenir au moins 6 caractères')
    })
    return {
      fileName: '',
      preview: null,
      //  preset: process.env.VUE_APP_UPLOAD_PRESET,
      formData: null,
      //  cloudName: process.env.VUE_APP_CLOUD_NAME,
      success: '',
      user: {},
      userId: localStorage.getItem('userId'),
      password: '',
      newpassword: '',
      confirmpassword: '',
      schemapassword,
      schema,
      message: ''
    }
  },
  methods: {
    getUserById() {
      UserService.getUser(this.userId).then(
        (response) => {
          this.user = response.data
          console.log(this.user)
        },
        (error) => {
          this.content =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        }
      )
    },
    async UpdateUserProfile() {
      console.log('_________-____-_____^-_-^____')
      try {
        const user = await axios.patch(
          `http://localhost:3000/users/${this.userId}`,
          {
            name: this.user.name,
            email: this.user.email
          },
          { headers: authHeader() }
        )
        console.log(user)
        Swal.fire({
          title: 'Profil',
          text: 'Profil modifier avec succès',
          icon: 'success',
          timer: 3000
        })
      } catch (e) {
        console.log(e)
      }
    },
    async UpdateUserPassword() {
      console.log('user password')
      try {
        const user = await axios.patch(
          `http://localhost:3000/users/motdepasse/${this.userId}`,
          {
            password: this.password,
            newpassword: this.newpassword,
            confirmpassword: this.confirmpassword
          },
          { headers: authHeader() }
        )
        console.log(user)
        Swal.fire({
          title: 'Mot de passe',
          text: 'Mot de passe modifier avec succès',
          icon: 'success',
          timer: 3000
        })
      } catch (e) {
        console.log(e)
        this.message = e.response.data.message
      }
    },
    handleFileChange: function (event) {
      this.file = event.files[0]
      this.fileName = this.file.name

      this.formData = new FormData()
      this.formData.append('upload_preset', this.preset)

      let reader = new FileReader()
      reader.readAsDataURL(this.file)

      reader.onload = (e) => {
        this.preview = e.target.result
        this.formData.append('file', this.preview)
      }
    }
  },
  //   computed: {
  //     currentUser() {
  //       return this.$store.state.auth.user
  //     }
  //   },
  mounted() {
    if (this.userId) {
      this.getUserById()
    }
  }
}
</script>
<template>
  <div class="container">
    <div class="row g-5">
      <div class="col-md-5 col-lg-4">
        <div class="d-flex justify-content-center align-items-center flex-column">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Photo de profil</span>
          </h4>
          <div
            class="dropzone mb-3"
            @dragover.prevent
            @dragenter.prevent
            @dragstart.prevent
            @drop.prevent="handleFileChange($event.dataTransfer)"
          >
            <input
              hidden
              id="file-input"
              type="file"
              accept="image/png, image/jpeg"
              @change="handleFileChange($event.target)"
              required
            />
            <!-- <h2 for="file-input">Click or Drag N Drop Image</h2> -->
            <img
              width="120"
              height="120"
              for="file-input"
              class="rounded-circle"
              v-bind:src="preview"
            />
            <!-- <h3 v-if="preview">File name: {{ fileName }}</h3> -->
          </div>
          <button type="submit" class="btn btn-primary" v-on:click="upload">Upload</button>
        </div>
      </div>
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Profil</h4>
        <Form class="needs-validation" @submit="UpdateUserProfile" :validation-schema="schema">
          <div class="row g-3">
            <div class="col-12">
              <label for="name" class="form-label">Nom & Prenom</label>
              <Field
                type="text"
                class="form-control"
                name="name"
                id="name"
                placeholder=""
                required
                v-model="user.name"
              />
              <ErrorMessage name="name" class="invalid-feedback" />
            </div>

            <div class="col-12">
              <label for="email" class="form-label">Email</label>
              <Field
                name="email"
                type="email"
                class="form-control"
                id="email"
                placeholder="you@example.com"
                v-model="user.email"
                required
              />
              <ErrorMessage name="email" class="invalid-feedback" />
            </div>
          </div>
          <button class="w-100 btn btn-primary btn-md mt-2">Enregistrer</button>
        </Form>
        <hr class="my-4" />

        <h4 class="mb-3">Mot de passe</h4>
        <Form @submit="UpdateUserPassword" :validation-schema="schemapassword">
          <div class="row gy-3">
            <div class="col-12">
              <label for="password" class="form-label">Ancien mot de passe</label>
              <input
                name="password"
                type="password"
                class="form-control"
                id="password"
                v-model="password"
                required
              />
              <ErrorMessage name="password" class="invalid-feedback" />
            </div>

            <div class="col-md-6">
              <label for="newpassword" class="form-label">Nouveau mot de passe</label>
              <Field
                name="newpassword"
                type="password"
                class="form-control"
                id="newpassword"
                v-model="newpassword"
                required
              />
              <ErrorMessage name="newpassword" class="invalid-feedback" />
            </div>
            <div class="col-md-6 mb-2">
              <label for="confirmpassword" class="form-label">Confirmer mot de passe</label>
              <Field
                name="confirmpassword"
                type="password"
                class="form-control"
                id="confirmpassword"
                v-model="confirmpassword"
                required
              />
              <ErrorMessage name="confirmpassword" class="invalid-feedback" />
            </div>
            <div class="alert" v-if="message">
              {{ message }}
            </div>
          </div>
          <button class="w-100 btn btn-primary btn-md" type="submit">Enregistrer</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<style></style>
