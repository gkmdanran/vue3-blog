import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

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
    children: [
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

export default router
