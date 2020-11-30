import { LightningElement, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubSub';
import { CurrentPageReference } from 'lightning/navigation';

export default class ContactSubscriber extends LightningElement {
    strFirstName;
    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener("changedFirstName", this.handleChangedFirstName, this);
    }
     
    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleChangedFirstName(firstName) {
        /*eslint-disable-next-line*/
        console.log("firstName--->" + firstName);
        this.strFirstName = firstName;
    }
}