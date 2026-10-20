<template>
  <div>
    <h1>Iniciar sesión</h1>
  <!-- Formulario de inicio de sesión -->
    <form @submit.prevent="iniciarSesion">
      <div>
        <label>Usuario:</label>
        <input v-model="username" type="text">
      </div>

      <br>

      <div>
        <label>Contraseña:</label>
        <input v-model="password" type="password">
      </div>

      <br>

      <button type="submit">Entrar</button>
      <!-- mensaje de error si usu o contra son incorrectas -->
      <p>{{ mensaje }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'

const router = useRouter()
const store = useAppStore()

const username = ref('')
const password = ref('')
const mensaje = ref('')

function iniciarSesion() {
  if (username.value === 'user' && password.value === '123') {
    store.setLoginInfo({
      loggedIn: true,
      username: username.value,
      image: ''
    })

    router.push('/votacions')
  } else {
    mensaje.value = 'Usuario o contraseña incorrectos'
  }
}
</script>
