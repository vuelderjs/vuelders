<template>
    <div class="container">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="7" md="5" lg="4">
                <login-card>
                    <login-form></login-form>
                </login-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import LoginCard from "./LoginCard";
import LoginForm from "./LoginForm";

export default {
  name: "LoginPage",
  components: {LoginCard, LoginForm},
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