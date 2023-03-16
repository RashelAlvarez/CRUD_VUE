<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="mb-4"> </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Contacto</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="col-12">
        <p class="mb-5 pb-3">
          Por favor rellena el formulario para ponerme en contacto contigo.
        </p>
        <form v-on:submit.prevent="guardarContacto()">
          <v-row>
            <v-col class="col-6">
              <v-text-field
                v-model="contacto.name"
                label="Nombre"
                outlined
                :rules="inputRules"
              ></v-text-field>
            </v-col>

            <v-col class="col-6">
              <v-text-field
                v-model="contacto.email"
                label="Email"
                :rules="inputEmails"
                outlined
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-textarea
            label="Message"
            v-model="contacto.message"
            :rules="inputRules"
            outlined
          ></v-textarea>

          <v-select
            v-model="contacto.country"
            @change="onChangeCountry"
            :items="listCountry"
            item-title="country_name"
            item-value="country_name"
            item-text="country_name"
            label="Country"
            :rules="inputRules"
            outlined
          >
          </v-select>

          <v-select
            v-model="contacto.state"
            @change="onChangeState"
            :items="listState"
            item-title="state_name"
            item-value="state_name"
            item-text="state_name"
            :rules="inputRules"
            label="State"
            outlined
          >
          </v-select>

          <v-select
            v-model="contacto.city"
            :items="listCities"
            item-title="city_name"
            item-value="city_name"
            item-text="city_name"
            :rules="inputRules"
            label="City"
            outlined
          >
          </v-select>

          <v-card-actions>
            <v-btn color="warning" class="mr-4" type="submit">Guardar</v-btn>
          </v-card-actions>
        </form>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" color="success"
      >{{ textsnack }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>


<script>
import axios from "axios";

export default {
  name: "contactoH",
  data() {
    return {
      contacto: {
        name: "",
        email: "",
        message: "",
        country: "",
        state: "",
        city: "",
      },
      snackbar: false,
      textsnack: "Se enviaron los datos con exito",
      errors: [],
      inputRules: [
        (v) => !!v || "El campo es Requerido",
        (v) => v.length >= 3 || "Minimo 3 caracteres",
      ],
      inputEmails: [
        (v) => !!v || "El campo es Requerido",
        (v) => /.+@.+\..+/.test(v) || "El correo no es valido",
      ],
      listCountry: [],
      listState: [],
      listCities: [],
      authToken: "",
    };
  },
  created() {
    this.generateAccessToken();
  },
  methods: {
    guardarContacto() {
      axios
        .post("https://apirestlaravel-production.up.railway.app/api/contacto", this.contacto)
        .then((response) => {
          console.log("contacto guardado" + response);
          this.snackbar = true;
        })
        .catch(function (error) {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
          console.log(error);
        });
    },

    generateAccessToken() {
      axios
        .get("https://www.universal-tutorial.com/api/getaccesstoken", {
          headers: {
            Accept: "application/json",
            "api-token":
              "tymGjEqqzMkRYc2mpH9omYRFZt0sRvn_CLc4Gv_weZ8RciwGFU6b4xo5Hk2OPkm7Lgk",
            "user-email": "rashelalvarez21@gmail.com",
          },
        })
        .then((res) => {
          this.authToken = res.data.auth_token;
          this.loadCountry();
        });
    },

    loadCountry() {
      axios
        .get("https://www.universal-tutorial.com/api/countries", {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.listCountry = res.data;
          console.log(this.listCountry);
        });
    },
    onChangeCountry() {
      axios
        .get(
          `https://www.universal-tutorial.com/api/states/${this.contacto.country}`,
          {
            headers: {
              Authorization: `Bearer ${this.authToken}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          this.listState = res.data;
        });
    },
    onChangeState() {
      axios
        .get(
          `https://www.universal-tutorial.com/api/cities/${this.contacto.state}`,
          {
            headers: {
              Authorization: `Bearer ${this.authToken}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          this.listCities = res.data;
        });
    },
  },
};
</script>