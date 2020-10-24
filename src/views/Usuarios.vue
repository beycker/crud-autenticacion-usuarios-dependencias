<template>
   <div id="app">
    <div class="tabs">
      <ul>
        <li v-bind:class="{ 'is-active': isActive == 'pictures' }"><a v-on:click="isActive = 'pictures'">Crear Usuarios</a></li>
        <li v-bind:class="{ 'is-active': isActive == 'music' }"><a v-on:click="isActive = 'music'">Listar Usuarios</a></li>
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
                  <label class="label">Valido hasta</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="e.g. alexsmith@gmail.com" v-model="usuario.validohasta">
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

                

                <button type="submit" class="button is-primary" @click.prevent="register()" >Crear</button>
              </form>

              <div class="notification is-danger mt-10" v-if="error">  
                {{ error }}
              </div>

            </div>
          </div>
    </div>
      </div>
      <div class="content" v-bind:class="{ 'is-active': isActive == 'music' }">
        
         <div class="field has-addons has-addons-centered">
          <p class="control">
            <input class="input" type="text" v-model="search" placeholder="Por ejemplo Andrés"/>
          </p>
          <p class="control">
            <a class="button is-primary"  @click.prevent="filtrarUsuariosN()"> Buscar por nombre </a>
          </p>
        </div>

              <div class="field has-addons has-addons-centered">
          <p class="control">
            <input class="input" type="text" v-model="searchd" placeholder="Por ejemplo Ventas"/>
          </p>
          <p class="control">
            <a class="button is-primary"  @click.prevent="filtrarUsuariosD()"> Buscar por dependencia </a>
          </p>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Email</th>
              <th>Dependencia</th>
              <th>Valido hasta</th>
              <th>Activo</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody v-if="this.usuariosBuscados.length>0">
            <tr v-for="usert in usuariosBuscados" :key="usert.email">
              <td>{{usert.nombres}}</td>
              <td>{{usert.apellidos}}</td>
              <td>{{usert.email}}</td>
              <td>{{usert.dependencia}}</td>
              <td>{{usert.validohasta}}</td>
              <td>{{usert.activo}}</td>
              <td><button type="submit" class="button is-primary" @click.prevent="editar(usert)">Editar</button></td>
              <td><button type="submit" class="button is-primary" @click.prevent="eliminar(usert)">Eliminar</button></td>
            </tr>
          </tbody>

          <tbody v-if="this.usuariosBuscados.length==0">
            <tr v-for="usert in usuarios" :key="usert.email">
              <td>{{usert.nombres}}</td>
              <td>{{usert.apellidos}}</td>
              <td>{{usert.email}}</td>
              <td>{{usert.dependencia}}</td>
              <td>{{usert.validohasta}}</td>
              <td>{{usert.activo}}</td>
              <td><button type="submit" class="button is-primary" @click.prevent="editar(usert)">Editar</button></td>
              <td><button type="submit" class="button is-primary" @click.prevent="eliminar(usert)">Eliminar</button></td>
            </tr>
          </tbody>
        </table>

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
      error: '',
      search: '',
      searchd: '',
      usuariosBuscados: [],
      
      
    }
  }, name : 'Usuarios',
  created(){
      this.listarDependencias();
      this.listarUsuarios()
  },
  methods: {

  filtrarUsuariosN(){
    this.usuariosBuscados = this.usuarios.filter(usuario => { 
    return usuario.nombres.toLowerCase().includes(this.search.toLowerCase()) 
    } 
   );
   },

   filtrarUsuariosD(){
     this.usuariosBuscados = this.usuarios.filter(usuario => {
       return usuario.dependencia.toLowerCase().includes(this.searchd.toLowerCase())
            })
   },

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
                console.log(this.dependencias)
                this.dependencias.push(dep)

                //console.log(this.dependencias)
            });
        } catch (error) {
            console.log(error)
        }
    },
    async listarUsuarios(){
      try {
        const resDB = await db.collection('users').get()

        this.usuarios.splice(0, this.usuarios.length)
        
        resDB.forEach(res => {
            //console.log(res);
            const us = {
                id: res.id,
                nombres: res.data().nombres,
                apellidos: res.data().apellidos,
                email: res.data().email,
                password: res.data().password,
                dependencia: res.data().dependencia,
                validohasta: res.data().validohasta,
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
                apellido: this.usuario.apellidos,
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
                this.usuario.validohasta = ''
                this.usuario.dependencia = ''
                this.usuario.activo = ''
                //this.$router.push({name: 'usuarios'})  
              })

              this.listarUsuarios()
                 
            }            
          }).catch(err => {
            this.error = err.message
          })
      }else {
        this.error = 'Todos los campos son requeridos'
      }
    },

    editar(usert){

      this.$router.push({ name: "editarusr", params: { usractual: usert } }) 
     
      },

    eliminar(usert){
      this.ref.doc(usert.id).delete();
      this.listarUsuarios()

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