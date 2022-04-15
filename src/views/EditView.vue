<template>
  <div>
    <h2>Edição de usuário</h2>
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
        <button class="button is-success" @click="update">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

var req = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

export default {
  created() {
    axios
      .get("http://localhost:8686/user/" + this.$route.params.id, req)
      .then((res) => {
        this.name = res.data.name;
        this.email = res.data.email;
        this.id = res.data.id;
      })
      .catch((err) => {
        console.log(err.response);
        this.$router.push({ name: "Users" });
      });
  },
  data() {
    return {
      name: "",
      email: "",
      id: -1,
      error: undefined,
    };
  },
  methods: {
    update() {
      axios
        .put(
          "http://localhost:8686/user",
          {
            name: this.name,
            email: this.email,
            id: this.id,
          },
          req
        )
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "users" });
        })
        .catch((err) => {
          this.error = err.response.data.message;
        });
    },
  },
};
</script>

<style></style>
