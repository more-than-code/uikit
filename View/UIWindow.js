import {
    UIView
} from "./UIView";
import './UIWindow.scss';

class UIWindowEelement extends HTMLElement {

}

const alteredName = 'el-uiwindow';
customElements.define(alteredName, UIWindowEelement);

export class UIWindow extends UIView {
    constructor() {
        super(alteredName);
        this.window = this;
    }
}