import { LightningElement, wire, track, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
const FIELDS = [
    'Account.Opportunity.Id',
    'Account.Opportunity.StageName',
    'Account.Opportunity.CloseDate',
];
export default class ShowOppDetails extends LightningElement {
    @api recordId;
    @track record;
    @track error;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredOpportunity({ error, data }) {
        if (data) {
            this.record = data;
            this.error = undefined;
            console.log("data "+JSON.stringify(data) );
        } else if (error) {
            this.error = error;
            this.record = undefined;
        }
    }
    get name() {
        return this.record.fields.Account.Opportunity.Id.value;
    }
    get stage() {
        return this.record.fields.Account.Opportunity.StageName.value;
    }
    get closeDate() {
        return this.record.fields.Account.Opportunity.CloseDate.value;
    }
}