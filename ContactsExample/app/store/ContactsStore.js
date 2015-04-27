Ext.define('ContactsExample.store.ContactsStore', {
    extend: 'Ext.data.Store',

    alias: 'store.contactsstore',

    config: {
        model: 'ContactsExample.model.ContactModel',
        sorters: 'id',
        autoLoad: {
            callback: function(operation){

            },
            scope: this
        },
        //autoSync: true,
        proxy: 'devicecontacts'
    }
});
