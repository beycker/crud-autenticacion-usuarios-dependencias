<template>
   <div id="app">
    <div class="tabs">
      <ul>
        <li v-bind:class="{ 'is-active': isActive == 'pictures' }"><a v-on:click="isActive = 'pictures'">Crear Usuarios</a></li>
        <li v-bind:class="{ 'is-active': isActive == 'music' }"><a v-on:click="isActive = 'music'">Listar Usuarios</a></li>
        <li v-bind:class="{ 'is-active': isActive == 'videos' }"><a v-on:click="isActive = 'videos'">Videos</a></li>
        <li v-bind:class="{ 'is-active': isActive == 'documents' }"><a v-on:click="isActive = 'documents'">Documents</a></li>
      </ul>
    </div>
    <div class="tab-contents">
      <div class="content" v-bind:class="{ 'is-active': isActive == 'pictures' }">
        <div class="container mt-50">
          <div class="columns">
            <div class="column is-6 is-offset-3">
              <h3 class="title is-3">Crear un usuario</h3><hr>
              <form action="#" @submit.prevent="register">
                
                <div class="field">
                  <label class="label">Nombres</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="e.g Alex Smith" v-model="usuario.nombres">
                  </div>
                </div>

                <div class="field">
                  <label class="label">Apellidos</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="e.g. alexsmith@gmail.com" v-model="usuario.apellidos">
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
                    <input class="input" type="password" placeholder="e.g. alexsmith@gmail.com" v-model="usuario.password">
                  </div>
                </div>

                <div class="field">
                  <label class="label">Dependencia</label>
                  <div class="select">
                    <select v-model="usuario.dependencia">
                        <option v-for="dependencia in dependencias" :key="dependencia.id">{{ dependencia.nombre }}</option>
                        
                    </select>
                   </div>
                </div>

                 <div class="field">
                  <label class="label">Activo</label>
                  <div class="select">
                    <select v-model="usuario.activo">
                        <option>Si</option>
                        <option>No</option>
                    </select>
                   </div>
                </div>

                

                <button type="submit" class="button is-primary">Crear</button>
              </form>

              <div class="notification is-danger mt-10" v-if="error">  
                {{ error }}
              </div>

            </div>
          </div>
    </div>
      </div>
      <div class="content" v-bind:class="{ 'is-active': isActive == 'music' }">
        
        <table class="table">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Email</th>
              <th>Dependencia</th>
              <th>Activo</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usert in usuarios" :key="usert.email">
              <td>{{usert.nombres}}</td>
              <td>{{usert.apellidos}}</td>
              <td>{{usert.email}}</td>
              <td>{{usert.dependencia}}</td>
              <td>{{usert.activo}}</td>
              <td><button type="submit" class="button is-primary" @click.prevent="editar">Editar</button></td>
              <td><button type="submit" class="button is-primary" @click.prevent="eliminar">Eliminar</button></td>
            </tr>
          </tbody>
        </table>

      </div>
      <div class="content" v-bind:class="{ 'is-active': isActive == 'videos' }">
        Videos content
      </div>
      <div class="content" v-bind:class="{ 'is-active': isActive == 'documents' }">
        Documents content
      </div>
    </div>
  </div>

</template>

<script>
//import '@vizuaalog/bulmajs';
//import 'bulma'
import db from '../firebase/init'
import firebase from 'firebase'
export default {
  data() {
    return {
      isActive: 'pictures',
      ref: db.collection('users'),
      usuario: {},
      usuarios: [],
      dependencias: [],
      dependenciatemp: '',
      error: ''
    }
  }, name : 'Dashboard',
  created(){
      this.listarDependencias();
      this.listarUsuarios()
  },
  methods: {
    async listarDependencias(){
        try {
            const resDB = await db.collection('dependencias').get()

            resDB.forEach(res => {
                //console.log(res);
                const dep = {
                    id: res.id,
                    nombre: res.data().nombre,
                    coordinador: res.data().coordinador,
                    maximo: res.data().maximo,
                    ubicacion: res.data().ubicacion,
                    activa: res.data().activa,
                    users: res.data().users
                }
                this.dependencias.push(dep)

                console.log(this.dependencias)
            });
        } catch (error) {
            console.log(error)
        }
    },
    async listarUsuarios(){
      try {
        const resDB = await db.collection('users').get()
        resDB.forEach(res => {
            //console.log(res);
            const us = {
              
                nombres: res.data().nombres,
                apellidos: res.data().apellidos,
                email: res.data().email,
                password: res.data().password,
                dependencia: res.data().dependencia,
                activo: res.data().activo
            }
            this.usuarios.push(us)

            //console.log(this.dependencias)
        });
      } catch (error) {
        console.log(error)
      }
    },
    register(){

      this.error = ''
      if (this.usuario.nombres && this.usuario.apellidos && this.usuario.email && this.usuario.password) {
        firebase.auth().createUserWithEmailAndPassword(this.usuario.email, this.usuario.password)
          .then(user => {
            //actualizar el usuario
            if (user) {         


              this.dependenciatemp = this.dependencias.find(element => element.nombre === this.usuario.dependencia);
              this.dependenciatemp.users.push({
                nombre: this.usuario.nombres, 
                email: this.usuario.email
              });

              const updateRef = db.collection('dependencias').doc(this.dependenciatemp.id);
              updateRef.set(this.dependenciatemp).then((docRef) => {
                console.log(docRef)
              })

              this.ref.add(this.usuario).then((docRef) =>{
                console.log(docRef);
                this.usuario.nombres = ''
                this.usuario.apellidos = ''
                this.usuario.email = ''
                this.usuario.password = ''
                this.$router.push({name: 'usuarios'})  
              })
                 
            }            
          }).catch(err => {
            this.error = err.message
          })
      }else {
        this.error = 'Todos los campos son requeridos'
      }
    },
    editar(){
      console.log("editar")
    },
    eliminar(){
      console.log("eliminar")
    }
  }
}
</script>

<style scoped>
.tab-contents .content {
  display: none;
}
.tab-contents .content.is-active {
  display: block;
}
</style>