<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-gray"></i>
        M-BILLS
        <i class="fa fa-circle text-warning"></i>
      </h5>
      <Widget class="widget-auth mx-auto blur" title="<h3 class='mt-0'>Criar Conta</h3>" customHeader>
        
        <form class="mt" @submit.prevent="register">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <div class="form-group">
            <input class="form-control no-border"
                   ref="email" type="email" required name="email"
                   placeholder="Email"/>
          </div>
          <div class="form-group">
            <input class="form-control no-border"
                   ref="password" type="password" required name="password"
                   placeholder="Senha"/>
          </div>
          <div class="form-group">
            <input class="form-control no-border"
                   ref="confirmPassword" @blur="checkPassword" type="password" required
                   name="confirmPassword"
                   placeholder="Confirme"/>
          </div>
          <b-button type="submit" variant="inverse" class="auth-btn mb-3" size="sm">{{this.isFetching ? 'Loading...' : 'Register'}}</b-button>
          <!-- <p class="widget-auth-info">or sign up with</p>
          <div class="social-buttons">
            <b-button @click="googleLogin" variant="primary" class="social-button mb-2">
              <i class="social-icon social-google"></i>
              <p class="social-text">GOOGLE</p>
            </b-button>
            <b-button @click="microsoftLogin" variant="success" class="social-button">
              <i class="social-icon social-microsoft"></i>
              <p class="social-text">MICROSOFT</p>
            </b-button>
          </div> -->
        </form>
        <p class="widget-auth-info">
          Ja tem uma conta? Entre agora!
        </p>
        <router-link class="d-block text-center" to="login">Entre com sua conta</router-link>
      </Widget>
    </b-container>
   <footer class="auth-footer">
      2021 &copy; Mabillas App Powered By - Made by <a href="https://pavulla.com/">Pavulla, Lda.</a>
    </footer>
  </div>
</template>
<script>
  import Widget from '../../components/Widget/Widget';
  import {mapActions, mapState} from 'vuex';

  export default {
    name: 'RegisterPage',
    components: {Widget},
    computed: {
      ...mapState('register', {
        isFetching: state => state.isFetching,
        errorMessage: state => state.errorMessage,
      }),
    },
    methods: {
      ...mapActions('register', ['registerUser', 'registerError']),
      ...mapActions('auth', ['loginUser']),
      register() {
        const email = this.$refs.email.value;
        const password = this.$refs.password.value;

        if (!this.isPasswordValid()) {
          this.checkPassword();
        } else {
          this.registerUser({creds: {email, password}, $toasted: this.$toasted});
        }
      },
      googleLogin() {
        this.loginUser({social: "google"});
      },
      microsoftLogin() {
        this.loginUser({social: "microsoft"});
      },
      checkPassword() {
        if (!this.isPasswordValid()) {
          if (!this.$refs.password.value) {
            this.registerError("O campo senha esta vazio");
          } else {
            this.registerError("As senhas nao coincidem");
          }
          setTimeout(() => {
            this.registerError();
          }, 3 * 1000)
        }
      },
      isPasswordValid() {
        return this.$refs.password.value && this.$refs.password.value === this.$refs.confirmPassword.value;
      }
    },
  }
</script>

<style scoped>

.auth-page{

/* background: rgb(255,255,255);
background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(215,249,255,1) 100%); */
}

.blur{
background: rgb(253, 253, 253) ;
box-shadow: 0 0 15px rgba(0, 0, 0, 0.137);
}
</style>