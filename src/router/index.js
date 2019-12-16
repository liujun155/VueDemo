import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login", //设置默认指向的路径
    name: "登录"
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/menuview",
    name: "menuview",
    component: () => import("../views/MenuView.vue"),
    meta: { isLogin: true }
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: () => import("../views/Login.vue")
  // }
];

const router = new VueRouter({
  mode: "history", //去除url中的#
  routes
});

//导航前守卫(跳转前)
router.beforeEach(function(to, from, next) {
  // to: 表示要跳转的页面。from:表示从哪个页面来
  let islogin = sessionStorage.isLogin; // 是否已登录
  if (islogin == null || islogin == undefined) islogin = false;
  else islogin = Boolean(Number(islogin));
  //不能直接使用to.meta.isLogin的值，这样的话只是跳转到home.vue时会被拦截，但是如果直接在地址栏访问home.vue的子页面就不会进行拦截
  let require = to.matched.some(function(item) {
    // 是否需要登录
    return item.meta.isLogin;
  });
  console.log(islogin + "," + require);
  if (!islogin && require) {
    // 当未登录，且跳转的页面需要登录后才能操作时，进行路由拦截
    console.log("未登录");
    next("/login");
  } else {
    // 已登录就正常跳转，不做任何拦截
    next(); // 正常跳转到下一页
  }
});

export default router;
