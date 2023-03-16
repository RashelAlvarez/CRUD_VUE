<template>
    <v-container>
        <v-row class="text-center">
            <v-col>
                <h1 class="display-2 font-wight-bold mb-3">Formulario de creacion</h1>

            </v-col>
        </v-row>

        <v-row>
            <v-col class="col-6">
            <form v-on:submit.prevent="guardarArticulo()" enctype="multipart/form-data">
                <v-text-field v-model="articulo.descripcion" label="Descripcion" outlined required></v-text-field>
                <v-text-field v-model="articulo.precio" label="Precio" type="number" prefix="$" outlined required>  </v-text-field>
                <v-text-field v-model="articulo.stock" label="Stock" type="number"  outlined required>  </v-text-field>
               
                  <v-card-actions>
                    <v-btn color="warning" class="mr-4" type="submit">Guardar</v-btn>

                </v-card-actions>
            </form>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import axios from 'axios';
export default {
    name:'crearArticulo',
    data(){
        return{
            articulo:{               
                descripcion:'',
                precio:'',
                stock:''
            }
        }

    },
    methods:{
        guardarArticulo(){
            var router= this.$router;
            axios.post('https://apirestlaravel-production.up.railway.app/api/articulo', this.articulo)
            .then(response=>{
                 router.push('/articulos');
                console.log("guardado" + response);

            })
            .catch(function (error) {
                console.log(error);
            })
        }

    }
}
</script>