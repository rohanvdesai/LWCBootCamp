import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubSub';
import { createRecord, getRecord } from 'lightning/uiRecordApi';
 
const arrFields = ['Contact.FirstName', 'Contact.LastName', 'Contact.Phone'];

export default class QuickContactCreate extends LightningElement {
    strFirstName;
    strLastName;
    strPhone;
    idContact;
    @wire(CurrentPageReference) pageRef;
    @wire(getRecord, {recordId:'$idContact', fields: arrFields})
    contactRecord;
 
    // Change Handlers.
    firstNameChangedHandler(event){
        this.strFirstName = event.target.value;
    }
    lastNameChangedHandler(event){
        this.strLastName = event.target.value;
    }
    phoneChangedHandler(event){
        this.strPhone = event.target.value;
    }
 
    // Insert record.
    createContact(){
        console.log("strFirstName-->" + this.strFirstName);
        fireEvent(this.pageRef, "changedFirstName", "Quick Contact Created");
        // Creating mapping of fields of Account with values
        var fields = {'FirstName' : this.strFirstName, 'LastName' : this.strLastName, 'Phone' : this.strPhone};
 
        // Record details to pass to create method with api name of Object.
        var objRecordInput = {'apiName' : 'Contact', fields};
 
        // LDS method to create record.
        createRecord(objRecordInput).then(response => {
            this.idContact = response.id;
        }).catch(error => {
            alert('Error: ' +JSON.stringify(error));
        });

    }
 
    //Getters
    get contactFirstName(){
        if(this.contactRecord.data){
            return this.contactRecord.data.fields.FirstName.value;
        }
        return undefined;
    }
 
    get contactLastName(){
        if(this.contactRecord.data){
            return this.contactRecord.data.fields.LastName.value;
        }
        return undefined;
    }
    
    get contactPhone(){
        if(this.contactRecord.data){
            return this.contactRecord.data.fields.Phone.value;
        }
        return undefined;
    }

}