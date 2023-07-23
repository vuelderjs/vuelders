<template>
    <div class="container">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="7" md="6" lg="6">
                <register-successful v-if="email" :email="email"></register-successful>

                <register-card v-else>
                    <register-form @userRegistered="userRegistered"></register-form>
                </register-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import RegisterCard from "./RegisterCard";
import RegisterForm from "./RegisterForm";
import RegisterSuccessful from './RegisterSuccessful'

export default {
    name: "RegisterPage",
    components: {RegisterCard, RegisterForm, RegisterSuccessful},
    data() {
        return {
            email: null
        }
    },
    methods: {
        userRegistered(email) {
            this.email = email
        }
    }
}
</script>

<style lang="scss" scoped>
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80%;
    }
</style>