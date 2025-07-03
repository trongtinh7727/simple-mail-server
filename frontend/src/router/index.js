import Vue from "vue";
import VueRouter from "vue-router";
import EmailList from "../views/EmailList.vue";
import EmailDetail from "../views/EmailDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: EmailList
  },
  {
    path: "/email/:id",
    name: "email-detail",
    component: EmailDetail
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
