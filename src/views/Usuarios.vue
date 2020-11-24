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
                    <input class="input" type="text" placeholder="e.g Alex Smith" v-model="usuario.firtsname">
                  </div>
                </div>

                <div class="field">
                  <label class="label">Apellidos</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="e.g. alexsmith@gmail.com" v-model="usuario.lastname">
                  </div>
                </div>

                <div class="field">
                  <label class="label">Usuario</label>
                  <div class="control">
                    <input class="input" type="email" placeholder="e.g. alexsmith@gmail.com" v-model="usuario.username">
                  </div>
                </div>

                <div class="field">
                  <label class="label">Contraseña</label>
                  <div class="control">
                    <input class="input" type="password" placeholder="e.g. alexsmith@gmail.com" v-model="usuario.password">
                  </div>
                </div>

                <div class="field">
                  <label class="label">Identificacion</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="e.g. alexsmith@gmail.com" v-model="usuario.identification">
                  </div>
                </div>

                <div class="field">
                  <label class="label">Foto</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="e.g. alexsmith@gmail.com" v-model="usuario.photo">
                  </div>
                </div>

                 <div class="field">
                  <label class="label">Activo</label>
                  <div class="select">
                    <select v-model="usuario.active">
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
              <th>Id</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Usuario</th>
              <th>Identificacion</th>
              <th>Foto</th>
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
              <td>{{usert.id}}</td>
              <td>{{usert.firtsname}}</td>
              <td>{{usert.lastname}}</td>
              <td>{{usert.username}}</td>
              <td>{{usert.identification}}</td>
              <td>{{usert.photo}}</td>
              <td>{{usert.active}}</td>
              <td><button type="submit" class="button is-primary" @click.prevent="editar()">Editar</button></td>
              <td><button type="submit" class="button is-primary" @click.prevent="eliminar(usert.id)">Eliminar</button></td>
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
import axios from "axios";
export default {
  data() {
    return {
      isActive: 'pictures',
      usuario: {},
      usuarios: [],
      data: '',
      error: ''
    }
  }, name : 'Usuarios',
  created(){
      this.listarUsuarios()
  },
  methods: {
    
    async listarUsuarios(){
      try {
        this.usuarios.splice(0, this.usuarios.length)

        await axios.get("http://localhost:3000/users/").then(res => {
          this.data = res.data;
          console.log(this.data);
          this.data.forEach(element => {
            const us = {
                id: element._id,
                firtsname: element.firtsname,
                lastname: element.lastname,
                username: element.username,
                identification: element.identification,
                password: element.password,
                photo: element.photo,
                active: element.active
            }
              
            this.usuarios.push(us)
          });
          
        });
      } catch (error) {
        console.log(error)
      }
      

    },
    async register(){

      if(this.usuario.active == "Si"){
        this.usuario.active = true;
      }else{
        this.usuario.active = false;
      }

      await axios.post("http://localhost:3000/users/", this.usuario).then((result) => {
        console.log(result);
      })

      this.listarUsuarios()
    },
    editar(){
    },
    async eliminar(id){
      await axios.delete("http://localhost:3000/users/" + id).then((result) => {
        console.log(result);
      });
      
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