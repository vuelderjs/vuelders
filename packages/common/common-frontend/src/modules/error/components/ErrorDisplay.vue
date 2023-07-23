<template>
    <v-dialog :model-value="dialog" permanent :width="$vuetify.display.smAndDown ? '100vw' : '700'" persistent>
        <v-card>
            <v-row class="pa-4">
                <v-col cols="12" md="8" justify="center">
                    <v-card-title>Información del error</v-card-title>
                </v-col>
                <v-col cols="12" md="4" align="center" justify="center">
                    <v-btn block color="red" @click="close">
                        <v-icon>mdi-close</v-icon>Cerrar
                    </v-btn>
                </v-col>
            </v-row>
            <v-card-text>
                <v-tabs
                    v-model="tab"
                    color="primary"
                    align-tabs="center"
                >
                    <v-tab :value="1">General</v-tab>
                    <v-tab :value="2">Stack</v-tab>
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item
                        :value="1"
                    >
                        <v-table>
                            <thead>
                                <tr>
                                    <th>
                                        Propiedad
                                    </th>
                                    <th>
                                        Contexto
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-left">
                                        <b>author</b>
                                    </td>
                                    <td class="text-left">
                                        {{ error.author }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left">
                                        <b>name</b>
                                    </td>
                                    <td class="text-left">
                                        {{ error.name }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left">
                                        <b>errorCode</b>
                                    </td>
                                    <td class="text-left">
                                        {{ error.errorCode }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left">
                                        <b>statusCode</b>
                                    </td>
                                    <td class="text-left">
                                        {{ error.statusCode }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left">
                                        <b>message</b>
                                    </td>
                                    <td class="text-left">
                                        {{ error.message }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left">
                                        <b>status</b>
                                    </td>
                                    <td class="text-left">
                                        {{ error.status }}
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-window-item>
                    <v-window-item :value="2">
                        <b>{{ error.stack }}</b>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import errorProviders from '../providers/errorProviders';

export default {
    name: 'vuelderjs-error-display',
    props:{
        id: {
            type: String,
            required: true
        },
        modelValue: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        dialog: {
            get(){
                return this.modelValue
            },
            set(value){
                this.$emit('update:modelValue', value)
            }
        }
    },
    data(){
        return{
            loading: true,
            dialog: true,
            tab: 1,
            error: {
                author: '',
                name: '',
                errorCode: '',
                statusCode: 400,
                message: '',
                stack: '',
                status: ''
            }
        }
    },
    async mounted(){
        this.loading = true
        try {
            await this.errorsFindById()
        } catch (error) {
            console.error(error)
        } finally {
            this.loading = false
        }
    },
    methods: {
        async errorsFindById(){
            const {data: {errorsFindById}} = await errorProviders.errorsFindById(this.id)
            this.error = errorsFindById
        },
        close(){
            this.dialog = false
            setTimeout(()=>{
                this.$emit('update:modelValue', false)
            }, 300)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>