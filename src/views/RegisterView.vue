<template>
  <div>
    <h2>Registro de usuário</h2>
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="notification is-danger" v-if="error != undefined">
          {{ error }}
        </div>
        <p>Nome</p>
        <input
          type="text"
          v-model="name"
          placeholder="Nome do usuário"
          class="input"
        />
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
        <button class="button is-success" @click="register">Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: undefined,
    };
  },
  methods: {
    register() {
      axios
        .post("http://localhost:8686/user", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
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
