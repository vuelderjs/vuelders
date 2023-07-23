<template>
    <v-table>
        <thead>
            <tr>
                <th class="text-center" v-for="header of headers" :key="header">
                    {{ header.text }}
                </th>
                <th class="text-center">acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(child, index) of items" :key="index"
            >
                <td 
                    v-for="prop of headers" :key="prop"
                    class="text-center"
                >
                    <v-chip v-if="prop.value === 'status'"
                        :color="chipColor(child[prop.value])"
                        variant="flat"
                    >
                        {{ child[prop.value] }}
                    </v-chip>
                    <span v-else-if="prop.value === 'message'" style="width: 20px;">
                        {{ child[prop.value] }}
                    </span>
                    <span v-else>
                        {{child[prop.value]}}
                    </span>
                </td>
                <td class="text-center">
                    <v-btn icon color="info" small class="mx-1" 
                        @click="displayError(child.id)"
                    >
                        <v-icon>mdi-information</v-icon>
                    </v-btn>
                    <v-btn icon color="error" small class="mx-1"
                        @click="errorsUpdateStatus(child.id, 'UNRESOLVED')"
                        :loading="child.loading"
                    >
                        <v-icon>mdi-image-broken-variant</v-icon>
                    </v-btn>
                    <v-btn icon color="warning" small class="mx-1"
                        @click="errorsUpdateStatus(child.id, 'FIXING')"
                        :loading="child.loading"
                    >
                        <v-icon>mdi-coffee</v-icon>
                    </v-btn>
                    <v-btn icon color="success" small class="mx-1"
                        @click="errorsUpdateStatus(child.id, 'RESOLVED')"
                        :loading="child.loading"
                    >
                        <v-icon>mdi-thumb-up</v-icon>
                    </v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>
    <error-display 
        v-if="displayErrorShow" 
        :id="displayErrorId" 
        :modelValue="displayErrorShow" 
        @update:modelValue="value => displayErrorShow = value"
    ></error-display>
</template>

<script>
import errorProviders from '../providers/errorProviders'
import ErrorDisplay from './ErrorDisplay.vue'

export default {
    name: 'Common-Components-Show-Errors',
    components: {
        ErrorDisplay
    },
    data(){
        return {
            headers: [
                {
                    value: 'author',
                    text: 'author',
                    class: 'text-center'
                },
                {
                    value: 'name',
                    text: 'name',
                    class: 'text-center'
                },
                {
                    value: 'message',
                    text: 'message',
                    class: 'text-center'
                },
                {
                    value: 'status',
                    text: 'status',
                    class: 'text-center'
                }
            ],
            items: [],
            pageNumber: 1,
            itemsPerPage: 5,
            displayErrorShow: false,
            displayErrorId: '',
        }
    },
    mounted(){
        this.errorsPaginate()
    },
    methods: {
        chipColor(status){
            if(status === 'UNRESOLVED') return 'error'
            if(status === 'FIXING') return 'warning'
            if(status === 'RESOLVED') return 'success'
        },

        displayError(id){
            this.displayErrorId = id
            this.displayErrorShow = true
        },

        async errorsPaginate(){
            const { data: { errorsPaginate } } = await errorProviders.errorsPaginate({
                pageNumber: this.pageNumber,
                itemsPerPage: this.itemsPerPage
            });

            Object.preventExtensions(errorsPaginate.docs);

            this.items = errorsPaginate.docs.map(item => {
                return {
                    ...item,
                    loading: false
                };
            });
        },

        async errorsUpdateStatus(id, status){
            try {
                this.items = this.items.map(item => {
                    if(item.id === id) item.loading = true
                    return item
                })
                const {data: {errorsUpdateStatus}} = await errorProviders.errorsUpdateStatus(id, status)
                this.items = this.items.map(item => {
                    if(item.id === errorsUpdateStatus.id)item.status = errorsUpdateStatus.status
                    return item
                })
            } catch (error) {
                console.error(error)
            }finally{
                this.items = this.items.map(item => {
                    if(item.id === id)item.loading = false
                    return item
                })
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>