<template>

    <v-card class="elevation-12">
        <v-card-text>
            <v-alert
                    :value="true"
                    color="success"
                    icon="mdi-check-circle"
                    outlined
            >
                <h3>Se registró correctamente el usuario <strong>{{ email }}</strong></h3>
            </v-alert>
            <v-btn class="mt-4" block color="primary" :to="{name: 'login'}">Inicio de sesión</v-btn>
        </v-card-text>
    </v-card>

</template>

<script>
    export default {
        name: "RegisterSuccessful",
        props: {
            email: String
        }
    }
</script>

<style scoped>

</style>