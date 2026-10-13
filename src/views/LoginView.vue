<template>
    </template>
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
            iniciarSesion.value = true
            mensaje.value = 'inicio de sesion exitoso'
            router.push('/inicio')
        } catch{
            if(error.message === 'credenciales invalidas'){
                mensaje.value = 'el correo no existe o la contraseña es incorrecta'
            } else {
                mensaje.value = error.message
            }
        }

    }
    </script>