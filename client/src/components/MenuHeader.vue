<template>
  <section>
    <div class="columns">
      <div class=" column is-12">
        <div class="header--cowrapper">
          <b-navbar type="is-primary">
            <template slot="start">
              <b-navbar-item tag="router-link" to="/home">Home</b-navbar-item>
              <!-- Users -->
              <b-navbar-dropdown v-if="isAdmin" label="Usuários">
                <b-navbar-item tag="router-link" to="/register-user">Cadastrar</b-navbar-item>
                <b-navbar-item tag="router-link" to="/user-list">Listar</b-navbar-item>
              </b-navbar-dropdown>

              <!-- Matters -->
              <b-navbar-dropdown v-if="isAdmin" label="Disciplinas">
                <b-navbar-item tag="router-link" to="/register-matter">Cadastrar</b-navbar-item>
                <b-navbar-item tag="router-link" to="/matters-list">Listar</b-navbar-item>
              </b-navbar-dropdown>

              <!-- Courses -->
              <b-navbar-dropdown v-if="isAdmin" label="Cursos">
                <b-navbar-item tag="router-link" to="/register-course">Cadastrar</b-navbar-item>
                <b-navbar-item tag="router-link" to="/courses-list">Listar</b-navbar-item>
              </b-navbar-dropdown>

              <!-- Questions -->
              <b-navbar-dropdown v-if="isAdmin" label="Perguntas">
                <b-navbar-item tag="router-link" to="/register-question">Cadastrar</b-navbar-item>
                <b-navbar-item tag="router-link" to="/question-list">Listar</b-navbar-item>
              </b-navbar-dropdown>

              <!-- Surveys -->
              <b-navbar-item v-if="isAdmin" tag="router-link" to="/register-survey">Novo Questionário</b-navbar-item>
              <!-- <b-navbar-dropdown v-if="isAdmin" label="Questionários">
                <b-navbar-item tag="router-link" to="/register-survey">Cadastrar</b-navbar-item>
                <b-navbar-item tag="router-link" to="">Listar</b-navbar-item>
              </b-navbar-dropdown> -->

              <!-- Matters -->
              <b-navbar-item v-if="!isAdmin" tag="router-link" to="/profile">Perfil</b-navbar-item>

              <b-navbar-item v-if="isAdmin" tag="router-link" to="/get-report">Relatório</b-navbar-item>
            </template>

            <template slot="end">
              <b-navbar-item tag="div">
                <b-button type="is-primary" @click="logout">
                  Sair
                </b-button>
              </b-navbar-item>
            </template>
          </b-navbar>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'menu-header',
  methods: {
    logout() {
      this.$store.commit('loading', true)
      this.$store.dispatch('logout')
        .then(resp => {
          this.$router.push('/')
          this.$store.commit('loading', false)
        })
        .catch(e => {
          this.$store.commit('loading', false)
        })
    }
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('userType') === 'admin'
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
