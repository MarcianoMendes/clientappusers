<template>
  <div>
    <h2>Login</h2>
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="notification is-danger" v-if="error != undefined">
          {{ error }}
        </div>
        <p>E-mail</p>
        <input
          type="email"
          v-model="email"
          placeholder="email@email.com"
          class="input"
        />
        <p>Senha</p>
        <input
          type="password"
          v-model="password"
          placeholder="******"
          class="input"
        />
        <button class="button is-success" @click="login">Logar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: undefined,
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:8686/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          this.error = err.response.data.message;
        });
    },
  },
};
</script>

<style></style>
