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
        :show-rating="false"
        :star-size="30"
        :increment="0.01"
        inline="true"
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

    <b-modal id="addReviewModal"
      title="Añadir una review"
      @ok="addReview"
      @shown="clearModal" >
      <form @submit.stop.prevent="submit">
        <star-rating
          :show-rating="false"
          @rating-selected="setReviewScore"
        />
        <b-form-input class="mt-1"
          type="text"
          placeholder="Nombre del autor"
          v-model="reviewToAdd.author"
        />
        <b-form-input class="mt-1"
          textarea
          type="text"
          placeholder="Comentario acerca del sitio"
          v-model="reviewToAdd.comment"
        />
      </form>
    </b-modal>
  </div>
</template>

<script>
  import { formatDate, getSiteScore } from "../utils.js";
  import { sendRegisterAReview } from "../actions.js";
  import Vue from 'vue';
  import { mapGetters } from 'vuex'
  import StarRating from 'vue-star-rating'

  export default {
    data: () => ({
      reviewToAdd: {},
    }),
    name: 'Site',

    components: {
      StarRating
    },

    computed: mapGetters(['currentSite']),

    methods: {
      formatDate,

      getSiteScore,

      clearModal () {
        this.reviewToAdd = {}
      },

      setReviewScore (rating) {
        this.reviewToAdd.score = rating;
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
  .addReview-button { width: 200px }
  .addReview-rating { width: 100px }
</style>
