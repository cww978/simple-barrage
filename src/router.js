import Vue from "vue";
import Router from "vue-router";
import Barrage from "./views/Barrage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "barrage",
      component: Barrage
    },
    {
      path: "/barrage",
      name: "Barrage",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Barrage.vue")
    }
  ]
});
