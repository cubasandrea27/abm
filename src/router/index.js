import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegistroView from '@/views/RegistroView.vue'
import InicioView from '@/views/InicioView.vue'
import ProductosView from '@/views/ProductosView.vue'
import { supabase } from '@/supabase'
const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes: [
{
path: '/',
redirect: '/login',
},
{
path: '/login',
name: 'login',
component: LoginView,
},
{
path: '/registro',

name: 'registro',
component: RegistroView,
},
{
path: '/inicio',
name: 'inicio',
component: InicioView,
meta: { requiereAutenticacion: true },
},
{
path: '/productos',
name: 'productos',
component: ProductosView,
meta: { requiereAutenticacion: true },
},
],
})
router.beforeEach(async (to) => {
if (!to.meta.requiereAutenticacion) return true
const {
data: { session },
} = await supabase.auth.getSession()
if (!session) return '/login'
return true
})
export default router