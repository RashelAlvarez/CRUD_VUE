<template>
    <v-container>
        <v-row class="text-center ">
            <v-col>
                <h1 class="display-2 font-wight-bold mb-3">Formulario de edicion</h1>

            </v-col>
        </v-row>

        <v-row >
            <v-col class="col-6 ">
            <form v-on:submit.prevent="actualizarArticulo()">
                <v-text-field v-model="articulo.descripcion" label="Descripcion" outlined required></v-text-field>
                <v-text-field v-model="articulo.precio" label="Precio" type="number" prefix="$" outlined  required>  </v-text-field>
                <v-text-field v-model="articulo.stock" label="Stock" type="number"  outlined required>  </v-text-field>
                <v-card-actions>
                    <v-btn color="warning" class="mr-4" type="submit">Actualizar</v-btn>

                </v-card-actions>
            </form>
            </v-col>
        </v-row>

            <v-snackbar v-model="snackbar" color="success">{{textsnack}}
        <template v-slot:action="{attrs}">
            <v-btn text v-bind="attrs" @click="snackbar = false">Cerrar</v-btn>
        </template>

    </v-snackbar>

    </v-container>
</template>


<script>
import axios from 'axios';
export default {
    name:'editarArticulo',
    mounted(){
        this.id=this.$route.params.id;
        console.log(this.$route);
        axios.get('https://apirestlaravel-production.up.railway.app/api/articulo/'+this.id)
        .then(articulo=>{
            this.articulo=articulo.data;
        })
        .catch(function (error) {
         console.log(error);   
        })
    },
    data(){
        return{
            id:null,
            articulo:{
                id:'',
                descripcion:'',
                precio:'',
                stock:''
            },
            snackbar:false,
            textsnack: 'Registro actualizado'

        }
    },
    methods:{
        actualizarArticulo(){
           //var router= this.$router;
            axios.put('https://apirestlaravel-production.up.railway.app/api/articulo/'+this.id , this.articulo)
            .then(response=>{
               // 
                this.snackbar=true;
                console.log(response);
               // router.push('/articulos');
       })
            .catch(function (error) {
                console.log(error);
                
            })
        }
    }
}
</script>