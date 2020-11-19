import { LightningElement} from 'lwc';

export default class IfElseDemo extends LightningElement {
    isTom = true;
    isJerry = false;
    showTJ = 'showJerry';

    handleTomJerry(){
        if(this.isTom == true && this.isJerry == false){
            this.isJerry = true;
            this.isTom = false;
            this.showTJ = 'showTom';
        } else {
            this.isJerry = false;
            this.isTom = true;
            this.showTJ = 'showJerry';
        }
    }
}