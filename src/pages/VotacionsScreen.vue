<template>
  <div>
    <h1>Votaciones</h1>
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
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'
import BotoVotar from '../components/BotoVotar.vue'

const router = useRouter()
const store = useAppStore()

let websocket

onMounted(() => {
  if (!store.isLoggedIn) {
    router.push('/')
    return
  }

  websocket = new WebSocket('ws://localhost:3000')

  websocket.onmessage = (evento) => {
    const dades = JSON.parse(evento.data)

    if (dades.tipo === 'votos') {
      store.setVotos(dades.votos)
    }
  }
})

function votar(opcio) {
  if (websocket && websocket.readyState === WebSocket.OPEN) {
    websocket.send(JSON.stringify({
      tipo: 'votar',
      opcio: opcio
    }))
  }
}

onUnmounted(() => {
  if (websocket) {
    websocket.close()
  }
})
</script>
