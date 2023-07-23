import { createPinia } from "pinia"
import { UserModuleStore } from '@vuelder.js/authorization-frontend'
import { CustomizationStore } from '@dracul/customize-frontend'

const pinia = createPinia()

pinia.use(UserModuleStore)
pinia.use(CustomizationStore)

export const store = pinia

import createPersistedState from 'pinia-plugin-persist'

store.use(createPersistedState, {
  key: import.meta.env.VITE_PINIA_KEY,
  paths: ['user'],
  reducer: (state) => ({
    user: {
      access_token: state.user.access_token,
      refresh_token: state.user.refresh_token,
      me: state.user.me,
      avatarurl: state.user.avatarurl
    },
    customization: {
      lightTheme: state.customization.lightTheme,
      darkTheme: state.customization.darkTheme,
      logo: state.customization.logo,
      language: state.customization.language,
      darkMode: state.customization.darkMode,
    }
  })
})