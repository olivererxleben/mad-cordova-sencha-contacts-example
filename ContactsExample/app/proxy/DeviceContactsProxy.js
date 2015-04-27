Ext.define('ContactsExample.proxy.DeviceContactsProxy', {
    uses: [
        'Ext.data.ResultSet',
    ],
    alias: 'proxy.devicecontacts',
    extend: 'Ext.data.proxy.Proxy',
    read: function( operation, callback, scope ){
        var thisProxy = this;
        var contacts = [];

        if(Ext.os.deviceType === 'Phone'){
            var findOptions = new ContactFindOptions();
            findOptions.filter = "";
            findOptions.multiple = true;
            var filter = ['id','displayName','givenName','familyName'];
            navigator.contacts.find(
                filter,
                contactsQuerySuccessful,
                finishWithError ,
                findOptions
            );
        }
        else{
            contacts.push({
                id:0,
                givenName: 'Kein',
                familyName: 'Telefon',
                photo: 'resources/images/placeholder_user.png',
                phone: '0541 - 123456',
                phoneType: 'mobile',
                email: 'test@me.com',
                emailType: 'custom'
            });
            finishSuccessful(contacts);
        }

        function contactsQuerySuccessful(deviceContacts){
            for (var i = 0; i < deviceContacts.length; i++) {
                var contact = {
                    id: deviceContacts[i].id,
                    givenName: deviceContacts[i].name.givenName,
                    familyName: deviceContacts[i].name.familyName
                };

                if(!deviceContacts[i].photos){
                    contact.photo = "resources/images/placeholder_user.png";
                }
                else{
                    contact.photo = deviceContacts[i].photos[0].value;
                }

                if(deviceContacts[i].phoneNumbers){
                    contact.phone = deviceContacts[i].phoneNumbers[0].value;
                    contact.phoneType = deviceContacts[i].phoneNumbers[0].type;
                }

                if(deviceContacts[i].emails){
                    contact.email = deviceContacts[i].emails[0].value;
                    contact.emailType = deviceContacts[i].emails[0].type;
                }

                contacts.push(contact);
            }
            finishSuccessful();
        }

        function finishSuccessful(){
            operation.resultSet = new Ext.data.ResultSet({
                records: contacts,
                total  : contacts.length,
                loaded : true
            });
            operation.setRecords(contacts);
            operation.setSuccessful();
            operation.setCompleted();

            if (typeof callback == "function") {
                callback.call(scope || thisProxy, operation);
            }
        }

        function finishWithError(){
            operation.setCompleted();

            if (typeof callback == "function") {
                callback.call(scope || thisProxy, operation);
            }
        }
    },
    create: function( operation, callback, scope ){

    },
    update: function( operation, callback, scope ){
        return;
        var thisProxy = this;

        var model = operation.getRecords()[0].getData();
        var id = ''+model.id;

        var findOptions = new ContactFindOptions();
        findOptions.filter = model.id;
        findOptions.multiple = false;
        var filter = ['id'];
        navigator.contacts.find(filter,onSuccess,onError,findOptions);

        function onSuccess(contacts){
            var contact = contacts[0];
            contact.name.givenName = model.givenName;
            contact.name.familyName = model.familyName;

            //if(model.phone && !contact.phoneNumbers){
            //    contact.phoneNumbers = [];
            //}
            //var phone = new ContactField();
            //phone.type = model.phoneType || 'mobile';
            //phone.value = model.phone;
            //contact.phoneNumbers[0] = phone;
            //
            //if(model.email && !contact.emails){
            //    contact.emails = [];
            //}
            //var email = new ContactField();
            //email.type = model.emailType || 'custom';
            //email.value = model.email;
            //contact.emails[0] = email;

            contact.save(function(saveSuccess){
                operation.setSuccessful();
                operation.setCompleted();
                if (typeof callback == "function") {
                    callback.call(scope || thisProxy, operation);
                }
            },function(saveError){
                operation.setCompleted();
                if (typeof callback == "function") {
                    callback.call(scope || thisProxy, operation);
                }
            });
        }

        function onError(e){
            operation.setCompleted();

            if (typeof callback == "function") {
                callback.call(scope || thisProxy, operation);
            }
        }
    },
    destroy:  function( operation, callback, scope ){

    }
});
