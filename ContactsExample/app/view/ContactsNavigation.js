Ext.define('ContactsExample.view.ContactsNavigation', {
    extend: 'Ext.navigation.View',
    xtype: 'contactsnav',

    requires: [
        'ContactsExample.store.ContactsStore',
        'ContactsExample.model.ContactModel'
    ],
    config: {
        autoDestroy: false,
        layout: {
            type: 'card',
            animation: Ext.os.is.iOS ? 'slide' : null
        },
        navigationBar: {
            splitNavigation: false,
            items: [
                {
                    xtype: 'button',
                    id: 'editButton',
                    text: 'Edit',
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                },
                {
                    xtype: 'button',
                    id: 'saveButton',
                    text: 'Save',
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                }
            ]
        },

        items: [
            {
                xtype: 'contacts'
            }
        ]
    }
});