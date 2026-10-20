<template>
  <div>
    <h1>Votaciones</h1>
    <!-- saca de store el nombre de usu -->
    <p>Bienvenido, {{ store.loginInfo.username }}</p>

    <BotoVotar
      v-for="(vots, index) in store.votos"
      :key="index"
      :opcio="index"
      :vots="vots"
      @votar="votar"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'
import BotoVotar from '../components/BotoVotar.vue'

const router = useRouter()
const store = useAppStore()
//al cargar la página, si el usuario no ha iniciado sesión, redirigir a la pantalla de login
onMounted(() => {
  if (!store.isLoggedIn) {
    router.push('/')
  }
})

function votar(opcio) {
  console.log('Voto en la opción:', opcio + 1)
  // Actualizar los votos en el store
  const nuevosVotos = [...store.votos]
  nuevosVotos[opcio]++
  store.setVotos(nuevosVotos)
}
</script>