<template>
  <common-app-bar :menu="menu">
    <template v-slot:left></template>
    <template v-slot:middle>
      <v-app-bar-title>
        <v-btn text large class="text-h5" @click="$router.push({name: 'home'})">
          {{ title }}
        </v-btn>
      </v-app-bar-title>
    </template>
    <template v-slot:right>
      <v-btn text :to="{name: 'login'}" :icon="$vuetify.display.smAndDown">
        <template v-if="$vuetify.display.smAndDown">
          <v-icon>mdi-login</v-icon>
        </template>
        <template v-else>
          Iniciar Sesión
        </template>
      </v-btn>
      <v-btn text :to="{name: 'register'}" :icon="$vuetify.display.smAndDown">
        <template v-if="$vuetify.display.smAndDown">
          <v-icon>mdi-account-plus-outline</v-icon>
        </template>
        <template v-else>
          Registrarse
        </template>
      </v-btn>
    </template>
  </common-app-bar>
</template>

<script>
  import { CommonAppBar } from '@vuelder.js/common-frontend'
  import menu from '@/menu'

  export default {
    name: 'AppBar-Layout',
    components: {
      CommonAppBar
    },
    data(){
      return {
        title: import.meta.env.VITE_APP_NAME,
        menu: menu
      }
    }
  }
</script>
