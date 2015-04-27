Ext.define('ContactsExample.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'ContactsExample.view.ContactsNavigation',
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Home',
                iconCls: 'home',
                styleHtmlContent: true,
                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Cordova & Sencha Touch Example'
                },

                html: [
                    '<img src="resources/images/cdv_sencha.png" style="max-width:250px;max-height:250px;display:block;margin-left:auto;margin-right:auto;margin-top:100px;" />',
                    '</div>'
                ].join('')
            },
            {
                title: 'Telefonkontakte',
                iconCls: 'user',
                xtype: 'contactsnav',
                listeners : {
                    activate : function( nav, newActiveItem, oldActiveItem, eOpts ) {
                        // Reseting navigation view
                        nav.reset();
                    }
                }
            }
        ]
    }
});
