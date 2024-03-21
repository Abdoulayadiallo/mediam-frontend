<script>
import axios from 'axios'
export default {
  // name: 'ViewArticle',
  // inject: ['ViewArticle'],
  data() {
    return {
      article: {},
      id: this.$route.params.id
    }
  },
  // created() {
  //   //this.article = this.articleList.find((article) => article.id == id)
  // },
  methods: {
    async getArticle() {
      try {
        const responses = await axios
          .get(`http://localhost:3000/articles/${this.id}`)
          .then((res) => {
            console.log(res)
            this.article = res.data
          })
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    console.log(this.id)
    this.getArticle()
    console.log(this.article)
  }
}
</script>

<template>
  <div class="container">
    <div class="article">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <p>{{ article.body }}</p>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
