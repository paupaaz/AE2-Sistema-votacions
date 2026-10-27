
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

    <!-- Grafico de votaciones -->
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'
import BotoVotar from '../components/BotoVotar.vue'
import Chart from 'chart.js/auto'

const router = useRouter()
const store = useAppStore()

const chartCanvas = ref(null)
let chartInstance = null
let websocket

onMounted(() => {
  if (!store.isLoggedIn) {
    router.push('/')
    return
  }

  // Crear el grafico
  if (chartCanvas.value) {
    chartInstance = new Chart(chartCanvas.value, {
      type: 'bar',
      data: {
        labels: ['Opcion 1', 'Opcion 2', 'Opcion 3', 'Opcion 4'],
        datasets: [{
          label: 'Votos',
          data: [...store.votos],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    })
  }

  // Connectar amb el servidor
  websocket = new WebSocket('ws://localhost:3000')

  websocket.onmessage = (evento) => {
    const dades = JSON.parse(evento.data)

    if (dades.tipo === 'votos') {
      store.setVotos(dades.votos)
    }
  }
})

// Actualitzar el grafico quan canviin els vots
watch(
  () => [...store.votos],
  (nousVots) => {
    if (chartInstance) {
      chartInstance.data.datasets[0].data = [...nousVots]
      chartInstance.update()
    }
  }
)

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

  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 50vh;
  width: 90vw;
  max-width: 800px;
  margin: 20px auto;
}
</style>
