import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { checkLogin } from "@/http/login";
import Cookies from "js-cookie";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login/login.vue')
  },
  {
    path: '/homepage',
    name: 'HomePage',
    component: () => import('../views/HomePage/homepage.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Welcome',
        component: () => import('../views/Welcome/welcome.vue')
      },
      {
        path: '/tag',
        name: 'Tag',
        component: () => import('../views/Tag/tag.vue')
      },
      {
        path: '/chat',
        name: 'Chat',
        component: () => import('../views/Chat/chat.vue')
      },
      {
        path: '/photo',
        name: 'Photo',
        component: () => import('../views/Photo/photo.vue')
      },
      {
        path: '/photo/:id',
        name: 'Picture',
        component: () => import('../views/Picture/picture.vue')
      },
      {
        path: '/link',
        name: 'Link',
        component: () => import('../views/Link/link.vue')
      },
      {
        path: '/article',
        name: 'Article',
        component: () => import('../views/Article/article.vue')
      },
      {
        path: '/article/add',
        name: 'AddArticle',
        component: () => import('../views/AddArticle/addArticle.vue')
      },
      {
        path: '/article/edit/:id',
        name: 'EditArticle',
        component: () => import('../views/AddArticle/addArticle.vue')
      },
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    if (Cookies.get("blog_token")) {
      next({ name: 'Welcome' })
    } else {
      next()

    }
  } else {
    checkLogin().then(res => {
      if (res.code == 200) {
        next()
      } else {
        next({ name: 'Login' })
      }
    })
  }
})

export default router
