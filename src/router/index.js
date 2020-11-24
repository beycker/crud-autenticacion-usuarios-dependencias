import Vue from 'vue'
import Router from 'vue-router'
//import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Usuarios from '../views/Usuarios.vue'
//import Wall from '../views/Wall.vue'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'usuarios',
      component: Usuarios
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: Usuarios,
      meta: {
        requiresAuth: true
      }
    }        
  ]
});


router.beforeEach((to, from, next) => {
    if (to.matched.some(ruta => ruta.meta.requiresAuth)) {
      const user = firebase.auth().currentUser;
      if (user) {
        next();
      } else {
        next({
          name: 'login'
        })
      }
    } else {
      next();
    }
})



export default router;
