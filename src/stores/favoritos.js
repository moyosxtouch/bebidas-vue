import { ref, watch, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas";
import { useModalStore } from "./modal";
import { useNotificacionStore } from "../stores/notificaciones";
export const useFavoritosStore = defineStore("favoritos", () => {
  const bebidas = useBebidasStore();
  const modal = useModalStore();
  const notificaciones = useNotificacionStore();
  const favoritos = ref([]);
  onMounted(() => {
    favoritos.value = JSON.parse(localStorage.getItem("favoritos")) ?? [];
  }),
    watch(
      favoritos,
      () => {
        sincronizarLocalStorage();
      },
      {
        deep: true,
      }
    );
  function sincronizarLocalStorage() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  }
  function existeFavorito() {
    const favoritosLocalStorage =
      JSON.parse(localStorage.getItem("favoritos")) ?? [];
    return favoritosLocalStorage.some(
      (favorito) => favorito.idDrink === bebidas.receta.idDrink
    );
  }
  function eliminarFavorito() {
    favoritos.value = favoritos.value.filter(
      (favorito) => favorito.idDrink !== bebidas.receta.idDrink
    );
  }
  function agregarFavorito() {
    favoritos.value.push(bebidas.receta);
    notificaciones.mostrar = true;
    notificaciones.texto = "Se agrego a favoritos";
    setTimeout(() => {
      notificaciones.$reset();
    }, 3000);
  }
  function handleClickFavorito() {
    if (existeFavorito(bebidas.receta.idDrink)) {
      eliminarFavorito();
    } else {
      agregarFavorito();
    }
    modal.modal = false;
  }
  const noFavoritos = computed(() => favoritos.value.length === 0);
  return {
    favoritos,
    existeFavorito,
    noFavoritos,
    handleClickFavorito,
  };
});
