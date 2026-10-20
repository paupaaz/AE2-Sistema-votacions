
<template>
  <div>
    <h1>Votaciones</h1>
    <p>Pantalla de votaciones</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'

const router = useRouter()
const store = useAppStore()
//onMounted srive para ejcutar codigo cuando un comp ya esta cargado
onMounted(() => { 
  if (!store.isLoggedIn) {
    router.push('/')
  }
})
</script>
