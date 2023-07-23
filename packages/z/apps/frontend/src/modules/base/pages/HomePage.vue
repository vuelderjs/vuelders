<template>
    <v-card elevation="0">
        <template v-for="(item, index) of menu">
            <template v-if="!item.galleryHide">
                <v-card variant="outlined" color="primary" border="0" :key="index">
                    <v-card-title><v-icon start>{{ item.icon }}</v-icon>{{ item.i18n ? $t(item.i18n) : item.text }}</v-card-title>
                </v-card>
                <v-divider :key="index"></v-divider>
                <v-row :key="index" v-if="item.children">
                    <v-col cols="12" sm="6" md="4" v-for="(child, childIndex) of item.children" :key="childIndex">
                        <v-card variant="outlined" :height="cardHeight" class="ma-4" color="primary" hover @click="$router.push(child.link)">
                            <v-card-title class="text-center">{{child.i18n ? $t(child.i18n) : child.text}}</v-card-title>
                            <v-card-text class="text-center">
                                <v-icon class="primary--text" :size="iconSize">{{child.icon}}</v-icon>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </template>
        </template>
    </v-card>
</template>

<script>
    import menu from '@/menu'

    export default {
        name: 'Base-Home-Page',
        data(){
            return {
                menu: menu
            }
        },
        computed: {
            iconSize(){
                if(this.$vuetify.display.xs) return 250
                if(this.$vuetify.display.sm) return 200
                if(this.$vuetify.display.md) return 200
                if(this.$vuetify.display.lg) return 250
                if(this.$vuetify.display.xl) return 300
                return 300
            },
            cardHeight(){
                if(this.$vuetify.display.xs) return 320
                if(this.$vuetify.display.sm) return 270
                if(this.$vuetify.display.md) return 270
                if(this.$vuetify.display.lg) return 320
                if(this.$vuetify.display.xl) return 400
                return 400
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>