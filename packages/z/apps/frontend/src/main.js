//IMPORT PROVIDERS
import { errorProvider } from '@vuelder.js/common-frontend'
import { userProviders } from '@vuelder.js/authorization-frontend'

import apolloClient from './apollo'

//APOLLO SET GRAPHQLCLIENT MODULES
errorProvider.setGraphqlClient(apolloClient)
userProviders.setGraphqlClient(apolloClient)

import App from './App.vue'

import { createApp } from 'vue'

import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
