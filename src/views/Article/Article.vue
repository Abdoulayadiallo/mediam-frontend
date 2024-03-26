<script lang="ts">
import axios from 'axios'
export default {
  name: 'ArticleView',

  data() {
    return {
      articleList: []
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    getArticles() {
      axios.get('http://localhost:3000/articles').then((res) => {
        console.log(res)
        this.articleList = res.data
      })
    }
  },



  mounted() {
    this.getArticles()
  }
}
</script>

<template>
  <main>
    <div class="container">
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
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped></style>
