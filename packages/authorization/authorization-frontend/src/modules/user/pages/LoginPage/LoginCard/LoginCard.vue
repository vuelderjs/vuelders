<template>
    <v-card class="elevation-12">
        <v-card-text class="pt-4 px-8 my-0 pb-0 text-center">
            <v-btn icon color="primary onPrimary--text">
                <v-icon>mdi-lock</v-icon>
            </v-btn>
            <h2 class="mt-2">Iniciar sesión</h2>
        </v-card-text>

        <v-card-text class="pt-5 px-8 pb-0">
            <slot></slot>
        </v-card-text>
    </v-card>

    <v-card class="elevation-12 mt-2" v-if="isRegisterEnable">
      <v-card-text class="text-xs-center">
        <span> ¿Aún no tienes un usuario?</span>
        <router-link :to="{name: 'register'}"
                     class="secondary--text font-weight-bold"
        >
            Registrate!
        </router-link>
      </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "LoginCard",
    computed: {
        isRegisterEnable() 
        {
            return import.meta.env.VITE_APP_REGISTER === 'enable'
        }
    },
}
</script>

<style lang="scss" scoped>

</style>