<script>
import UserService from '../../services/user.service'
export default {
  name: 'ProfilView',

  data() {
    return {
      fileName: '',
      preview: null,
      //  preset: process.env.VUE_APP_UPLOAD_PRESET,
      formData: null,
      //  cloudName: process.env.VUE_APP_CLOUD_NAME,
      success: '',
      user: {}
    }
  },
  methods: {
    getUserById(userId) {
      UserService.getUser(userId).then(
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
    const userId = localStorage.getItem('userId')
    if (userId) {
      this.getUserById(userId)
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
        <form class="needs-validation" novalidate>
          <div class="row g-3">
            <div class="col-12">
              <label for="firstName" class="form-label">Nom & Prenom</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder=""
                value=""
                required
                v-model="user.name"
              />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>

            <div class="col-12">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="you@example.com"
                v-model="user.email"
                required
              />
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
          </div>
          <button class="w-100 btn btn-primary btn-md mt-2" type="submit">Enregistrer</button>
        </form>
        <hr class="my-4" />

        <h4 class="mb-3">Mot de passe</h4>
        <form>
          <div class="row gy-3">
            <div class="col-12">
              <label for="lastpassword" class="form-label">Ancien mot de passe</label>
              <input
                type="password"
                class="form-control"
                id="lastpassword"
                placeholder=""
                required
              />
              <div class="invalid-feedback">Ancien mot de passe requis</div>
            </div>

            <div class="col-md-6">
              <label for="newpassword" class="form-label">Nouveau mot de passe</label>
              <input
                type="password"
                class="form-control"
                id="newpassword"
                placeholder=""
                required
              />
              <div class="invalid-feedback">Nouveau mot de passe requis</div>
            </div>
            <div class="col-md-6 mb-2">
              <label for="confirmpassword" class="form-label">Confirmer mot de passe</label>
              <input
                type="password"
                class="form-control"
                id="confirmpassword"
                placeholder=""
                required
              />
              <div class="invalid-feedback">Confirmer mot de passe requis</div>
            </div>
          </div>
          <button class="w-100 btn btn-primary btn-md" type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style></style>
