<template>
  <div>
    <h3>Opción {{ opcio + 1 }}</h3>
    <p>Votos: {{ vots }}</p>
    <button @click="$emit('votar', opcio)">
      Votar
    </button>
  </div>
</template>

<script setup>
//para recibir el número de opción y sus votos
defineProps({
  opcio: Number,
  vots: Number
})
//para avisar al componente padre cuando alguien pulsa el botón
defineEmits(['votar'])
</script>

