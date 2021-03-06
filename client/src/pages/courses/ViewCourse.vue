<template>
  <section class="section">
    <div class="container">
      <div v-if="courseData" class="columns">
        <div class="column is-12">
          <!-- Success Message -->
          <b-message 
            auto-close 
            has-icon
            title="Sucesso" 
            type="is-success"
            :active.sync="isSuccessActive"
            :duration="5000"
            aria-close-label="Fechar mensagem"
          >
            Curso alterado com sucesso!
          </b-message>

          <!-- Error Message -->
          <b-message 
            auto-close 
            has-icon
            title="Sucesso" 
            type="is-danger"
            :active.sync="isErrorActive"
            :duration="5000"
            aria-close-label="Fechar mensagem"
          >
            Houve um erro ao tentar salvar o curso, verifique os dados digitados e tente novamente.
          </b-message>

          <h1 class="title">{{ courseData.name }}</h1>
          <card>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Nome">
                  <b-input :disabled="!edit" v-model="courseData.name" />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-6">
                <b-field label="Período">
                  <b-select
                    :disabled="!edit"
                    v-model="courseData.period"
                    placeholder="Selecione"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </b-select>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class=" column is-6">
                <b-field label="Disciplinas">
                  <multiselect
                    v-if="mattersList"
                    v-model="courseData.Matter"
                    :options="mattersList"
                    :multiple="true"
                    :close-on-select="false"
                    :max="6"
                    :disabled="!edit"
                    searchable
                    track-by="name"
                    label="name"
                    placeholder="Selecione as disciplinas"
                    selectLabel="Selecionar"
                    selectedLabel="Selecionado"
                    deselectLabel="Remover"
                  >
                    <template slot="maxElements">
                      Você pode selecionar no máximo 6 disciplinas.
                    </template>
                  </multiselect>
                </b-field>
              </div>
            </div>

            <div class="align-buttons--right">
              <div class="buttons">
                <b-button
                  v-if="!edit"
                  type="is-primary"
                  @click="enableEdit"
                >
                  Editar
                </b-button>
                <b-button v-else type="is-primary" @click="save">
                  Enviar
                </b-button>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getCourse, getMatters, updateCourse } from '@/services/api'

import Card from  '@/components/Card'

export default {
  name: 'view-question',
  components: {
    Card
  },
  data() {
    return {
      courseData: null,
      edit: false,
      isSuccessActive: false,
      isErrorActive: false,
      mattersList: null,
    }
  },
  mounted() {
    this.$store.commit('loading', true)

    getCourse(this.$route.params.id)
      .then(resp => {
        this.courseData = resp
        this.$store.commit('loading', false)  
      })

    getMatters()
        .then(resp => {
          this.mattersList = resp
          this.$store.commit('loading', false)
        })

    if (this.$route.params.viewtype === 'edit') {
      this.enableEdit()
    }
  },
  methods: {
    enableEdit() {
      this.edit = true
    },
    save() {
      this.$store.commit('loading', true)
      updateCourse(
        this.courseData.id,
        {
          name: this.courseData.name,
          period: this.courseData.period,
          matters: this.courseData.Matter,
        }
      )
        .then(resp => {
          this.$store.commit('loading', false)
          this.isSuccessActive = true
        })
        .catch(err => {
          this.$store.commit('loading', false)
          this.isErrorActive = true
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>