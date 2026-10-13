<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const router = useRouter()
const correo = ref('')
const clave = ref('')

const cargando = ref(false)
const mensaje = ref('')
const Inicioexitoso = ref(false)

async function iniciarSesion() {
  mensaje.value = ''
  Inicioexitoso.value = false

  try {
    cargando.value = true

    const { error } = await supabase.auth.signInWithPassword({
      email: correo.value,
      password: clave.value,
    })
    if (error) {
      throw error
    }
    Inicioexitoso.value = true
    mensaje.value = 'Inicio de sesión exitoso'
    router.push('/inicio')
  } catch (error) {
    if (error.message === 'Invalid login credentials') {
      mensaje.value = 'El correo no existe o la contraseña es incorrecta'
    } else {
      mensaje.value = error.message
    }
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <form @submit.prevent="iniciarSesion">
    <label for="correo">Ingrese su correo</label>
    <input type="email" id="correo" v-model="correo" required autocomplete="email" />

    <label for="clave">Ingrese su contraseña</label>
    <input type="password" id="clave" v-model="clave" required autocomplete="current-password" />

    <button type="submit" :disabled="cargando">
      {{ cargando ? 'Ingresando...' : 'Iniciar sesión' }}
    </button>
  </form>

  <p v-if="mensaje" :class="Inicioexitoso ? 'exito' : 'error'">{{ mensaje }}</p>

  <p>¿No tenés cuenta? <RouterLink to="/registro">Registrate</RouterLink></p>
</template>

<style scoped>
.exito { color: #166534; }
.error { color: #991b1b; }
</style>