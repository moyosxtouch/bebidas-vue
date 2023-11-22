<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useBebidasStore } from "../stores/bebidas";
import { useNotificacionStore } from "../stores/notificaciones";
const route = useRoute();
const store = useBebidasStore();
const notificaciones = useNotificacionStore();
const paginaInicio = computed(() => route.name === "inicio");
const handleSubmit = () => {
  if (Object.values(store.busqueda).includes("")) {
    notificaciones.texto = "All fields are required";
    notificaciones.mostrar = true;
    notificaciones.error = true;
    return;
  }

  store.obtenerRecetas();
};
</script>

<template>
  <header class="bg-slate-800" :class="{ header: paginaInicio }">
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'inicio' }">
            <img src="/img/logo.svg" alt="imagen logo" class="w-32" />
          </RouterLink>
        </div>
        <nav class="flex gap-4 text-white">
          <RouterLink
            :to="{ name: 'inicio' }"
            class="uppercase font-bold"
            active-class="text-orange-500"
          >
            Home
          </RouterLink>
          <RouterLink
            :to="{ name: 'favoritos' }"
            class="uppercase font-bold"
            active-class="text-orange-500"
          >
            Favorites
          </RouterLink>
        </nav>
      </div>

      <form
        v-if="paginaInicio"
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="ingrediente"
            >Name or Ingredients</label
          >
          <input
            id="ingrediente"
            type="text"
            class="p-3 w-full rounded-lg focus:outline-none"
            placeholder="Name or Ingredient: E.g. Vodka, Tequila, etc"
            v-model="store.busqueda.nombre"
          />
        </div>

        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="categoria"
            >Category</label
          >
          <select
            id="categoria"
            class="p-3 w-full rounded-lg focus:outline-none"
            v-model="store.busqueda.categoria"
          >
            <option value="">-- Select --</option>
            <option
              v-for="categoria in store.categorias"
              :key="categoria.strCategory"
              :value="categoria.strCategory"
            >
              {{ categoria.strCategory }}
            </option>
          </select>
        </div>

        <input
          type="submit"
          class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
          value="Search Recipes"
        />
      </form>
    </div>
  </header>
</template>
<style>
.header {
  background-image: url("/img/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
