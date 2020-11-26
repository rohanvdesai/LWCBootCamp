import { LightningElement, track, wire, api } from "lwc";
import findRecords from "@salesforce/apex/LwcLookupController.findRecords";
import getContacts from '@salesforce/apex/AccountLWCController.getContacts';

const columns = [{
    label: 'First Name',
    fieldName: 'FirstName'
},
{
    label: 'Last Name',
    fieldName: 'LastName'
},
{
    label: 'Email',
    fieldName: 'Email',
    type: 'email'
},
{
    label: 'Phone',
    fieldName: 'phone',
    type: 'phone'
}

];

export default class LwcLookup extends LightningElement {
    @track recordsList;
    @track searchKey = "";
    @api selectedValue;
    @api selectedRecordId;
    @api objectApiName;
    @api iconName;
    @api lookupLabel;
    @track message;
    @track accountId = '';
    @track contacts;
    @track columns = columns;

    onLeave(event) {
        setTimeout(() => {
            this.searchKey = "";
            this.recordsList = null;
        }, 300);
    }

    onRecordSelection(event) {
        this.selectedRecordId = event.target.dataset.key;
        this.selectedValue = event.target.dataset.name;
        this.searchKey = "";
        this.onSeletedRecordUpdate();
    }

    handleKeyChange(event) {
        const searchKey = event.target.value;
        this.searchKey = searchKey;
        this.getLookupResult();
    }

    removeRecordOnLookup(event) {
        this.searchKey = "";
        this.selectedValue = null;
        this.selectedRecordId = null;
        this.recordsList = null;
        this.onSeletedRecordUpdate();
    }



    @wire(findRecords) accounts;
    getLookupResult(event) {
        findRecords({ searchKey: this.searchKey, objectName: this.objectApiName })
            .then((result) => {
                const selectedAccount = event.target.value;
                this.accountId = event.target.value;
                if (result.length != null) {
                    getContacts({
                        accountId: selectedAccount
                    })
                        .then(result => {
                            this.contacts = result;
                            // eslint-disable-next-line no-console
                            console.log('result' + JSON.stringify(result) + selectedAccount);
                        })
                } else {
                    this.recordsList = result;
                    this.message = "";
                }
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.recordsList = undefined;
            });
    }

    onSeletedRecordUpdate() {
        const passEventr = new CustomEvent('recordselection', {
            detail: { selectedRecordId: this.selectedRecordId, selectedValue: this.selectedValue }
        });
        this.dispatchEvent(passEventr);
    }
}  