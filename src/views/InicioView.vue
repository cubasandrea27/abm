<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const router = useRouter()
const correo = ref('')

onMounted(async () => {
  const { data } = await supabase.auth.getUser()
  correo.value = data.user?.email ?? ''
})

async function cerrarSesion() {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<template>
  <h1>Bienvenido</h1>
  <p>Sesión iniciada como <strong>{{ correo }}</strong></p>

  <nav>
    <RouterLink to="/productos">Ir a mis productos</RouterLink>
  </nav>

  <button @click="cerrarSesion">Cerrar sesión</button>
</template>