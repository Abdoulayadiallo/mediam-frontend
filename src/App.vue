<script>
import { RouterLink, RouterView } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <header
    class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-3 mb-4 border-bottom"
  >
    <div class="col-md-3 mb-2 mb-md-0">
      <RouterLink to="/" class="d-inline-flex link-body-emphasis text-decoration-none">
        Median
      </RouterLink>
    </div>

    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
      <li><RouterLink to="/" class="nav-link px-2 link-secondary">Home</RouterLink></li>
      <li>
        <RouterLink to="/add-article" class="nav-link px-2" v-if="loggedIn"> Ecrire</RouterLink>
      </li>
    </ul>

    <div class="col-md-3 text-end">
      <RouterLink to="/login">
        <button type="button" class="btn btn-outline-primary me-2" v-if="!loggedIn">Login</button>
      </RouterLink>
      <RouterLink to="/signup">
        <button type="button" class="btn btn-primary" v-if="!loggedIn">Sign-up</button>
      </RouterLink>
    </div>
    <div class="dropdown text-end" v-if="loggedIn">
      <a
        href="#"
        class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="https://github.com/mdo.png"
          alt="mdo"
          width="32"
          height="32"
          class="rounded-circle"
        />
      </a>
      <ul class="dropdown-menu text-small">
        <li><router-link class="dropdown-item" to="/articles">Article</router-link></li>
        <li><router-link class="dropdown-item" to="/profil">Profil</router-link></li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <button class="dropdown-item" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />Se deconnecter
          </button>
        </li>
      </ul>
    </div>
  </header>
  <RouterView />
</template>

<style scoped></style>
