<template>
  <div id="site" class="container">
    <b-link to="/">
      Atrás
    </b-link>
    <section>
      <h1>{{ currentSite.name }}</h1>
      <star-rating
        :rating="getSiteScore(currentSite)"
        :read-only="true"
        :star-size="30"
        :increment="0.01"
        :inline="true"
      />
      <div class="mx-auto addReview-button">
        <b-button :variant="'primary'" v-b-modal.addReviewModal>Añadir una review</b-button>
      </div>
      <section>
        <h6>{{ currentSite.reviews.length }} Reviews:</h6>
        <b-card v-for="review in currentSite.reviews" :key="review.id">
          <div>
            <star-rating
              :rating="review.score"
              :read-only="true"
              :star-size="20"
              :show-rating="false"
            />
            <span>Por <strong>{{ review.author }}</strong></span>
            <span>el <em>{{ formatDate(review.time) }}</em></span>
          </div>
          <div class="comment">
            {{ review.comment }}
          </div>
        </b-card>
      </section>
    </section>

    <AddReviewModal />

  </div>
</template>

<script>
  import { formatDate, getSiteScore } from "../utils.js";
  import { mapGetters } from 'vuex';
  import StarRating from 'vue-star-rating';
  import AddReviewModal from './AddReviewModal';

  export default {
    name: 'Site',

    components: {
      StarRating,
      'AddReviewModal': AddReviewModal
    },

    computed: mapGetters(['currentSite']),

    methods: {
      formatDate,

      getSiteScore,
    },
  }
</script>

<style>
  #site { padding-top: 80px }
  .comment { padding-top: 20px }
  .addReview-button { width: 200px; padding: 20px }
  .addReview-rating { width: 100px }
</style>
