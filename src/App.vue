<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
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
        <RouterLink to="/add-article" class="nav-link px-2"> Ecrire</RouterLink>
      </li>
    </ul>

    <div class="col-md-3 text-end">
      <RouterLink to="/login">
        <button type="button" class="btn btn-outline-primary me-2">Login</button>
      </RouterLink>
      <RouterLink to="/signup">
        <button type="button" class="btn btn-primary">Sign-up</button>
      </RouterLink>
    </div>
    <!-- <div class="dropdown text-end">
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
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div> -->
  </header>
  <RouterView />
</template>

<style scoped></style>
