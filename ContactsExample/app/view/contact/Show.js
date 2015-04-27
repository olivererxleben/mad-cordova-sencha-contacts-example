Ext.define('ContactsExample.view.contact.Show', {
    extend: 'Ext.Container',
    xtype: 'contact-show',

    requires: [
    ],

    config: {
        title: 'Details',
        baseCls: 'x-show-contact',
        layout: 'vbox',

        items: [
            {
                id: 'content',
                tpl: [
                    '<div>',
                    '<img src="{photo}" class="photo"/>',
                    //'<span class="information">{id}</span>',
                    '<span class="information">{givenName} {familyName}</span>',
                    '<span class="information">{phone}</span>',
                    //'<span class="information">{phoneType}</span>',
                    '<span class="information">{email}</span>',
                    //'<span class="information">{emailType}</span>',
                    '</div>'
                ].join('')
            }
        ],

        record: null
    },

    updateRecord: function(newRecord) {
        if (newRecord) {
            this.down('#content').setData(newRecord.data);
        }
    }
});
