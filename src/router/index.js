import Vue from 'vue'
import Router from 'vue-router'
//import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Usuarios from '../views/Usuarios.vue'
//import Wall from '../views/Wall.vue'
import firebase from 'firebase'
import Editar from '../views/Editardep.vue'
import Editarusr from '../views/Editarusr.vue'
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
      path: '/dependencias',
      name: 'dependencias',
      component: Dependencias,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/detalle',
      name: 'detalle',
      component: Detalle,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editar',
      name: 'editar',
      component: Editar,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editarusr',
      name: 'editarusr',
      component: Editarusr,
      props: true,
      meta: {
        requiresAuth: true
      }
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
