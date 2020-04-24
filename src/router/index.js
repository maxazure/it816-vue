import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'index',
    component: () => import("../views/index.vue"),
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: () => import("../views/Home.vue"),
      },
      {
        path: '/library',
        name: 'library',
        component: () => import("../views/Library.vue"),
      },
      {
        path: '/me',
        name: 'me',
        component: () => import("../views/Me.vue"),
      },
    ]

  },
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/Login.vue")
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import("../views/Reg.vue")
  },
  {
    path: '/updateinfo',
    name: 'updateinfo',
    component: () => import("../views/UpdateInfo.vue")
  },
  {
    path: '/updateintro',
    name: 'updateintro',
    component: () => import("../views/UpdateIntro.vue")
  },
  {
    path: '/updatepwd',
    name: 'updatepwd',
    component: () => import("../views/UpdatePwd.vue")
  },
  {
    path: '/sentences',
    component: () => import("../views/sentences"),

    children: [
      {
        path: '/sentences',
        redirect: '/newsentence',
      },
      {
        path: '/newsentence',
        name: 'enewsentence',
        component: () => import("../views/sentences/New.vue")
      },
      {
        path: '/editsentence/:id',
        name: 'editsentence',
        component: () => import("../views/sentences/Edit.vue")
      },
      {
        path: '/showsentence/:id',
        name: 'showsentence',
        component: () => import("../views/sentences/Show.vue")
      },
    ]
  },
  {
    path: '/catalogs',
    component: () => import("../views/catalogs/index.vue"),
    children: [
      {
        path: '/catalogs',
        redirect: '/catalogs/new',
      },
      {
        path: '/catalogs/new',
        name: 'newcatalog',
        component: () => import("../views/catalogs/New.vue")
      },
      {
        path: '/catalogs/edit/:id',
        name: 'editcatalog',
        component: () => import("../views/catalogs/Edit.vue")
      },
      {
        path: '/catalogs/list/:id',
        name: 'listcatalog',
        component: () => import("../views/catalogs/List.vue")
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const IsLogin = localStorage.max_login ? true : false;
  if (to.path == '/login' || to.path == '/signup') {
    next();
  } else {
    IsLogin ? next() : next("/login");
  }
})

export default router
