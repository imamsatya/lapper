
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/S-Login.vue')
    }]

  },
  {
    path: '/home',
    meta: {
      kunci: true
    },
    component: () => import('layouts/S-Layout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Index.vue')
    }]
  },
  {
    path: '/rekap',
    meta: {
      kunci: true
    },
    component: () => import('layouts/S-Layout.vue'),
    children: [{
      path: '',
      component: () => import('pages/S-Rekap.vue')
    }]
  },
  {
    path: '/about',
    meta: {
      kunci: true
    },
    component: () => import('layouts/S-Layout.vue'),
    children: [{
      path: '',
      component: () => import('pages/S-About.vue')
    }]
  }

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
