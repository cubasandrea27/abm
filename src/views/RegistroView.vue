<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const router = useRouter()



  const correo= ref('')
  const clave= ref('')
  const confclave= ref('')


  const cargando= ref(false)
  const mensaje= ref('')
  const registroexitoso= ref('')


  async function registrarUsuario(){
    mensaje.value=''
    registroexitoso.value=false


    if(clave.value !== confclave.value ){
      mensaje.value= "Las contraseñas no coinciden"
      return
    }


    if (clave.value.length < 6){
      mensaje.value= "La contraseña debe tener mas de 6 caracteres"
      return
    }
    try {
      cargando.value= true


      const {error} = await supabase.auth.signUp({
        email:correo.value,
        password:clave.value,
      })
      if (error){
        throw error
      }
      registroexitoso.value=true
      mensaje.value='Registro Exitoso'
      correo.value= ''
      clave.value=''
      confclave.value=''
    }
    catch(error){
      mensaje.value=error.message
    } finally{
      cargando.value= false
    }
  }


</script>


<template>


  <form @submit.prevent="registrarUsuario">
    <label>Ingrese su correo</label>
    <input type="email" id="correo" v-model="correo" required autocomplete="email">
    <label> Ingrese su contraseña</label>
    <input type="password" id="clave" v-model="clave" required>
        <label> Repita su contraseña</label>
    <input type="password" id="clave" v-model="confclave" required>
    <button type="submit" :disabled="cargando">
      {{ cargando ? 'registrando..' : 'registrarme' }}
    </button>
  </form>


  <p v-if="mensaje"  :class="{registroexitoso, error: !registroexitoso}"></p>


</template>


