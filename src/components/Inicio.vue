<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="mb-4"> </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Inicio</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-4">

        <v-card  transition="slide-x-transition" class="ma-3">
          <v-list-item>
            <v-list-item-avatar tile class="mt-n7">
              <v-sheet color="green" width="80" height="80" elevation="10">
                 <v-icon>mdi-store</v-icon>
              </v-sheet>
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="overline text-right">Article</div>
              <v-list-item-title class="headline mb-1 text-right">
                {{cantidadart }}
              </v-list-item-title>
              <div><v-divider></v-divider></div>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
              <v-icon>mdi-account</v-icon>
            <div class="overline">Rashel</div>
          </v-card-actions>
        </v-card>
      </v-col>

  
      <v-col class="col-4">
        <v-card class="ma-3">
          <v-list-item>
            <v-list-item-avatar tile class="mt-n7">
              <v-sheet color="red" width="80" height="80" elevation="10">
                 <v-icon>mdi-account</v-icon>
              </v-sheet>
            </v-list-item-avatar>
            <v-list-item-content>
              <div class="overline text-right">Contact</div>
              <v-list-item-title class="headline mb-1 text-right">
                {{cantcontact }}
              </v-list-item-title>
              <div><v-divider></v-divider></div>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
              <v-icon>mdi-account</v-icon>
            <div class="overline">Rashel</div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "inicioH",
  mounted() {
    //cuando se carga la app
    this.obtenerArticulos();
    this.obtenerContacto();
  },
  data() {
    return {
      items: [
        {
          title: "Articulo",
          content: "this is the content of card 1",
        },
      ],
      articulos: null,
      cantidadart: null,
      contactos:null,
      cantcontact:null
    };
  },
  methods: {
    obtenerArticulos() {
      axios
        .get("https://apirestlaravel-production.up.railway.app/api/articulo")
        .then((response) => {
          this.articulos = response.data;
          this.cantidadart = this.articulos.length;
          console.log(this.articulos.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
      obtenerContacto() {
      axios
        .get("http://127.0.0.1:8000/api/contacto")
        .then((response) => {
          this.contactos = response.data;
          this.cantcontact = this.contactos.length;
       
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
