import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {

  // info del login
  const loginInfo = ref({
    loggedIn: false,
    username: '',
    image: '',
  })

  //vots de les 4 opcions
  const votos = ref([0, 0, 0, 0])

  // Comprovar si l usuari ha iniciat sessió
  const isLoggedIn = computed(() => loginInfo.value.loggedIn)

  // Guardar informació login
  function setLoginInfo({ loggedIn, username, image }) {
    loginInfo.value = { loggedIn, username, image }
  }

  // Actualitzar  vots
  function setVotos(nousVots) {
    votos.value = nousVots
  }

  return {
    loginInfo,
    votos,
    isLoggedIn,
    setLoginInfo,
    setVotos,
  }
})