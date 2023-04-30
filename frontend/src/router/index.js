import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tour',
    component: () => import('../views/Tour.vue')
  },
  {
    path: '/tour/:id',
    name: 'detail',
    component: () => import('../views/DetailTour.vue')
  },
  {
    path: '/tour/:id/form',
    name: 'form',
    component: () => import('../views/Form.vue')
  },
  {
    path: '/tour/confirm/:id',
    name: 'confirm',
    component: () => import('../views/ConfirmTour.vue')
  },
  {
    path: '/tour/payment/:id',
    name: 'payment',
    component: () => import('../views/Payment.vue')
  },
  {
    path: '/tour/status/:id',
    name: 'status',
    component: () => import('../views/Status.vue')
  },
  


  // Admin
  {
    path: '/admin/home',
    name: 'home',
    component: () => import('../views/admin/adminHome.vue')
  },
  {
    path: '/admin/allTour',
    name: 'admintour',
    component: () => import('../views/admin/adminToure.vue')
  },
  {
    path: '/admin/tourdetail/:tourName',
    name: 'alluser',
    component: () => import('../views/admin/adminUser.vue')
  },
  {
    path: '/admin/pay',
    name: 'pay',
    component: () => import('../views/admin/adminPayment.vue')
  },
  {
    path: '/admin/approve',
    name: 'pass',
    component: () => import('../views/admin/adminApprove.vue')
  },
  {
    path: '/admin/reject',
    name: 'notpass',
    component: () => import('../views/admin/adminReject.vue')
  },
  {
    path: '/admin/manage',
    name: 'manage',
    component: () => import('../views/admin/adminManage.vue')
  },
  {
    path: '/admin/info/:id',
    name: 'info',
    component: () => import('../views/admin/adminUserInfo.vue')
  },
  {
    path: '/admin/update/:id',
    name: 'edit',
    component: () => import('../views/admin/adminEditTour.vue')
  },
  {
    path: '/admin/createtour',
    name: 'create',
    component: () => import('../views/admin/adminCreateTour.vue')
  },
  {
    path: '/admin/slip/:id',
    name: 'slip',
    component: () => import('../views/admin/adminSlip.vue')
  },
  {
    path: '/admin/login',
    name: 'login',
    component: () => import('../views/admin/AdminLogin.vue')
  },
  {
    path: '/statusUser',
    name: 'statusCheck',
    component: () => import('../views/CheckStatus.vue')
  }

  


  
]

const router = new VueRouter({
  routes
})

export default router
