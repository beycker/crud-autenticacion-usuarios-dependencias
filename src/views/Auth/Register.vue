<template>
  <div class="container mt-50">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Crear una cuenta</h3><hr>
        <form action="#" @submit.prevent="register">
          
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="e.g Alex Smith" v-model="usuario.name">
            </div>
          </div>

          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="email" placeholder="e.g. alexsmith@gmail.com" v-model="usuario.email">
            </div>
          </div>

          <div class="field">
            <label class="label">Contraseña</label>
            <div class="control">
              <input class="input" type="password" v-model="usuario.password">
            </div>
          </div>

          <button type="submit" class="button is-primary">Registrarme</button>
        </form>

        <div class="notification is-danger mt-10" v-if="error">          
          {{ error }}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import db from '../../firebase/init'
import firebase from 'firebase'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      error: '',
      ref: db.collection('users'), 
      usuario: {}
    }
  },
  name: 'Register',
  methods: {
    register() {
      this.error = ''
      if (this.usuario.name && this.usuario.email && this.usuario.password) {
        firebase.auth().createUserWithEmailAndPassword(this.usuario.email, this.usuario.password)
          .then(user => {
            //actualizar el usuario
            if (user) {         
                
                this.ref.add(this.usuario).then((docRef) =>{
                  console.log(docRef);
                  this.usuario.name = ''
                  this.usuario.email = ''
                  this.usuario.password = ''
                  this.$router.push({name: 'dashboard'})  
                })
                 

                /* 
              user.updateProfile({
                displayName: this.name                
              }).then((u) => {
                this.name = ''
                this.email = ''
                this.password = ''
                this.$router.push({name: 'dashboard'})    
                console.log(u);                            
              }).catch((err) => {
                this.error = err.message
              })          
        */
            }            
          }).catch(err => {
            this.error = err.message
          })
      }else {
        this.error = 'Todos los campos son requeridos'
      }
    }
  }
}
</script>
