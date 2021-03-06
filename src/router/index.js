import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase/app";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: "main",
      auth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
    meta: {
      layout: "empty"
    }
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import("../views/Categories"),
    meta: {
      layout: "main",
      auth: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register"),
    meta: {
      layout: "empty"
    }
  },
  {
    path: "/detail-record/:id",
    name: "DetailRecord",
    component: () => import("../views/DetailRecord"),
    meta: {
      layout: "main",
      auth: true
    }
  },
  {
    path: "/history",
    name: "History",
    component: () => import("../views/History"),
    meta: {
      layout: "main",
      auth: true
    }
  },
  {
    path: "/planning",
    name: "Planning",
    component: () => import("../views/Planning"),
    meta: {
      layout: "main",
      auth: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile"),
    meta: {
      layout: "main",
      auth: true
    }
  },
  {
    path: "/record",
    name: "Record",
    component: () => import("../views/Record"),
    meta: {
      layout: "main",
      auth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);
  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
