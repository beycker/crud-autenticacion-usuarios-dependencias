<template>
    <div class="container mt-50">
         <div class="columns">
            <div class="column is-6 is-offset-3">
              <h3 class="title is-3">Editar dependencia</h3><hr>
              <form action="#" @submit.prevent="register">
                
                <div class="field">
                  <label class="label">Nombre dependencia</label>
                  <div class="control">
                  <input class="input" type="text" v-model="dependenciaactual.nombre">
                  </div>
                </div>

                <div class="field">
                  <label class="label">Coordinador</label>
                  <div class="control">
                  <input class="input" type="text" v-model="dependenciaactual.coordinador">  
                  </div>
                </div>

                <div class="field">
                  <label class="label">Máximo número de usuarios</label>
                  <div class="control">
                   <input class="input" type="text" v-model="dependenciaactual.maximo"> 
                  </div>
                </div>

                <div class="field">
                  <label class="label">Ubicación</label>
                  <div class="control"> 
                   <input class="input" type="text" v-model="dependenciaactual.ubicacion">
                  </div>
                </div>

                <div class="field">
                  <label class="label">¿Dependencia activa?</label>
                  <div class="select">
                      <select v-model="dependenciaactual.activa">
                    <option>Si</option>
                    <option>No</option>
                  </select>
                  </div>
                </div>

                 <button type="submit" class="button is-primary" @click.prevent="actualizarDependencia(dependenciaactual)">Actualizar dependencia</button>

             </form>

              <div class="notification is-danger mt-10" v-if="error">  
                {{ error }}
              </div>

            </div>
        </div>
    </div>
</template>

<script>
import db from "../firebase/init";
export default {
    data() {
        return{
        error: '',
        listdepen: []
        }
    },

    created(){
        this.misdependencias()
    },

    name: 'Editar',
    props: {
        dependenciaactual: {}
    },
    methods: {

    async misdependencias(){

        const resDB = await db.collection('dependencias').get()
        resDB.forEach(res => {
            const depen = {
                  id: res.id,
                  nombre: res.data().nombre,
                  coordinador: res.data().coordinador,
                  maximo: res.data().maximo,
                  ubicacion: res.data().ubicacion,
                  activa: res.data().activa,
              
            }
           this.listdepen.push(depen)
        })
    },

        actualizarDependencia(dependenciaactual){
        const updateRef = db.collection('dependencias').doc(dependenciaactual.id);
            
       updateRef.set({
           nombre: dependenciaactual.nombre,
           coordinador: dependenciaactual.coordinador,
           maximo: dependenciaactual.maximo,
           ubicacion: dependenciaactual.ubicacion,
           activa: dependenciaactual.activa
           
       })

        dependenciaactual.nombre = ''
        dependenciaactual.coordinador = ''
        dependenciaactual.maximo = ''
        dependenciaactual.ubicacion = ''
        dependenciaactual.activa = ''
        alert("¡La dependencia se ha actualizado con exito! \nDirijase a la lista de dependencias para ver los cambios.")
      
        }
    }
}
</script>