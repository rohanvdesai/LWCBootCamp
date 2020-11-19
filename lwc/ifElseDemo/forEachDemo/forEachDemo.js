import { LightningElement } from 'lwc';

export default class ForEachDemo extends LightningElement {
    areDetailsVisible = false;
 
     handleChange(event) {
        this.areDetailsVisible = event.target.checked;
    }
    ceoList = [
          {
            Id: 1,
            Name: 'Marc Benioff',
            Company: 'Salesforce.com',
        },
        {
            Id: 2,
            Name: 'Sundar Pichai',
            Company: 'Google',
        },
      
        {
            Id: 3,
            Name: 'Elon Musk',
            Company: 'Telsa',
        },
    ];
}