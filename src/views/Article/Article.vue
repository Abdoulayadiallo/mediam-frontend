<script lang="ts">
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'ArticleView',

  data() {
    return {
      articleList: [],
      userId: ''
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    getArticlesById() {
      axios.get(`http://localhost:3000/articles/${this.userId}/users`).then((res) => {
        // axios.get(`http://localhost:3000/articles/drafts`).then((res) => {
        console.log(res)
        this.articleList = res.data
      })
    },
    deleteArticlesById(id: number) {
      Swal.fire({
        title: "Suppression d'article",
        text: 'Etes vous sûr de vouloir supprimer cet article',
        icon: 'warning',
        showConfirmButton: true,
        confirmButtonText: 'Supprimer',
        confirmButtonColor: '#dc3545',
        showCancelButton: true,
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:3000/articles/${id}`).then((res) => {
            console.log(res)
            Swal.fire({ text: 'Article Supprimer avec succès', icon: 'success', timer: 5000 })
            this.getArticlesById()
          })
        }
      })
    }
  },

  mounted() {
    this.userId = localStorage.getItem('userId')
    if (this.userId) {
      this.getArticlesById()
    }
  }
}
</script>

<template>
  <main>
    <div class="container">
      <div class="alert alert-primary" role="alert" v-if="articleList.length == 0">
        Vous n'avez aucun article
      </div>
      <div class="row border-bottom p-2" v-for="(article, index) in articleList" :key="index">
        <div class="col-sm-10 col-6">
          <div>
            <img
              class="img-thumbnail rounded object-fit-cover"
              style="width: 70px; height: 70px"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            Kevin Nokia
          </div>
          <div>
            <router-link :to="`/article/${article.id}`">
              <h3>{{ article.title }}</h3>
            </router-link>
            <div>{{ article.description }}</div>
          </div>
        </div>
        <div class="col-sm-2 col-4">
          <img
            class="img-thumbnail rounded object-fit-cover h-75 w-auto align-items-center"
            src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div class="d-flex pt-2 justify-content-space-between">
            <router-link :to="`/update-article/${article.id}`">
              <button type="button" class="btn btn-primary">Modifier</button>
            </router-link>
            <button type="button" class="btn btn-danger" @click="deleteArticlesById(article.id)">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped></style>
