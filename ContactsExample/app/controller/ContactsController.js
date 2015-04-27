Ext.define('ContactsExample.controller.ContactsController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            panel: 'main',
            main: 'contactsnav',
            editButton: '#editButton',
            contacts: 'contacts',
            showContact: 'contact-show',
            editContact: 'contact-edit',
            saveButton: '#saveButton'
        },
        control: {
            main: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },
            editButton: {
                tap: 'onContactEdit'
            },
            contacts: {
                itemtap: 'onContactSelect'
            },
            saveButton: {
                tap: 'onContactSave'
            },
            editContact: {
                change: 'onContactChange'
            }
        }
    },

    onMainPush: function(view, item) {
        var editButton = this.getEditButton();

        if (item.xtype == "contact-show") {
            this.getContacts().deselectAll();

            this.showEditButton();
        } else {
            this.hideEditButton();
        }
    },

    onMainPop: function(view, item) {
        if (item.xtype == "contact-edit") {
            this.showEditButton();
        } else {
            this.hideEditButton();
        }
    },

    onContactSelect: function(list, index, node, record) {
        var editButton = this.getEditButton();

        if (!this.showContact) {
            this.showContact = Ext.create('ContactsExample.view.contact.Show');
        }

        // Bind the record onto the show contact view
        this.showContact.setRecord(record);

        // Push the show contact view into the navigation view
        this.getMain().push(this.showContact);
    },

    onContactEdit: function() {
        if (!this.editContact) {
            this.editContact = Ext.create('ContactsExample.view.contact.Edit');
        }

        // Bind the record onto the edit contact view
        var contact = this.getShowContact().getRecord();
        this.editContact.down('image').setSrc(contact.getData().photo);
        this.editContact.setRecord(contact);

        this.getMain().push(this.editContact);

        if (Ext.theme.name == "Blackberry") {
            this.showSaveButton();
        }
    },

    onContactChange: function() {
        this.showSaveButton();
    },

    onContactSave: function() {
        var record = this.getEditContact().saveRecord();

        this.getShowContact().updateRecord(record);

        var store = Ext.getStore('ContactsStore');
        //store.sync();

        this.getMain().pop();
    },

    showEditButton: function() {
        var editButton = this.getEditButton();

        if (!editButton.isHidden()) {
            return;
        }

        this.hideSaveButton();

        editButton.show();
    },

    hideEditButton: function() {
        var editButton = this.getEditButton();

        if (editButton.isHidden()) {
            return;
        }

        editButton.hide();
    },

    showSaveButton: function() {
        var saveButton = this.getSaveButton();

        if (!saveButton.isHidden()) {
            return;
        }

        saveButton.show();
    },

    hideSaveButton: function() {
        var saveButton = this.getSaveButton();

        if (saveButton.isHidden()) {
            return;
        }

        saveButton.hide();
    },
});