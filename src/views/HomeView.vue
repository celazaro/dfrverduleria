<template>

  <NavbarComponents @getSearchText="search" />

  <HeroComponents />


  <!-- Fruits Shop Start-->
  <div class="container-fluid fruite py-1">
    <div class="container py-1">
      <div class="tab-class text-center">
        <div class=" ">

          <div class="col-lg-12 " v-if="searchTextRule">
            
            <h1> Productos con el texto indicado <strong>{{ searchTextRule }} </strong></h1>
            <a
                  class="btn btn-primary rounded-pill m-1 mb-5"
                  style="width: 300px"
                  role="button"
                  @click="resetFilter"
            >Ver todos los productos
            </a>
            <div class="alert alert-danger" role="alert" v-if="productosFiltrados.length === 0 "  >
              No existen productos con el texto indicado para la búqueda           </div>
          </div>

          <div class="col-lg-12 " v-if="categoriaSeleccionada != null">
            
            <h1> Productos de la categoría <strong>{{ categoriaSeleccionada }} </strong></h1>
            <a
                  class="btn btn-primary rounded-pill m-1 mb-5"
                  style="width: 300px"
                  role="button"
                  @click="resetFilter"
            >Ver todos los productos
            </a>
            <div class="alert alert-danger" role="alert" v-if="productosFiltrados.length === 0 "  >
              Lamentamos comunicar que esta categoría no tiene productos disponibles!!           </div>
          </div>

          <div class="col-lg-12 " v-if = "categoriaSeleccionada === null && searchTextRule === null">
            <h1>Nuestros Productos</h1>
            <ul class="nav nav-pills d-inline-flex text-center mb-5">
              <li class="nav-item">
                <a
                  name=""
                  id=""
                  class="btn btn-primary rounded-pill m-1"
                  style="width: 130px"
                  role="button"
                  v-for="cat in categorias"
                  :key="cat.id"
                  @click="categoriaID(cat.id, cat.nombre)"
                  >{{ cat.nombre }}</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="container">
          
            <div class="row g-4" >
              <div class="col-lg-12">
                <div class="row g-4" > 
                  <div class="col-md-6 col-lg-4 col-xl-3"  v-for="prod in productosFiltrados"
                  :key="prod.id">
                    <div class="rounded position-relative fruite-item"  >
                      <div class="fruite-img" >
                        <img
                          :src= "prod.imagen"  
                          class="img-fluid w-100 rounded-top"
                          alt=""
                          style="height: 15rem;"
                        />
                      </div>
                      <div
                        class="text-white bg-primary px-3 py-1 rounded position-absolute"
                        style="top: 10px; left: 10px"
                      >
                        {{ prod.categoria_nombre }}
                      </div>
                      <div
                        class="p-4 border border-secondary border-top-0 rounded-bottom" 
                      >
                        <h4> {{ prod.nombre}} </h4> 
                        <p style="height: 5rem;">
                          {{ prod.descripcion }}
                        </p>
                        <div
                          class="d-flex justify-content-center flex-lg-wrap"
                        >
                          <p class="text-dark fs-5 fw-bold mb-0">$ {{ prod.precio }} / {{ prod.precio_tipo_descripcion }} </p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

        </div>
      </div>
    </div>
  </div>
  <!-- Fruits Shop End-->
</template>

<script setup >

import axios from "axios"
import { ref, onMounted } from "vue"

import NavbarComponents from '../components/NavbarComponents.vue'
import HeroComponents from '../components/HeroComponents.vue';

const categorias = ref([]) 
const productos = ref([])  
const productosFiltrados = ref([]) 
const categoriaSeleccionada = ref(null)
const searchTextRule = ref(null)

const search = (searchText) => {
  categoriaSeleccionada.value = null
  searchTextRule.value = searchText

  if (searchText) {
    // voy a filtrar los datos
      productosFiltrados.value = productos.value.filter((prod) => {
        const productoNombre = prod.nombre.toLowerCase();
        const productoDescripcion = prod.descripcion.toLowerCase(); 
        const searchTerm = searchText.toLowerCase();
        return (
          productoNombre.includes(searchTerm) ||
          productoDescripcion.includes(searchTerm)
        )
      })
  } else {
        productosFiltrados.value = productos.value
    }
}

const categoriaID = (categoriaID, categoriaNombre) => {
      searchTextRule.value = null
      categoriaSeleccionada.value = categoriaNombre;
      if (categoriaID) {
        productosFiltrados.value = productos.value.filter((prod) => prod.categoria === categoriaID);
      } else {
        productosFiltrados.value = productos.value
      }
    }

const resetFilter = () => {
      categoriaSeleccionada.value = null
      searchTextRule.value = null
      productosFiltrados.value = productos.value
    }

// Guardar la posición de desplazamiento antes de que la página se actualice
window.addEventListener('beforeunload', () => {
  localStorage.setItem('scrollPosition', window.scrollY)
})
  
onMounted(() => {
  // Restaurar la posición de desplazamiento después de que la página se monte
  const savedPosition = localStorage.getItem('scrollPosition')
  if (savedPosition) {
    window.scrollTo(0, parseInt(savedPosition, 10))
  }

  axios
      .get("https://panambi.pythonanywhere.com/api/categoria/")
      .then(response => {
        categorias.value = response.data})
      .catch(error => { console.log(error) })
    
  axios
      .get("https://panambi.pythonanywhere.com/api/productos/")
      .then(response => {
        productos.value = response.data
        productosFiltrados.value = productos.value
      })
      .catch(error => {console.log(error) })
})

</script>
