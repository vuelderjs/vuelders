<template>
    <v-card elevation="0">
        <v-card-title>Administración de errores</v-card-title>
        <v-card-subtitle>En esta sección encontrarás los errores que ocurrieron y NO debían ocurrir. En caso de encontrar errores, se ván a intentar resolver. Contactar con el equipo de desarrollo.</v-card-subtitle>
        <v-card-text>
            <v-divider></v-divider>
            <error-panel/>
        </v-card-text>
    </v-card>
</template>

<script>
import { ErrorPanel } from '../components';
export default {
    name: "Common-Errors-Page",
    components: {
        ErrorPanel
    }
}
</script>

<style lang="scss" scoped>

</style>