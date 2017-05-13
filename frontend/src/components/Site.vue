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

    <b-modal
      id="addReviewModal"
      title="Añadir una review"
      @ok="submit"
      @shown="clearModal"
    >
      <form @submit.stop.prevent="submit">
        <b-form-fieldset
          label="Puntuación"
          :feedback="errors.first('score')"
          :state="errors.has('score') ? 'warning' : 'success'"
          :label-size="1"
        >
          <star-rating
            :show-rating="false"
            @rating-selected="setScore"
            name="score"
            v-validate="'required'"
          />
        </b-form-fieldset>
        <b-form-fieldset
          label="Autor"
          :feedback="errors.first('author')"
          :state="errors.has('author') ? 'warning' : 'success'"
          :label-size="1"
        >
          <b-form-input class="mt-1"
            type="text"
            v-model="author"
            name="author"
            v-validate="'required'"
          />
        </b-form-fieldset>
        <b-form-fieldset
          label="Comentario acerca del sitio"
          :feedback="errors.first('comment')"
          :state="errors.has('comment') ? 'warning' : 'success'"
          :label-size="1"
        >
          <b-form-input class="mt-1"
            textarea
            type="text"
            v-model="comment"
            name="comment"
            v-validate="'required'"
          />
        </b-form-fieldset>
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
  import VeeValidate from 'vee-validate';

  Vue.use(VeeValidate);

  export default {
    data: () => ({
      score: 0, author: "", comment: "",
    }),
    name: 'Site',

    components: {
      StarRating
    },

    computed: mapGetters(['currentSite']),

    methods: {
      formatDate,

      getSiteScore,

      setScore (rating) {
        this.score = Number(rating)
      },

      clearModal () {
        this.score = 0;
        this.author = "";
        this.comment = "";
      },

      getReview() {
        let review = {};
        review.score = this.score;
        review.author = this.author;
        review.comment = this.comment;
        return review
      },

      submit (e) {
        this.$validator.validateAll().then( () => {
          this.addReview();
        }).catch(() => {
          return e.cancel()
        });
      },

      addReview () {
        let reviewToAdd = this.getReview();
        sendRegisterAReview(reviewToAdd, this.currentSite.id).then((response) => {
          this.currentSite.reviews.unshift(response)
        }).catch(error => { alert(error) });
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
