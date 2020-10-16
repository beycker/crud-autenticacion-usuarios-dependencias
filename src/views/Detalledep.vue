<template>
    <div class="container mt-50">
          <div class="columns">
            <div class="column is-6 is-offset-3">
              <h3 class="title is-3">Información dependencia</h3><hr>
              <form action="#">
                
                <div class="field">
                  <label class="label">Nombre dependencia</label>
                  <div class="control">
                    <span>{{dependenciaactual.nombre}}</span>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Coordinador</label>
                  <div class="control">
                    <span>{{dependenciaactual.coordinador}}</span>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Máximo numero de usuarios</label>
                  <div class="control">
                    <span>{{dependenciaactual.maximo}}</span>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Ubicacion</label>
                  <div class="control">
                    <span>{{dependenciaactual.ubicacion}}</span>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Activa</label>
                  <div class="control">
                    <span>{{dependenciaactual.activa}}</span>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Usuarios asociados</label>
                  <div class="control">
                    <table class="table">
                        <thead>
                            <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="usert in dependenciaactual.users" :key="usert.email">
                            <td>{{usert.nombre}}</td>
                            <td>{{usert.email}}</td>
                            </tr>
                        </tbody>
                        </table>
                  </div>
                </div>



              </form>

              <div class="notification is-danger mt-10" v-if="error">  
                {{ error }}
              </div>

            </div>
          </div>
    </div>
</template>
<script>
export default {
    data() {
        return{

        }
    },
    name: 'Detalle',
    props: {
        dependenciaactual: {}
    }
}
</script>