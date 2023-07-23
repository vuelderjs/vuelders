import { createI18n } from 'vue-i18n'
import merge from 'deepmerge'

import menuMessages from '../menu/i18n'
// import {i18nMessages as i18nMessagesCommon} from '@vuelder.js/common-frontend'

const messages = merge.all([
    menuMessages,
    // i18nMessagesCommon,
])

export default createI18n({
    locale: 'en',
    messages,
})