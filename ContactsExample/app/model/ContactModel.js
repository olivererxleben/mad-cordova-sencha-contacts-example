Ext.define('ContactsExample.model.ContactModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'id',
            'givenName',
            'familyName',
            'photo',
            'phone',
            'phoneType',
            'email',
            'emailType',
        ]
    }
});
