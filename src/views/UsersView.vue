<template>
  <div>
    <h1>Painel Administrativo</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Cargo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ processRole(user.cargo) }}</td>
          <td class="buttons">
            <button class="button is-success">Editar</button>
            <button class="button is-danger" @click="showModalDialog(user.id)">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div :class="{ modal: true, 'is-active': showModal }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Confirmação de ação</p>
        </header>
        <div class="card-content">
          <div class="content">
            <p>
              Excluir Usuário? Após confirmação a ação não pode ser desfeita!
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <button class="card-footer-item" @click="hideModal()">
            Cancelar
          </button>
          <button href="#" class="card-footer-item" @click="deleteUser()">
            Confirmar
          </button>
        </footer>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="hideModal()"
    ></button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .get("http://localhost:8686/user", req)
      .then((res) => {
        console.log(res);
        this.users = res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("ola");
  },
  data() {
    return {
      users: [],
      showModal: false,
      deleteUserId: -1,
    };
  },
  methods: {
    hideModal() {
      this.showModal = false;
    },
    showModalDialog(id) {
      this.deleteUserId = id;
      this.showModal = true;
    },
    deleteUser() {
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      axios
        .delete("http://localhost:8686/user/" + this.deleteUserId, req)
        .then(() => {
          this.showModal = false;
          this.users = this.users.filter(
            (user) => user.id != this.deleteUserId
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },

    processRole(value) {
      if (value == 0) {
        return "Usuário comum";
      }

      return "Administrador";
    },
  },
};
</script>

<style scoped></style>
