<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-12">

          <!-- Success Message -->
          <b-message
            has-icon
            title="Sucesso"
            type="is-success"
            :active.sync="isSuccessActive"
            :duration="5000"
            aria-close-label="Fechar mensagem"
          >
            Sua resposta foi registrada, obrigado!.
          </b-message>

          <!-- Error Message -->
          <b-message
            has-icon
            title="Sucesso"
            type="is-danger"
            :active.sync="isErrorActive"
            :duration="5000"
            aria-close-label="Fechar mensagem"
          >
            Houve um erro ao registrar suas respostas, tente novamente mais tarde.
          </b-message>

          <h1 v-if="!isSuccessActive && !isErrorActive" class="title">{{ surveyData.name }}</h1>
          <card v-if="!isSuccessActive && !isErrorActive">
            <div
              v-for="(question, index) in surveyData.questions"
              :key="index"
              class="columns"
            >
              <div class="column is-6">
                <b-field :label="`${index+1}) ${question.statement}`">
                  <!-- Discursive question -->
                  <b-input
                    v-if="question.type === 'discursive'"
                    v-model="answers[index]"
                  />

                  <!-- Single answer question -->
                  <div v-else-if="question.type === 'multiple' && !question.allow_multiple">
                    <div
                      v-for="(alternative, indexAlternative) in question.alternatives"
                      :key="indexAlternative"
                      class="field"
                    >
                      <b-radio v-model="answers[index]" :native-value="alternative.description">
                        {{ alternative.description }}
                      </b-radio>
                    </div>
                  </div>

                  <!-- Multiple answer question -->
                  <div v-else>
                    <div
                      v-for="(alternative, indexAlternative) in question.alternatives"
                      :key="indexAlternative"
                      class="field"
                    >
                      <b-checkbox
                        v-model="tempAnswers"
                        @input="addMultiple(index)"
                        :native-value="alternative.description"
                        :name="`question${index}`"
                      >
                        {{ alternative.description }}
                      </b-checkbox>
                    </div>
                  </div>
                </b-field>
                <hr>
              </div>
            </div>
            <div class="align-buttons--center">
              <b-button type="is-primary" @click="linkQuestions">
                Enviar
              </b-button>
            </div>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getSurvey, saveSurveyAnswers } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'answer-survey',
  components: {
    Card
  },
  data() {
    return {
      answers: [],
      surveyData: [],
      totalQuestions: null,
      answeredQuestions: [],
      tempAnswers: [],
      answersQuestions: [],
      userId: null,
      isSuccessActive: false,
      isErrorActive: false,
    }
  },
  watch: {
    answers: function(newValue) {
      this.answeredQuestions = this.answers.filter((value, index) => {
        return value !== null && value !== ''
      })
    },
  },
  mounted() {
    this.$store.commit('loading', true)
    getSurvey(this.$route.params.idsurvey)
      .then(resp => {
        this.surveyData = resp
        this.$store.commit('loading', false)
      })
    this.userId = localStorage.getItem('userId')
  },
  methods: {
    addMultiple(index) {
      this.answers[index] = [...this.tempAnswers]
    },
    linkQuestions() {
      this.answers.map((el, index) => {
        this.answersQuestions[index] = {
            answer: el,
            question_id: this.surveyData.questions[index].id
          }
      })

      this.save()
    },
    save() {
      this.$store.commit('loading', true)
      saveSurveyAnswers({
        user_id: this.userId,
        survey_id: this.surveyData.id,
        answers: this.answersQuestions
      })
        .then(resp => {
          this.$store.commit('loading', false)
          this.isSuccessActive = true
        })
        .catch(err => {
          console.log(err)
          this.$store.commit('loading', false)
          this.isErrorActive = true
        })
    }
  },
  computed: {
    totalPercent() {
      const number = (this.answeredQuestions.length/this.surveyData.questions.length) * 100
      return number
    }
  },
}
</script>

<style lang="scss" scoped>

</style>