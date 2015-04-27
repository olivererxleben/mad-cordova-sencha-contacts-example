Ext.define('ContactsExample.view.ContactsList', {
    extend: 'Ext.List',
    xtype: 'contacts',

    config: {
        title: 'Telefonkontakte',
        cls: 'x-contacts',
        variableHeights: true,

        store: 'ContactsStore',
        itemTpl: [
            '<img class="userphoto" src="{photo}" alt="userphoto"/><span class="displayname">{givenName} {familyName}</span>'
        ].join('')
    },
});