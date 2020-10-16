<template>
   <div id="app">
    <div class="tabs">
      <ul>
        <li v-bind:class="{ 'is-active': isActive == 'pictures' }"><a v-on:click="isActive = 'pictures'">Crear Dependencia</a></li>
        <li v-bind:class="{ 'is-active': isActive == 'music' }"><a v-on:click="isActive = 'music'">Listar Dependencias</a></li>
        <li v-bind:class="{ 'is-active': isActive == 'videos' }"><a v-on:click="isActive = 'videos'">Videos</a></li>
        <li v-bind:class="{ 'is-active': isActive == 'documents' }"><a v-on:click="isActive = 'documents'">Documents</a></li>
      </ul>
    </div>
    <div class="tab-contents">
      <div class="content" v-bind:class="{ 'is-active': isActive == 'pictures' }">
        <div class="container mt-50">
          <div class="columns">
            <div class="column is-6 is-offset-3">
              <h3 class="title is-3">Crear una dependencia</h3><hr>
              <form action="#" @submit.prevent="register">
                
                <div class="field">
                  <label class="label">Nombre dependencia</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="e.g Alex Smith" v-model="dependencia.nombre">
                  </div>
                </div>

                <div class="field">
                  <label class="label">Coordinador</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="e.g. alexsmith@gmail.com" v-model="dependencia.coordinador">
                  </div>
                </div>

                <div class="field">
                  <label class="label">Maximo numero de usuarios</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="e.g. alexsmith@gmail.com" v-model="dependencia.maximo">
                  </div>
                </div>

                <div class="field">
                  <label class="label">Ubicación</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="e.g. alexsmith@gmail.com" v-model="dependencia.ubicacion">
                  </div>
                </div>

                <div class="field">
                  <label class="label">Activa?</label>
                  <div class="select">
                  <select v-model="dependencia.activa">
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
              <th>Dependencia</th>
              <th>Coordinador</th>
              <th>Máximo # de usuarios</th>
              <th>Ubicación</th>
              <th>Activa</th>
              <th>Detalle</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dept in dependencias" :key="dept.nombre">
              <td>{{dept.nombre}}</td>
              <td>{{dept.coordinador}}</td>
              <td>{{dept.maximo}}</td>
              <td>{{dept.ubicacion}}</td>
              <td>{{dept.activa}}</td>
              <td><button type="submit" class="button is-primary" @click.prevent="detalle(dept)">Detalle</button></td>
              <td><button type="submit" class="button is-primary" @click.prevent="editar(dept)">Editar</button></td>
              <td><button type="submit" class="button is-primary" @click.prevent="eliminar(dept)">Eliminar</button></td>
            </tr>
          </tbody>
        </table>

        <div class="notification is-danger mt-10" v-if="error">  
          {{ error }}
        </div>

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
//import firebase from 'firebase'
export default {
  data() {
    return {
      isActive: 'pictures',
      ref: db.collection('dependencias'),
      dependencia: {
        nombre: '',
        coordinador: '',
        maximo: '',
        ubicacion: '',
        activa: false,
        users: []
      },
      dependencias: [],
      error: ''
    }
  }, name : 'Dashboard',
  created() {
    this.listarDependencias()
  },
  methods: {
    async listarDependencias(){
        try {
            const resDB = await this.ref.get()

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

                //console.log(this.dependencias)
            });
        } catch (error) {
            console.log(error)
        }
    },
    register(){
      this.error = ''
      if (this.dependencia.nombre && this.dependencia.coordinador && this.dependencia.maximo && this.dependencia.ubicacion) {
        
        if(this.dependencia.activa === "Si"){
          this.dependencia.activa = true
        }else{
          this.dependencia.activa = false
        }

        this.ref.add(this.dependencia).then((docRef) =>{
          console.log(docRef);
          this.dependencia.nombre = ''
          this.dependencia.coordinador = ''
          this.dependencia.maximo = ''
          this.dependencia.ubicacion = ''
          this.$router.push({name: 'dashboard'})  
        })

      }else {
        this.error = 'Todos los campos son requeridos'
      }
    },
    detalle(dept){
     this.$router.push({name: 'detalle', params: {dependenciaactual: dept}})  
    }
    ,
    editar(dept){
      
      console.log(dept)
      //console.log(this.mensaje.nombre + this.mensaje.apellido)
     //this.$router.push({name: 'detalle', params: {dependenciaactual: dept}})  
    },
    eliminar(dept){
      console.log(dept)
      if(dept.users.length === 0){
        console.log("Se puede eliminar")
        this.ref.doc(dept.id).delete();
        this.listarDependencias()
      }else{  
        this.error = "Tiene usuarios asociados"
      }
    }
  },
  props: {
    mensaje: {}
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