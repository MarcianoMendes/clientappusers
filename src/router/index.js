import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import UsersView from "../views/UsersView.vue";
import EditView from "../views/EditView.vue";
import axios from "axios";

function adminAuth(to, from, next) {
  if (localStorage.getItem("token") != undefined) {
    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .post("http://localhost:8686/validate", {}, req)
      .then(() => {
        next();
      })
      .catch((err) => {
        console.log(err.response);
        next("/login");
      });

    return;
  }

  next("/login");
}

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/admin/users",
    name: "users",
    component: UsersView,
    beforeEnter: adminAuth,
  },
  {
    path: "/admin/users/edit/:id",
    name: "user_edit",
    component: EditView,
    beforeEnter: adminAuth,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
