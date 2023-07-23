/**
 * icon: menu icon.
 * i18n: i18n prop for traduction.
 * link: router link.
 * galleryHide: if this is true hidden menu of home or other galleries.
 * children: array of sub-menues.
 */

export default [
    {
        icon: 'mdi-home',
        i18n:'base.home',
        link: { name: "home" },
        galleryHide: true
    },
    {
        icon: 'mdi-code-braces-box',
        text: 'Administración de desarrollo',
        children: [
            {
                icon: 'mdi-alert-circle',
                text: 'Administración de errores',
                link: { name: 'errors' }
            }
        ]
    }
]