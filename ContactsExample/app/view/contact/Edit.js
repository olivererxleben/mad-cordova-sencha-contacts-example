Ext.define('ContactsExample.view.contact.Edit', {
    extend: 'Ext.Panel',
    xtype: 'contact-edit',

    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Hidden',
        'Ext.field.Text'
    ],

    config: {
        title: 'Edit',
        layout: 'vbox',
        scrollable: true,

        items: [
            {
                xtype: 'image',
                width: 200,
                height: 200
            },
            {
                xtype: 'button',
                text: 'Neues Foto',
                width: 200,
                handler: function() {
                    function success(image_uri){
                        var img = Ext.ComponentQuery.query('image')[0];
                        img.setSrc(image_uri);

                        //var formPanel = this.parent.down('formpanel');
                        //formPanel.getRecord().getData().photo = image_uri;
                    }

                    function fail(message){
                        alert("Failed: "+message);
                    }

                    navigator.camera.getPicture(success,fail,
                        {
                            quality: 50,
                            destinationType: navigator.camera.DestinationType.FILE_URI,
                            saveToPhotoAlbum: false
                        }
                    );
                }
            },
            {
                xtype: 'formpanel',
                scrollable: null,
                items: [
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: '35%'
                        },
                        title: 'Name',
                        items: [
                            {
                                xtype: 'hiddenfield',
                                name: 'id'
                            },
                            //{
                            //    xtype: 'hiddenfield',
                            //    name: 'photo',
                            //    id: 'myphoto'
                            //},
                            {
                                xtype: 'hiddenfield',
                                name: 'phoneType'
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'emailType'
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'photo'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Vorname',
                                name: 'givenName'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Nachname',
                                name: 'familyName'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: '35%'
                        },
                        title: 'Kontakt',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Telefon',
                                name: 'phone'
                            },
                            {
                                xtype: 'textfield',
                                label: 'EMail',
                                name: 'email'
                            }
                        ]
                    }
                ]
            }
        ],

        listeners: {
            delegate: 'textfield',
            keyup: 'onKeyUp'
        },

        record: null
    },

    updateRecord: function(newRecord) {
        this.down('formpanel').setRecord(newRecord);
    },

    saveRecord: function() {
        var formPanel = this.down('formpanel'),
            record = formPanel.getRecord();

        formPanel.updateRecord(record);

        return record;
    },

    onKeyUp: function() {
        this.fireEvent('change', this);
    }
});

