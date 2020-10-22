<template>
    <div class="container mt-50">
         <div class="columns">
            <div class="column is-6 is-offset-3">
              <h3 class="title is-3">Editar usuario</h3><hr>
            
             <form action="#" @submit.prevent="register">
                
                <div class="field">
                  <label class="label">Nombres</label>
                  <div class="control">
                      <input class="input" type="text" v-model="usractual.nombres">
                  </div>
                </div>

                <div class="field">
                  <label class="label">Apellidos</label>
                  <div class="control">
                      <input class="input" type="text" v-model="usractual.apellidos">
                  </div>
                </div>

                <div class="field">
                  <label class="label">E-mail</label>
                  <div class="control">
                      <input class="input" type="text" v-model="usractual.email">
                  </div>
                </div> 

                <div class="field">
                  <label class="label">Dependencia</label>
                  <div class="select">
                    <select v-model="usractual.dependencia">
                        <option v-for="dependencia in dependencias" :key="dependencia.id">{{ dependencia.nombre }}</option> 
                    </select>
                   </div>
                </div>
                

                <div class="field">
                  <label class="label">¿Activo?</label>
                  <div class="select">
                    <select v-model="usractual.activo">
                      <option>Si</option>
                      <option>No</option>
                    </select>
                    </div>
                    </div>
            
               <button type="submit" class="button is-primary" @click.prevent="actualizarUsuario(usractual)">Actualizar usuario</button>

              <div class="notification is-danger mt-10" v-if="error">  
                {{ error }}
              </div>

          </form>
            </div>
        </div>
    </div> 
</template>

<script>
import db from "../firebase/init";
//import firebase from "firebase";
export default {
    data() {
        return{
        //  key: this.$route.params.id,
        //  ref: db.collection("users")
        error: '',
        dependencias: [],
        listusers: []
        }
    },

    name: 'Editarusr',
    props: {
        usractual: {},
        
         
        },

created(){
this.misDependencias();
this.misUsuarios();
}
,
    methods: {
 async misDependencias(){
        try {
            const resDB = await db.collection('dependencias').get()

            resDB.forEach(res => {
                //console.log(res);
                const depen = {
                    id: res.id,
                    nombre: res.data().nombre,
                    coordinador: res.data().coordinador,
                    maximo: res.data().maximo,
                    ubicacion: res.data().ubicacion,
                    activa: res.data().activa,
                    users: res.data().users
                }
                console.log(this.dependencias)
               this.dependencias.push(depen)
                console.log(this.dependencias)
            });
        } catch (error) {
            console.log(error)
        }
    },

    async misUsuarios(){
    const resDB = await db.collection('users').get()
          resDB.forEach(res => {
              const usrs = {
                  id: res.id,
                  nombres: res.data().nombres,
                  apellidos: res.data().apellidos,
                  email: res.data().email,
                  password: res.data().dependencia,
                  activo: res.data().activo
              }
             this.listusers.push(usrs)
          })

    },

     actualizarUsuario(usractual){
      const updateRef = db.collection('users').doc(usractual.id);
            
       updateRef.set({
           nombres: usractual.nombres,
           apellidos: usractual.apellidos,
           email: usractual.email,
           dependencia: usractual.dependencia,
           
       })

    
        usractual.nombres = ''
        usractual.apellidos = ''
        usractual.email = ''
        usractual.dependencia = ''
        alert("¡El usuario se ha actualizado con exito! \nDirijase a la lista de usuarios para ver los cambios.")
      
      
      }
    }


}
</script>