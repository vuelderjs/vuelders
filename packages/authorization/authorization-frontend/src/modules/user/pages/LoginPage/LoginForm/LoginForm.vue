<template>
    <v-form class="py-5" v-model="formValue" @submit.prevent="submit">
        <v-text-field 
            label="nombre de usuario o email" 
            variant="outlined"
            v-model="form.username"
            :rules="[v => !!v || 'Este campo es requerido.']"
        ></v-text-field>
        <v-text-field 
            :type="showPassword ? 'text' : 'password'" 
            label="Contraseña" 
            variant="outlined"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            v-model="form.password"
            :rules="[v => !!v || 'Este campo es requerido.']"
        ></v-text-field>
        <v-btn 
            type="submit" 
            class="mt-4" 
            block 
            color="primary" 
            size="large" 
            :loading="loading"
        >Iniciar Sesión</v-btn>
        <v-alert class="mt-4" type="error" v-if="error" closable>{{ error }}</v-alert>
    </v-form>
</template>

<script>
import userProviders from '../../../providers/userProviders';

export default {
    name: 'LoginForm',
    data(){
        return {
            error: null,
            loading: false,
            formValue: false,
            showPassword: false,
            form: {
                username: null,
                password: null
            }
        }
    },
    methods: {
        async submit(){
            try {
                this.loading = true
                const form = {
                    password: this.form.password
                }
                if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.form.username)){
                    form.email = this.form.username
                }
                else form.username = this.form.username
                const { data: {loginUser: token} } = await userProviders.loginUser(form)
                this.$router.push({name: 'home'})
            } catch (error) {
                this.error = error
            } finally{
                this.loading = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>