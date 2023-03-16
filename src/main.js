import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

//importamos vue-router
import VueRouter from 'vue-router'
//import {createRouter, createWebHistory} from 'vue-router'  
//usar vue-router
Vue.use(VueRouter);
Vue.config.productionTip = false

//importamos nuestros componentes
import inicio from './components/Inicio';
import listarArticulos from './components/ListarArt';
import crearArticulo from './components/CrearArticulo';
import editarArticulo from './components/EditarArticulo';
import contacto from './components/Contacto';
//crear el componente
Vue.component('inicioH', inicio);
Vue.component('listarArticulos',listarArticulos);
Vue.component('crearArticulo', crearArticulo);
Vue.component('editarArticulo', editarArticulo);
Vue.component('contactoH', contacto);



//definir las rutas
const routes=[
  {path: '/', component: inicio},
  {path: '/inicio', componet:inicio},
  {path: '/articulos', component:listarArticulos },
  {path: '/crear', component:crearArticulo, name:'crearArticulo'},
  {path: '/editar/:id', component:editarArticulo, name: 'editarArticulo'},
  {path: '/contacto', component:contacto}
]
//la razon del name en crear y editar es porque se van a llamar las rutas por un boton

//crearmos el objeto router
const router = new VueRouter({
  routes, mode:'history'
})


new Vue({
  vuetify,
 router, //agregamos router a la instancia de vue
  render: h => h(App)
}).$mount('#app')
