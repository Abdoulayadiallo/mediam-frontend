<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      title: '',
      description: '',
      body: '',
      published: false,
      userId: '',
      options: [
        { text: 'Oui', value: true },
        { text: 'Non', value: false }
      ]
    }
  },
  methods: {
    async AddArticle() {
      try {
        // const article = await axios.post('http://localhost:3000/articles', {
        //   title: this.title,
        //   description: this.description,
        //   body: this.body,
        //   published: this.published,
        //   authorId: this.userId
        // })
        // console.log(article)
        console.log(
          'title:',
          this.title,
          'description:',
          this.description,
          'body:',
          this.body,
          'published: ',
          this.published,
          'authorId:',
          this.userId
        )
        Swal.fire({
          title: "Ajout d'article",
          text: 'Article crée avec succès',
          icon: 'success',
          timer: 2000
        }).then(setTimeout(() => this.$router.push(`/article/${article.data.id}`), 2500))
      } catch (e) {
        console.log(e)
      }
    }
  },

  mounted() {
    this.userId = localStorage.getItem('userId')
    console.log(this.userId)
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="form-add-article">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Ajouter un article</h1>
      </div>

      <div class="form-label-group">
        <input
          type="title"
          id="inputTitle"
          class="form-control"
          v-model="title"
          placeholder="Titre"
          required
          autofocus
        />
        <label for="inputTitle">Titre</label>
      </div>
      <div class="form-label-group">
        <textarea
          type="description"
          id="inputDescription"
          class="form-control"
          v-model="description"
          placeholder="Description"
          required
          rows="2"
          autofocus
        ></textarea>
        <label for="inputDescription">Description</label>
      </div>

      <div class="form-label-group">
        <textarea
          type="body"
          id="inputBody"
          class="form-control"
          v-model="body"
          placeholder="Contenu"
          required
          rows="3"
        ></textarea>
        <label for="inputBody">Contenu</label>
      </div>
      <div class="form-group">
        <label for="publierSelect1">Publier</label>
        <select class="form-control" id="publierSelect1" v-model="published">
          <option v-for="(option, index) in options" :key="index" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>

      <button class="btn btn-lg btn-primary btn-block mt-2" type="submit" @click="AddArticle">
        Enregistrer
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

.form-add-article {
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
.form-label-group > textarea,
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

.form-label-group input::-webkit-input-placeholder,
.form-label-group textarea::-webkit-textarea-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder,
.form-label-group textarea:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder,
.form-label-group textarea::-ms-textarea-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder,
.form-label-group textarea::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder,
.form-label-group textarea::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown),
.form-label-group textarea:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label,
.form-label-group textarea:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}
</style>
