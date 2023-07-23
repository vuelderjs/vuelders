<template>
    <v-navigation-drawer 
        :model-value="$vuetify.display.mdAndUp ? true : show" 
        width="400"
        :rail="rail"
        :permanent="$vuetify.display.mdAndUp"
        :temporary="$vuetify.display.smAndDown"
        :style="$vuetify.display.smAndDown ? 'width: 100vw': ''"
        >
        <v-list-item
          :prepend-avatar="avatar"
          :title="title"
          nav
          @click="rail = false"
        >
          <template v-slot:append>
            <v-btn
                variant="text"
                :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
                @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list v-for="(item, index) of menu" :key="index" v-model:opened="open">
            <v-list-group :value="item.text"
                v-if="item.children" :key="index"
            >  
                <template v-slot:activator="{ props }">
                    <v-list-item
                        v-bind="props"
                        :prepend-icon="item.icon"
                        @click="rail = false"
                        :title="item.i18n ? item.i18n : item.text"
                    ></v-list-item>
                </template>
                <v-list-item
                    v-for="child in item.children"
                    :key="child.i18n ? child.i18n : child.text"
                    :prepend-icon="child.icon"
                    :title="child.i18n ? $t(child.i18n) : child.text"
                    :to="child.link" exact 
                    @click="rail = false"
                ></v-list-item>
            </v-list-group>
            <v-list-item 
                v-else 
                :key="item.text ? item.text : item.i18n" 
                :to="item.link" exact 
                :prepend-icon="item.icon" 
                :title="item.i18n ? $t(item.i18n) : item.text">
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'vuelderjs-common-menu',
    props: {
        avatar: {
            type: String, 
            required: false
        },
        title: {
            type: String,
            required: false
        },
        menu: {
            type: Array,
            required: true
        },
        modelValue: {
            type: Boolean,
            required: true
        },
    },
    computed: {
        show: {
            get(){
                return this.modelValue
            },
            set(value){
                this.$emit('update:modelValue', value)
            }
        }
    },
    data(){
        return {
            rail: true,
            open: this.menu.map(item => item.text)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>