<template>
  <div id="site" class="container">
    <section>
      <h1>{{ currentSite.name }}</h1>
      <b-button :variant="'primary'" v-b-modal.addReviewModal>Añadir una review</b-button>
      <section>
        <h6>Reviews:</h6>
        <b-card v-for="review in currentSite.reviews" :key="review.id">
          <div>
            <span class="text-warning" v-for="n in review.score">
              &#9733;
            </span>
            <span class="text-warning" v-for="n in 5-review.score">
              &#9734;
            </span>
            <br />
            <span>Por <strong>{{ review.author }}</strong></span>
            <span>el <em>{{ formatDate(review.time) }}</em></span>
          </div>
          <div class="comment">
            {{ review.comment }}
          </div>
        </b-card>
      </section>
    </section>

    <b-modal id="addReviewModal" title="Añadir una review" @ok="addReview" @shown="clearModal">
      <form @submit.stop.prevent="submit">
        <b-form-input type="text" placeholder="Nombre del autor" v-model="reviewToAdd.author" />
        <b-form-input type="range" min="1" max="5" v-model=reviewToAdd.score />
        <b-form-input textarea type="text" placeholder="Comentario acerca del sitio" v-model="reviewToAdd.comment" />
      </form>
    </b-modal>
  </div>
</template>

<script>
  import { formatDate } from "../utils.js";
  import { sendRegisterAReview } from "../actions.js";
  import Vue from 'vue';
  import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      reviewToAdd: {},
    }),
    name: 'Site',

    computed: mapGetters(['currentSite']),

    methods: {
      formatDate,

      clearModal() {
        this.reviewToAdd = {}
      },

      addReview () {
        this.reviewToAdd.score = Number(this.reviewToAdd.score)
        sendRegisterAReview(this.reviewToAdd, this.currentSite.id).then((response) => {
          this.currentSite.reviews.unshift(response.body.result)
        });
      },
    },
  }
</script>

<style>
  #site { padding-top: 200px }
  .comment { padding-top: 20px }
</style>
