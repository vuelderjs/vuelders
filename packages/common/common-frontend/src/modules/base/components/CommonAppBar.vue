<template>
    <v-app-bar color="primary" elevation="0">
        <v-row class="px-4">
            <v-col :cols="$vuetify.display.mdAndUp ? 2 : 6" class="text-left">
                <v-btn icon @click="showMobileMenu = !showMobileMenu" v-if="$vuetify.display.smAndDown">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="2" v-if="$vuetify.display.mdAndUp">
                <slot name="left"></slot>
            </v-col>
            <v-col cols="4" class="text-center" v-if="$vuetify.display.mdAndUp">
                <slot name="middle"></slot>
            </v-col>
            <v-col :cols="$vuetify.display.mdAndUp ? 4 : 6" class="text-right">
                <slot name="right"></slot>
            </v-col>
        </v-row>
    </v-app-bar>
    <common-menu v-if="menu.length > 0"
        :modelValue="showMobileMenu" 
        :menu="menu" 
        :avatar="user.avatar"
        :title="user.username"
        @update:modelValue="value => showMobileMenu = value"
    ></common-menu>
</template>


<script>
    import defaultAvatar from '../assets/vuelder-js.png'
    import CommonMenu from './CommonMenu.vue'

    export default {
        name: 'vuelderjs-common-app-bar',
        components: {
            CommonMenu
        },
        props: {
            menu: {
                type: Array,
                required: false
            },
            user: {
                type: Object,
                required: false,
                default: () => ({
                    avatar: defaultAvatar,
                    username: 'username'
                })
            },
        },
        data(){
            return {
                showMobileMenu: false
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>