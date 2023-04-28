import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import HomeView from '../views/HomeView.vue'


import ProductView from '../views/ProductView.vue'
import CategoryView from '../views/CategoryView.vue'
import SearchView from '../views/SearchView.vue'
import CartView from '../views/CartView.vue'
import SignUpView from '../views/SignUpView.vue'
import LogInView from '../views/LogInView.vue'
import MyAccountView from '../views/MyAccountView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import SuccessView from '../views/SuccessView.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'AboutView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUpView
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogInView
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccountView,
    meta: {
        requireLogin: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchView
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView
  },
  {
    path: '/cart/success',
    name: 'SuccessView',
    component: SuccessView
  },
  {
    path: '/cart/checkout',
    name: 'CheckoutView',
    component: CheckoutView,
    meta: {
        requireLogin: true
    }
  },
  {
    path: '/:category_slug/:product_slug',
    name: 'Product',
    component: ProductView
  },
  {
    path: '/:category_slug',
    name: 'Category',
    component: CategoryView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'LogIn', query: { to: to.path } });
  } else {
    next()
  }
})

export default router
