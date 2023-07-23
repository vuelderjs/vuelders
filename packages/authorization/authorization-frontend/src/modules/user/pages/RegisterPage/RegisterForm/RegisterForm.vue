<template>
    <v-form v-model="formVerify" ref="form" class="pa-4" @submit.prevent="submit">
        <v-row>
            <v-col cols="12" md="6">
                <v-text-field
                    prepend-icon="mdi-account-box"
                    name="name"
                    type="text"
                    v-model="form.completeName"
                    label="nombre completo"
                    variant="outlined"
                    :rules="rules.completeNameRules"
                />
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field
                    prepend-icon="mdi-account"
                    name="username"
                    type="text"
                    v-model="form.username"
                    label="nombre de usuario"
                    variant="outlined"
                    :rules="rules.usernameRules"
                />
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field 
                    prepend-icon="mdi-email"
                    name="email"
                    type="text"
                    v-model="form.email"
                    label="correo electronico"
                    variant="outlined"
                    :rules="rules.emailRules"
                />
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field 
                    ref="email_verify"
                    prepend-icon="mdi-email-check"
                    name="email_verify"
                    type="text"
                    v-model="form.email_verify"
                    label="Repetir correo electronico"
                    variant="outlined"
                    :rules="rules.email_verifyRules"
                />
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field 
                    prepend-icon="mdi-lock"
                    name="password"
                    type="password"
                    v-model="form.password"
                    label="Contraseña"
                    variant="outlined"
                    :rules="rules.passwordRules"
                />
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field 
                    prepend-icon="mdi-lock-check"
                    name="password_verify"
                    type="password"
                    v-model="form.password_verify"
                    label="Repetir contraseña"
                    variant="outlined"
                    :rules="rules.password_verifyRules"
                />
            </v-col>

            <v-col v-if="form.password" cols="12">
                <password-strength-bar :password="form.password"/>
            </v-col>

            <v-col cols="12">
                <v-text-field 
                    prepend-icon="mdi-phone"
                    name="phone"
                    type="text"
                    v-model="form.phone"
                    label="Numero de teléfono"
                    variant="outlined"
                />
            </v-col>

            <v-col cols="12">
                <v-btn 
                    type="submit" 
                    block 
                    color="primary"
                    @submit="submit"
                    :disabled="!formVerify"
                    :loading="loading"
                >Registrarse</v-btn>
            </v-col>
            <v-col cols="12" v-if="error">
                <v-alert type="error">
                    {{ error }}
                </v-alert>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
import PasswordStrengthBar from '../PasswordStrengthBar'
import userProviders from '../../../providers/userProviders'

const completeNameRules = [
    v => !v || /^[A-Za-z\s]+$/.test(v) || 'El nombre completo solo puede contener mayusculas, minusculas o espacios.'
]
const usernameRules = [
    v => !!v || 'Este campo no puede permanecer vacío.',
    v => /^[A-Za-z0-9]+$/.test(v) || 'El nombre de usuario solo puede contener mayúsculas, minúsculas y numeros.'
]
const emailRules = [
    v => !!v || 'Este campo no puede permanecer vacío.',
    v => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) || 'Debe ser un correo electrónico válido.'
]
const passwordRules = [
    v => !!v || 'Este campo no puede permanecer vacío'
]

export default {
    name: "RegisterForm",
    components: {
        PasswordStrengthBar
    },
    data: () => ({
        error: null,
        formVerify: false,
        loading: false,
        form: {
            completeName: '',
            username: '',
            password: '',
            password_verify: '',
            email: '',
            email_verify: '',
            phone: '',
        },
    }
    ),
    computed: {
        rules(){
            if(this.$refs.form) this.$refs.form.validate()
            return {
                completeNameRules,
                usernameRules,
                emailRules,
                email_verifyRules: this.verifyRules(this.form.email, 'Los correos electrónicos no coinciden.'),
                passwordRules,
                password_verifyRules: this.verifyRules(this.form.password, 'Las contraseñas no coinciden.')
            }
        }
    },
    methods: {
        verifyRules(verify, text){
            return [
                v => !!v || 'Este campo no puede permanecer vacío.',
                v => v == verify || text || 'Los campos no coinciden.'
            ]
        },
        async submit(event){
            try {
                this.loading = true
                const {valid} = await event
                if(!valid) return this.$refs.form.validate()

                const form = {
                    username: this.form.username,
                    email: this.form.email,
                    password: this.form.password,
                    completeName: this.form.completeName ? this.form.completeName : null,
                    phone: this.form.phone ? this.form.phone : null,
                }
                await userProviders.registerUser(form)
                this.$emit('userRegistered', form.email)
            } catch (error) {
                this.error = error

                const duplicateUsernameError = error.message.includes("index: username") && error.message.includes("E11000 duplicate key error")
                const duplicateEmailError = error.message.includes("index: email") && error.message.includes("E11000 duplicate key error")

                if(duplicateUsernameError) this.error = 'El nombre de usuario que ingresó ya se encuentra en uso.'
                if(duplicateEmailError) this.error = 'El correo electrónico que ingresó ya se encuentra en uso.'
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>
