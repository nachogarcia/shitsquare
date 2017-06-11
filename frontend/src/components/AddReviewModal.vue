<template>
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
          v-validate.initial="'required'"
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
          v-validate.initial="'required'"
        />
      </b-form-fieldset>
    </form>
  </b-modal>
</template>

<script>
  import Factory from "../Factory"
  const factory = new Factory()
  const registerAReviewAction = factory.createRegisterAReviewAction()

  import { mapGetters } from 'vuex'
  import Vue from 'vue'
  import StarRating from 'vue-star-rating'
  import VeeValidate, { Validator } from 'vee-validate'
  import es from 'vee-validate/dist/locale/es'

  es.attributes = {
      author: 'Autor',
      score: 'Puntuación',
      comment: 'Comentario'
    };

  Validator.addLocale(es);
  Vue.use(VeeValidate, { locale: 'es' });

  export default {
    name: 'AddReviewModal',

    data: () => ({
      score: 0, author: "", comment: "",
    }),

    components: {
      StarRating
    },

    computed: mapGetters(['currentSite']),

    methods: {
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
        if (this.errors.any() || this.score == 0) { return e.cancel() }
        this.addReview();
      },

      addReview () {
        let reviewToAdd = this.getReview();
        registerAReviewAction.run(reviewToAdd, this.currentSite.id).then((response) => {
          this.currentSite.reviews.unshift(response)
        }).catch(error => { alert(error) });
      },
    },
  }
</script>
